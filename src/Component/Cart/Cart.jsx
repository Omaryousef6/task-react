import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { FallingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  // const [update, setUpdate] = useState(undefined)

  const {
    clearData,
    removeProductToData,
    updateToData,
    totalCartPrice,
    allProducts,
  } = useContext(CartContext);

  // if (!allProducts) {
  //   return (
  //     <div className="d-flex vh-100 bg-light bg-opacity-50 justify-content-center align-items-center">
  //       <FallingLines
  //         color="#0aad0a"
  //         width="150"
  //         visible={true}
  //         ariaLabel="falling-circles-loading"
  //       />
  //     </div>
  //   );
  // }

  async function updateToCart(id, newCount) {
    // id , newCount
    const update = await updateToData(id, newCount);

    if (update) {
      toast.success("success", { position: "top-center" });
    } else {
      toast.error("error", { position: "top-center" });
    }
  }

  async function deleteProductToCart(id) {
    const booleanFlag = await removeProductToData(id);

    if (booleanFlag) {
      toast.success("success delete", { position: "top-center" });
    } else {
      toast.error("error delete", { position: "top-center" });
    }
  }

  return (
    <>
      <div className="container  bg-main-light p-5">
        <div className="d-flex  justify-content-between align-items-center pt-5">
          <div>
            <h2 className="fw-bold border-bottom border-3">Shop Cart:</h2>
            <h5 className="text-main fw-semibold">
              Total Cart Price : {totalCartPrice} EGP{" "}
            </h5>
            <Link to="/payment">
              <button className="btn btn-outline-dark fw-bolder">
                ConFirm Payment
              </button>
            </Link>
          </div>
          <button
            onClick={() => {
              clearData();
            }}
            className="btn btn-outline-success"
          >
            Clear Cart
          </button>
        </div>

        {allProducts?.map((product, index) => (
          <div
            key={index}
            className="row align-items-center border-bottom border-2 "
          >
            <div className="col-md-2">
              <figure>
                <img
                  className="w-100 pt-4"
                  src={product.product.imageCover}
                  alt={product.product.title}
                />
              </figure>
            </div>
            <div className="col-md-8">
              <article>
                <h5 className="fw-semibold">{product.product.title}</h5>
                <h5 className="text-main">price :{product.price}</h5>
                <button
                  onClick={() => {
                    deleteProductToCart(product.product.id);
                  }}
                  className="btn btn-outline-success"
                >
                  Remove
                </button>
                <br />
                1:{product._id} <br />
                2:{product.product.id}
              </article>
            </div>
            <div className="col-md-2">
              <div className="d-flex justify-content-around align-items-center">
                <button
                  onClick={() => {
                    updateToCart(product.product.id, product.count + 1);
                  }}
                  className="btn btn-outline-success"
                >
                  +
                </button>
                <span>{product.count}</span>
                <button
                  disabled={product.count === 0}
                  onClick={() => {
                    updateToCart(product.product.id, product.count - 1);
                  }}
                  className="btn btn-outline-success"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
