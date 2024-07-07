import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage.jsx';
import ProductPage from "./pages/ProductPage.jsx";
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from "./pages/CartPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  // toast,
  ToastContainer
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressPage from "./pages/ShippingAddressPage.jsx";
import SignupPage from "./pages/SignUp.jsx";

function App() {
  const { state,
    dispatch: ctxDispatch
  } = useContext(Store);
  const { cart, userInfo } = state;


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  Cool Commerce
                </Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />}></Route>
              <Route path="/" element={<HomePage />} />

            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center mb-3 pt-3">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
