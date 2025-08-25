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
import { signup } from "../../actions/useractions.js";




function SignUpScreen() {
  const navigate=useNavigate();
const [fname,setfname]=useState("");
const [lname,setlname]=useState("");
const [email,setemail]=useState("");
const [pass1,setpass1]=useState("");
const [pass2,setpass2]=useState("");
const [message,setmessage]=useState("");
const[show,changeshow]=useState("fa fa-eye-slash");
const dispatch=useDispatch();
const location = useLocation();
const redirect=location.search?location.search.split("=")[1]:"/";

const userSignup=useSelector((state)=>state.userSignup);
const{error,loading,userInfo}=userSignup
useEffect(()=>{
  if(userInfo){
    setmessage(userInfo.details)
    setfname("")
    setlname("")
    setemail("")
    setpass1("")
    setpass2("")
  }
},[userInfo,redirect])
const submitHandler=(e)=>{
e.preventDefault();
if(pass1 !== pass2){
  setmessage("Password Doesn't Match!!");

}
else if(!validEmail.test(email)){
  setmessage("InValid Email!!")
}
else if(!validPassword.test(pass1)){
  setmessage("Password doesn't match the Criteria!!")

}
else{
  dispatch(signup(fname,lname,email,pass1))
  setmessage("You Signedup Successfully Please Activate Your Account. ")
  navigate("/signup")
}



}
const showPassword=()=>{
  var x=document.getElementById("pass1");
  var y=document.getElementById("pass2");
  if(x.type === "password" && y.type === "password"){
    x.type="text";
    y.type="text";
    changeshow(`fa fa-eye`);
  }
  else{
    x.type="password";
    y.type="password";
    changeshow(`fa fa-eye-slash`);

  }

}
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <CardHeader as="h3" className="text-center bg-black text-light">
                Signup
              </CardHeader>
              <Card.Body>
                {message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>{" "}
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your First Name"
                      value={fname}
                      required
                      onChange={(e)=>setfname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>{" "}
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Last Name"
                      value={lname}
                      required
                      onChange={(e)=>setlname(e.target.value)}
                    />
                  </Form.Group>
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

                    <small className="text-danger">
                      Password must include atlest[1-9][a-z][A-Z][_$@*!..] & 5
                      characters
                    </small>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>
                      <span>
                        <i className={show}></i>
                      </span>{" "}
                      Confirm Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox onChange={ showPassword}></InputGroup.Checkbox>{" "}
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={pass2}
                        id="pass2"
                        required
                        onChange={(e)=>setpass2(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2">
                    <Button className="btn btn-md btn-success" type="submit">
                      Signup
                    </Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    Already User? 
                    <Link to="/login"> LOGIN IN</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpScreen;
