import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { img: "/Images/category-thumb-1.jpg", title: "Fruits & Veges" },
  { img: "/Images/category-thumb-2.jpg", title: "Breads & Sweets" },
  { img: "/Images/category-thumb-3.jpg", title: "Beverages" },
  { img: "/Images/category-thumb-4.jpg", title: "Meat Products" },
  { img: "/Images/category-thumb-5.jpg", title: "Breads" },
  { img: "/Images/category-thumb-6.jpg", title: "Dairy" },
  { img: "/Images/category-thumb-7.jpg", title: "Frozen Foods" },
  { img: "/Images/category-thumb-8.jpg", title: "Snacks" },
];

const CategoryCarousel = () => {
  return (
    <section className="py-5 overflow-hidden">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">
              <h2 className="section-title">Category</h2>
              <div className="d-flex align-items-center">
                <a href="/categories" className="btn btn-primary me-2">
                  View All
                </a>
                <div className="swiper-buttons ">
                  <button className="swiper-prev swiper-prev3 btn btn-primary m-2">
                    ❮
                  </button>
                  <button className="swiper-next swiper-next3 btn btn-primary">
                    ❯
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="row">
          <div className="col-md-12">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-next3",
                prevEl: ".swiper-prev3",
              }}
              slidesPerView={4}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <a
                    href="/category"
                    className="nav-a d-flex flex-column align-items-center text-decoration-none"
                  >
                    <img
                      src={category.img}
                      className="rounded-circle img-fluid"
                      alt={category.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <h4 className="fs-6 mt-2 fw-normal text-center category-title">
                      {category.title}
                    </h4>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
