import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown} from 'react-bootstrap'
import logo from '../logo.png'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
       <Navbar  variant="dark" expand="lg" collapseOnSelect>
          <Container className='ms-4' fluid>

            <LinkContainer to='/'>
                <a href='/' className='navbar-brand' style = {{fontSize: "25px"}}><img className='img-thumbnail' id='logo' src={logo} alt='logo...'/></a>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className='ms-auto'>

                <LinkContainer to='/cart'>
                  <Nav.Link className='me-4'><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title = {userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link className='me-4'><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer> 

                    )}

                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title = 'Admin' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                      
                    </NavDropdown>
                    )}



                

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
    
  )
}

export default Header
