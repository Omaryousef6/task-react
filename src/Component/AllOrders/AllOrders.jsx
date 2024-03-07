import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);

  function getUserOrders() {
    const cartOwner = localStorage.getItem("cartOwner");

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
      .then((res) => {
        console.log("res orders", res.data);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log("err AllOrders", err);
      });
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <div className="container ">
        <div className="row g-4">
          {allOrders?.map((order, index) => {
            return (
              <div key={index} className="col-md-6">
                <div className="order p-4 bg-main-light h-100 rounded-3">
                  <div className="totalPayment ">
                    <h5 className="fw-semibold text-muted">
                      <span className="fw-semibold text-main">
                        Payment Method :
                      </span>
                      {order.paymentMethodType}
                    </h5>
                    <h5 className="fw-semibold text-muted">
                      <span className="fw-semibold text-main">
                        Total Order Price :
                      </span>
                      {order.totalOrderPrice}
                    </h5>
                  </div>
                  <div className="container">
                    <div className="row g-2">
                      {/*  Repeat  */}
                      {order.cartItems.map((item, secIndex) => (
                        <div key={secIndex} className="col-md-6">
                          <div className="orderInfo bg-white p-2 h-100 rounded-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <img
                                className="w-50 pb-3"
                                src={item.product.imageCover}
                                alt={item.product.title}
                              />
                              <div >
                              <h6 className="fw-semibold text-muted" >
                              <span className="text-main">
                                count :
                              </span>{" "}
                              {item.count}
                            </h6>
                            <h6 className="fw-semibold text-muted">
                              <span className="text-main">
                                Price :
                              </span>{" "}
                              {item.price}
                            </h6>
                              </div>
                            </div>

                            <h6 className="fw-semibold text-muted ">
                              <span className="fw-semibold text-main">
                                Title:
                              </span>{" "}
                              {item.product.title}
                            </h6>
                            
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
