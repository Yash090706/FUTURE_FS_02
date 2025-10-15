from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from.products import products
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

# for sending mails and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
from django.db import IntegrityError
import threading
from django.db.models import Q 
from .models import Product, Order, OrderItem
from .serializers import OrderSerializer

class EmailThread(threading.Thread):
    def __init__(self,email_message):
        self.email_message=email_message
        threading.Thread.__init__(self)
        
    def run(self):
        self.email_message.send()



# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return JsonResponse('Hello Yash',safe=False)

@api_view(['GET'])
def getproducts(request):
    query = request.query_params.get('keyword', '').strip()
    if query:
        # ✅ Filter only by product name
        # product = Product.objects.filter(productname__icontains=query)
        product = Product.objects.filter(
            Q(productname__icontains=query) | Q(productinfo__icontains=query)
        )
    else:
        product = Product.objects.all()
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getproduct(request,pk):
    products=Product.objects.get(_id=pk)
    serializers=ProductSerializer(products,many=False)
    return Response(serializers.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data=super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user=User.objects.all()
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)
@api_view(['POST'])
def registerUser(request):
    data=request.data
    
    try:
        #user=User.objects.create(first_name=data['fname'],last_name=data['lname'],username=data['email'],email=data['email'],password=make_password(data['password']))
        user=User.objects.create(first_name=data['fname'],last_name=data['lname'],username=data['email'],email=data['email'],password=make_password(data['password']),is_active=False)
        #  

        email_subject="Activate Your Account"
        message=render_to_string(
            "activate.html",
           {
                'user':user,
            'domain':'127.0.0.1:8000',
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':generate_token.make_token(user)
           }

        )
        # 
        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        EmailThread(email_message).start()
        message={'details':'Activate Your Account please Check your email for account Activation.'}
        return Response(message)
        
        
        
        # serialize=UserSerializerWithToken(user,many=False)
        # return Response(serialize.data)
    except Exception as e:
        message={'details':'User with this email already exists or something went wrong.'}
        return Response(message)


class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid=force_text(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as identifier:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefail.html")
        
@api_view(['GET'])
def getProductsByCategory(request, category):
    products = Product.objects.filter(productcategory__iexact=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    data = request.data

    orderItems = data.get('orderItems', [])
    if not orderItems:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    # Create order
    order = Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'],
        totalPrice=data['totalPrice'],
    )

    # Create order items & reduce stock
    for item in orderItems:
        product = Product.objects.get(_id=item['product'])
        if product.stockcount < item['qty']:
            return Response({'detail': f"Not enough stock for {product.productname}"}, status=400)

        OrderItem.objects.create(
            product=product,
            order=order,
            name=product.productname,
            qty=item['qty'],
            price=item['price'],
        )

        product.stockcount -= item['qty']
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_stock(request):
    """
    Reduce stock of products after order placement
    """
    items = request.data.get('items', [])  # Expect list of {id, qty}

    if not items:
        return Response({'error': 'No items provided'}, status=status.HTTP_400_BAD_REQUEST)

    for item in items:
        try:
            product = Product.objects.get(_id=item['id'])  # 👈 use _id, not id
            qty = int(item['qty'])

            if product.stockcount >= qty:
                product.stockcount -= qty
                product.save()
            else:
                return Response(
                    {'error': f'Not enough stock for {product.productname}'},  # use productname
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Product.DoesNotExist:
            return Response({'error': f'Product with id {item["id"]} not found'},
                            status=status.HTTP_404_NOT_FOUND)

    return Response({'message': 'Stock updated successfully'}, status=status.HTTP_200_OK)
























