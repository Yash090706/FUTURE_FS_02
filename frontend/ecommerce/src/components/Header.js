import React from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar,Nav } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../actions/useractions'
import SearchBox from './searchbox'
// import { FaCircleUser } from 'react-icons/fa6';



const Header = () => {
  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  const dispatch=useDispatch();


  const logoutHandler=()=>{
    dispatch(logout())

  }
  return (
    <>
    <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <LinkContainer to="/">
    <Nav.Link className="navbar-brand">YASH ELECTRONICS

    </Nav.Link>
    </LinkContainer>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <LinkContainer to="/">
          <Nav.Link className="nav-link active">Home <i className="fa-solid fa-house"></i>
            </Nav.Link>
          </LinkContainer>

        </li>
        <li className="nav-item">
          <LinkContainer to="/Cart">
          <Nav.Link className="nav-link active">Cart <i class="fa-solid fa-cart-shopping"></i></Nav.Link>
          </LinkContainer>
          
        </li>
        <LinkContainer to="/profile">
        <Nav.Link className="text-white">
          Account
        </Nav.Link>
      </LinkContainer>
              <LinkContainer to="/myorders">
<Nav.Link className="nav-link text-white " >View Orders <i class="fa-solid fa-bag-shopping"></i>
  </Nav.Link>
</LinkContainer>
      {userInfo?(
         <li className="nav-item dropdown">
   <LinkContainer to="/">
   <Nav.Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Welcome {userInfo.name}</Nav.Link>
   </LinkContainer>
             <div className="dropdown-menu"onClick={logoutHandler}>
       <Nav.Link className="dropdown-item">Logout</Nav.Link>
   </div>
 </li>
      ):(
         <li className="nav-item dropdown">
   <LinkContainer to="/signup">
   <Nav.Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">New User?</Nav.Link>
   </LinkContainer>
             <div className="dropdown-menu">
     <LinkContainer to="/login">
       <Nav.Link className="dropdown-item">Login</Nav.Link>
     </LinkContainer>
     <LinkContainer to="/signup">
       <Nav.Link className="dropdown-item">Sign Up</Nav.Link>
     </LinkContainer>
   </div>
 </li>

      )}


      </ul>
      <Nav className="ms-auto">
    <SearchBox />
  </Nav>
    </div>

  </div>
</Navbar>
    </>
  )
}

export default Header;


