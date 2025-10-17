from fpcart import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path('',views.getRoutes,name="getRoutes"),
    path('products/',views.getproducts,name="getProducts"),
    path('product/<str:pk>/',views.getproduct,name="getProduct"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profiles/',views.getUserProfile,name="getUserProfile"),
    path('users/',views.getUsers,name="getUsers"),
    path('users/register/',views.registerUser,name="registerUser"),
    path('activate/<uidb64>/<token>',views.ActivateAccountView.as_view(),name='activate'),
    path('products/category/<str:category>/', views.getProductsByCategory, name="products-by-category"),
    path('orders/place/', views.place_order, name="place-order"),
    path('update-stock/', views.update_stock, name='update-stock'),
    # path('api/orders/<str:pk>/', views.get_order_details, name='order-details'),
    path('orders/add/', views.create_order, name='orders-add'),
    path('orders/myorders/', views.getMyOrders, name='my-orders'),



    
]