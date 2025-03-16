import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { apiClient } from "../lib/api-Client";
import { useAppStore } from "../Store";

const products = [
  {
    id: 1,
    name: "Sandwich Bread",
    image: "/Images/product-thumb-15.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 2,
    name: "Honeycrisp Apples",
    image: "/Images/product-thumb-16.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 3,
    name: "Whole Wheat Sandwich Bread",
    image: "/Images/product-thumb-17.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 4,
    name: "Fresh Oranges",
    image: "/Images/product-thumb-12.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 5,
    name: "Almond Butter",
    image: "/Images/product-thumb-18.png",
    price: "$22.00",
    oldPrice: "$28.00",
    discount: "15% OFF",
    rating: 4.7,
    reviews: 190,
  },
];
const AddTOwishlist=async(ProductData)=>{
  const { userInfo,addWishListItem } = useAppStore();
  try {
    const response=await apiClient.post(userInfo.userId,ProductData)
    if(response.config===200){
      addWishListItem(ProductData);
    }
    else{
      console.log("some error is occured");
    }
  } catch (error) {
    console.log(error);
  }
}

const PopularProducts = () => {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const swiperRef = useRef(null);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value >= 1 ? value : 1,
    }));
  };

  return (
    <section id="popular-products" className="products-carousel">
      <div className="container-lg overflow-hidden py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex justify-content-between align-items-center my-4">
              <h2 className="section-title">Most Popular Products</h2>
              <div className="d-flex align-items-center gap-2">
                <a href="#" className="btn btn-primary me-2">
                  View All
                </a>
                <div class="swiper-buttons">
                  <button class="swiper-prev products-carousel-prev btn btn-primary mx-2">❮</button>
                  <button class="swiper-next products-carousel-next btn btn-primary">❯</button>
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
                         nextEl: ".swiper-next",
                         prevEl: ".swiper-prev",
                       }}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="product-item">
                  <figure>
                    <a href="index.html" title={product.name}>
                      <img
                        src={product.image}
                        alt="Product Thumbnail"
                        className="tab-image"
                      />
                    </a>
                  </figure>
                  <div className="d-flex flex-column text-center">
                    <h3 className="fs-6 fw-normal">{product.name}</h3>
                    <div>
                      <span className="rating">
                        {[...Array(Math.floor(product.rating))].map((_, i) => (
                          <svg key={i} width="18" height="18" className="text-warning">
                            <use xlinkHref="#star-full"></use>
                          </svg>
                        ))}
                        {product.rating % 1 !== 0 && (
                          <svg width="18" height="18" className="text-warning">
                            <use xlinkHref="#star-half"></use>
                          </svg>
                        )}
                      </span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <del>{product.oldPrice}</del>
                      <span className="text-dark fw-semibold">{product.price}</span>
                      <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                        {product.discount}
                      </span>
                    </div>
                    <div className="button-area p-3 pt-0">
                      <div className="row g-1 mt-2">
                        <div className="col-3">
                          <input
                            type="number"
                            name="quantity"
                            className="form-control border-dark-subtle input-number quantity"
                            value={quantities[product.id]}
                            onChange={(e) =>
                              handleQuantityChange(product.id, parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div className="col-7">
                          <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                            <svg width="18" height="18">
                              <use xlinkHref="#cart"></use>
                            </svg>{" "}
                            Add to Cart
                          </a>
                        </div>
                        <div className="col-2">
                          <a onClick={AddTOwishlist(product)} className="btn btn-outline-dark rounded-1 p-2 fs-6">
                            <svg width="18" height="18">
                              <use xlinkHref="#heart"></use>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;