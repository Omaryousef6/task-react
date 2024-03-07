import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AutoPlay() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={require("../../images/slider-image-1.jpeg")}
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={require("../../images/slider-image-2.jpeg")}
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={require("../../images/slider-image-3.jpeg")}
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={require("../../images/grocery-banner-2.jpeg")}
            alt=""
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={require("../../images/blog-img-2.jpeg")}
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
