// Banner.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaShoppingBag } from "react-icons/fa";

const Banners = [
  {
    id: '1',
    title: "Suoi Thong",
    decription: "Embark on an exhilarating literary journey with our sizzling new release – a captivating page-turner that weaves a spellbinding tale of passion, intrigue, and uncharted adventures.",
    image: "/banners/banner_1.png",
  },
  {
    id: '2',
    title: "7 Chien Luoc Thinh Vuong Va Hanh Phuc",
    decription: "Dive into the gripping narrative of our latest sensation, where every page radiates with an irresistible blend of suspense, romance, and unbridled excitement, ensuring you're hooked from start to finish.",
    image: "/banners/banner_2.png",
  },
]

const Banner = () => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-primaryBG mt-40 xl:px-28 px-4">
      <Slider {...sliderSettings}>
        {Banners.map(banner => (
          <div key={banner.id}>
            <div className="py-28 flex flex-col md:flex-row-reverse justify-between items-center gap-52">
              <div className="md:w-1/2">
                <img src={banner.image} alt={`banner_${banner.id}`} className="h-144"/>
              </div>

              <div className="md:w-1/2">
                <h1 className="text-5xl font-light md-5">Collections</h1>
                <p className="text-xl mb-7">{banner.decription}</p>
                <button className="bg-black hover:bg-orange-500 px-6 py-2 text-white font-semibold rounded-sm flex justify-center items-center gap-2">
                  <FaShoppingBag className="inline-flex" />
                  Shop now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
