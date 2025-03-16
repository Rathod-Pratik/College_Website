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
    name: "Sunstar Fresh Melon Juice",
    image: "/Images/product-thumb-20.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 2,
    name: "Whole Wheat Sandwich Bread",
    image: "/Images/product-thumb-1.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 3,
    name: "Gourmet Dark Chocolate",
    image: "/Images/product-thumb-22.png",
    price: "$18.00",
    oldPrice: "$24.00",
    discount: "10% OFF",
    rating: 4.5,
    reviews: 222,
  },
  {
    id: 4,
    name: "Greek Style Plain Yogurt",
    image: "/Images/product-thumb-10.png",
    price: "$15.00",
    oldPrice: "$20.00",
    discount: "15% OFF",
    rating: 4.8,
    reviews: 180,
  },
  {
    id: 5,
    name: "Almond Butter Organic",
    image: "/Images/product-thumb-11.png",
    price: "$22.00",
    oldPrice: "$28.00",
    discount: "15% OFF",
    rating: 4.7,
    reviews: 190,
  },
  {
    id: 6,
    name: "Italian Olive Oil",
    image: "/Images/product-thumb-12.png",
    price: "$25.00",
    oldPrice: "$30.00",
    discount: "12% OFF",
    rating: 4.6,
    reviews: 210,
  },
];

const LatestProducts = () => {
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
    <section id="latest-products" className="products-carousel">
      <div className="container-lg overflow-hidden pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex justify-content-between align-items-center my-4">
              <h2 className="section-title">Just Arrived</h2>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary me-2">View All</button>
                <div class="swiper-buttons">
                  <button class="swiper-prev2 products-carousel-prev btn btn-primary mx-2">❮</button>
                  <button class="swiper-next2 products-carousel-next btn btn-primary">❯</button>
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
                nextEl: ".swiper-next2",
                prevEl: ".swiper-prev2",
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
                    <img
                      src={product.image}
                      alt={product.name}
                      className="tab-image"
                    />
                  </figure>
                  <div className="d-flex flex-column text-center">
                    <h3 className="fs-6 fw-normal">{product.name}</h3>
                    <div>
                      <span className="rating">
                        {[...Array(Math.floor(product.rating))].map((_, i) => (
                          <span key={i} className="text-warning">⭐</span>
                        ))}
                        {product.rating % 1 !== 0 && <span className="text-warning">⭐</span>}
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
                          <button className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                            🛒 Add to Cart
                          </button>
                        </div>
                        <div className="col-2">
                          <button onClick={AddTOwishlist(products)} className="btn btn-outline-dark rounded-1 p-2 fs-6">
                            ❤️
                          </button>
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

export default LatestProducts;
