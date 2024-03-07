import axios from "axios";
import React, { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Slider from "react-slick";
import toast from "react-hot-toast";

export default function DetailsProduct() {
  var settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // ^Function  call dataCart
  const { addProductToCart } = useContext(CartContext);

  async function postToCart(id) {
    let res = await addProductToCart(id);

    if (res) {
      toast.success("add success", { duration: 1500, position: "top-right" });
    } else {
      toast.error("add not succ", { duration: 1500, position: "top-right" });
    }
  }

  // !To Navigate In Component DetailsProduct
  const { id } = useParams();

  function getDetailsProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { isError, isLoading, data } = useQuery(
    `getDetailsProduct${id}`,
    getDetailsProduct
  );

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-light bg-opacity-50 justify-content-center align-items-center">
      <FallingLines
        color='#0aad0a'
        width="150"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
    );
  }

  if (isError) {
    return <Navigate to="/product" />;
  }
  const productDetails = data.data.data;
  return (
    <>
      <div className="container">
        <div className="row  align-items-center my-5">
          <div className="col-md-3">
            <div className="imagProduct  ">
              <Slider {...settings}>
                {productDetails.images.map((image) => (
                  <img
                    className="w-100"
                    src={image}
                    key={productDetails.id}
                    alt={productDetails.title}
                  />
                ))}
              </Slider>

              {/* <img
                className="w-100"
                src={productDetails.imageCover}
                alt={productDetails.title}
              /> */}
            </div>
          </div>
          <div className="col-md-9">
            <div className="productInfo">
              <p className="fw-bolder fs-5">{productDetails.description}</p>
              <p className="fw-semibold text-muted ">{productDetails.title}</p>
              <span className="fw-semibold fs-5 text-main">
                {productDetails.category.name}
              </span>
              <div className="price mt-2 d-flex justify-content-between align-items-center">
                {productDetails.priceAfterDiscount ? (
                  <p className="fw-bolder">
                    {" "}
                    <span className="text-decoration-line-through opacity-50">
                      {productDetails.price}
                    </span>{" "}
                    - {productDetails.priceAfterDiscount}
                  </p>
                ) : (
                  <p>{productDetails.price}</p>
                )}
                <span className="fw-semibold">
                  <i
                    style={{ color: "yellow" }}
                    className="fa-solid fa-star me-1"
                  ></i>
                  {productDetails.ratingsAverage}
                </span>
              </div>
            </div>
            <button
              onClick={() => postToCart(productDetails.id)}
              className="mt-3 btn bg-main w-100 text-white"
            >
              
              add to cart +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
