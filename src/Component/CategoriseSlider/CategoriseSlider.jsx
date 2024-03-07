import { queries } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

function Responsive() {
  // categories
  function getCategoriseData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("getCategory", getCategoriseData);

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
          color="#fff"
          width="150"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <h2 className=" fw-semibold mt-5 mb-2">Shop Popular Categorise</h2>
      <div className="slider-container  ">
        <Slider {...settings}>
          {data.data.data.map((categorie, index) => (
            <div key={index}>
              <img
                style={{ height: "250px" }}
                className="w-100"
                src={categorie.image}
                alt="categorie.imag"
              />
              <h3 className=" h5 fw-bolder text-muted text-center bg-main-light">
                {categorie.name}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Responsive;
