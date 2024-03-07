import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import AutoPlay from "../HomeSlider/Slider";
import Responsive from "../CategoriseSlider/CategoriseSlider";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  // ^Function  call dataCart
  const { addProductToCart } = useContext(CartContext);

  async function postToCart(id) {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Add Successfuly", {
        icon: "👏",
        duration: 1500,
        position: "top-right",
      });
    } else {
      toast.error("error", {
        duration: 1500,
        position: "top-right",
      });
    }
  }
  //  async function addProduct(id) {
  //    await addProductToCart(id);

  //   }
  // const [allproducts, setAllproducts] = useState([]);

  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    // await axios
    //  axios.get("https://ecommerce.routemisr.com/api/v1/products")
    //   .then((res) => {
    //     setAllproducts(res.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  // react-query
  const { data, isError, isLoading, isFetching } = useQuery(
    "getAllProduct",
    getAllProducts
  );

  console.log("data in Fun getAllProduct", data?.data.data);
  console.log("error in Fun getAllProduct", isError);
  console.log("loading in Fun getAllProduct", isLoading);
  console.log("fetch in Fun getAllProduct", isFetching);

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-light bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
          color="#0aad0a"
          width="150"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <>
      <div className="container pt-5">
        <div className="row g-0  mt-5">
          <div className="col-md-8">
            <AutoPlay />
          </div>
          <div className="col-md-4">
            <div>
              <img
                style={{ height: "150px" }}
                className="w-100"
                src={require("../../images/grocery-banner-2.jpeg")}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ height: "150px" }}
                className="w-100"
                src={require("../../images/grocery-banner.png")}
                alt=""
              />
            </div>
          </div>
        </div>

        <Responsive />

        <div className="row g-4 mt-2">
          {data?.data.data.map((product, index) => (
            <div
              key={index}
              className="product p-2 rounded-3 col-md-2 "
            >
              <Link
                to={`/DetailsProduct/${product.title
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}/${product.id}`}
              >
                <div>
                  <img className="w-100" src={product.imageCover} alt="" />
                  <h3 className="h6 fw-bolder text-main text-center ">
                    {product.category.name}
                  </h3>
                  <h2 className="h6 fw-bold text-center text-muted">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>

                  <div className="fw-semibold d-flex justify-content-between">
                    {product.priceAfterDiscount ? (
                      <p>
                        <span className="text-decoration-line-through opacity-50">
                          {product.price}
                        </span>{" "}
                        - {product.priceAfterDiscount}
                      </p>
                    ) : (
                      <p>{product.price}</p>
                    )}
                    <p>
                      <span>
                        <i
                          style={{ color: "yellow" }}
                          className="fa-solid fa-star"
                        ></i>
                      </span>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => postToCart(product.id)}
                className="btn bg-main text-white w-50 m-auto d-block"
              >
                add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* {allproducts.length > 0 ? 
        <div className="container">
          <div className="row g-5">
            {allproducts.map((product, index) => (
              <div key={index} className="col-md-2">
                <div className="product">
                  
                   <img className="w-100" src={product.imageCover} alt="" />
                  <h3 className="h6 fw-bolder text-main text-center ">
                    {product.category.name}
                  </h3>
                  <h2 className="h6 fw-bold text-center text-muted">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>

                  <div className="fw-semibold d-flex justify-content-between">
                    {product.priceAfterDiscount ? (
                      <p>
                        <span className="text-decoration-line-through opacity-50">
                          {product.price}
                        </span>{" "}
                        - {product.priceAfterDiscount}
                      </p> 
                    ) : (
                      <p>{product.price}</p>
                    )}
                    <p>
                      <span>
                        <i
                          style={{ color: "yellow" }}
                          className="fa-solid fa-star"
                        ></i>
                      </span>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       : 
        <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
          <FallingLines
            color="#fff"
            width="150"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      }  */}
    </>
  );
}
