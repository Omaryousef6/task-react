import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  function logOut() {
    // Remove  Token in Stat
    setToken(undefined);

    // Remove token in local storage
    localStorage.clear("tkn");
    // naviget User Login
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-3 ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Frech Cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="home"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="product">
                    Products
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"brand"}>
                    Brands
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="cart">
                    Cart
                  </Link>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                    {numOfCartItems ? numOfCartItems : ""}
                    {/* ?? lw el value b zero  */}
                    {/* {numOfCartItems ?? ''} */}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"allOrders"}>
                    allOrders
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center">
              {token ? (
                <>
                  <li className="nav-item">
                    <ul className=" list-unstyled d-flex ">
                      <li>
                        <i className="me-3 fa-brands fa-instagram"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa-facebook-f"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa-linkedin"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa-twitter"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa- fa-youtube"></i>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <span onClick={logOut} role="button" className="nav-link">
                      LogOut
                    </span>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"profile"}>
                    Profile
                  </Link>
                </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"login"}>
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={"register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
