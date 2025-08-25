import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  CardHeader,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader.js";
import Message from "../message.js";
import { validEmail,validPassword} from "./Regex.js";
import { login } from "../../actions/useractions.js";

function LoginScreen() {
  const navigate=useNavigate();
const [email,setemail]=useState("");
const [pass1,setpass1]=useState("");
const [message,setmessage]=useState("");
const[show,changeshow]=useState("fa fa-eye-slash");
const dispatch=useDispatch();
const location = useLocation();
const redirect=location.search?location.search.split("=")[1]:"/";

const userLogin=useSelector((state)=>state.userLogin);
const{error,loading,userInfo}=userLogin

useEffect(()=>{
  if(userInfo){
    navigate('/')
  }
},[userInfo,navigate,redirect])
const submitHandler=(e)=>{
e.preventDefault();


// if(!validEmail.test(email)){
  // setmessage("InValid Email!!")
// }
// else if(!validPassword.test(pass1)){
  // setmessage("Password doesn't match the Criteria!!")
// 
// }

  dispatch(login(email,pass1))


}
const showPassword=()=>{
  var x=document.getElementById("pass1");
  if(x.type === "password"){
    x.type="text";
    changeshow(`fa fa-eye`);
  }
  else{
    x.type="password";
    changeshow(`fa fa-eye-slash`);

  }
}
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
          {loading?(
            <Loader/>
          ):error?(
            <Message variant='danger'>{error}</Message>
          ):(
             <Card>
   <CardHeader as="h3" className="text-center bg-black text-light">
     Login
   </CardHeader>
   <Card.Body>
     <Form onSubmit={submitHandler}>
       <Form.Group className="mb-3" controlId="email">
         <Form.Label>
           <span>
             <i className="fa-regular fa-envelope"></i>
           </span>{" "}
           Email
         </Form.Label>
         <Form.Control
           type="email"
           placeholder="Enter Your Email"
           value={email}
           required
           onChange={(e)=>setemail(e.target.value)}
         />
       </Form.Group>
       <Form.Group className="mb-3">
         <Form.Label>
           <span>
             <i className={show}></i>
           </span>{" "}
           Password
         </Form.Label>
         <InputGroup className="mb-3">
           <InputGroup.Checkbox onChange={showPassword}></InputGroup.Checkbox>{" "}
           <Form.Control
             type="password"
             placeholder="Enter Your Password"
             value={pass1}
             id="pass1"
             required
             onChange={(e)=>setpass1(e.target.value)}
           />
         </InputGroup>
       </Form.Group>
       <br />
       <div className="d-grid gap-2">
         <Button className="btn btn-md btn-success" type="submit">
           Login
         </Button>
       </div>
     </Form>
     <Row className="py-3">
       <Col>
         New User? 
         <Link to="/signup">Sign Up</Link>
       </Col>
     </Row>
   </Card.Body>
 </Card>

          )}

          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
