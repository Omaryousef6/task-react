import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { cartId, clearData ,getUserCart } = useContext(CartContext);
  const nav = useNavigate();

  // ! API create Cash Payment
  function confirmCashPayment() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;

    const shippingObject = {
      shippingAddress: {
        details: details,
        phone,
        city,
      },
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingObject },
        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Payment Completed successfully");
          clearData();
          setTimeout(() => {
            nav("/allOrders");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("error Cash Payment", err);
      });
  }

  // ^ Api create Online Payment
  async function confirmOnlinePayment() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;

    const shippingObject = {
      shippingAddress: {
        details: details,
        phone,
        city,
      },
    };

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,

        { shippingObject },
        {
          headers: { token: localStorage.getItem("tkn") },
          params: { url: "http://localhost:3000" },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          // * windo.open => by default new tap -> blank \ open in tap , "_self"
          window.open(res.data.session.url , '_self');
        }
      })
      .catch((err) => {
        console.log("error Onile Payment", err);
      });
  }

  return (
    <>
      <div className="w-50 m-auto py-5">
        <h2 className="text-center fw-semibold text-muted">
          ConFirm Your Data
        </h2>

        <label htmlFor="city">City</label>
        <input
          type="city"
          placeholder="city.."
          id="city"
          className="form-control  mb-2"
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="phone"
          placeholder="Phone.."
          id="phone"
          className="form-control mb-2"
        />

        <label htmlFor="details">Details</label>
        <textarea
          type="details"
          placeholder="details.."
          id="details"
          className="form-control  mb-2"
        ></textarea>

        <div className="button d-flex justify-content-between align-items-center ">
          <button
            onClick={() => confirmCashPayment()}
            className=" btn btn-success mt-3 fw-bolder"
          >
            Confirm Cash Payment
          </button>
          <button
            onClick={() => confirmOnlinePayment()}
            className=" btn btn-primary mt-3 fw-bolder"
          >
            Confirm Online Payment
          </button>
        </div>
      </div>
    </>
  );
}
