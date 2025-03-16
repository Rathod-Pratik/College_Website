import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { apiClient } from "../lib/api-Client";
import { useAppStore } from "../Store";

const Featured_Product = () => {
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
   const productData= [
        {
          "title": "Greek Style Plain Yogurt",
          "image": "/Images/product-thumb-10.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Pure Squeezed No Pulp Orange Juice",
          "image": "/Images/product-thumb-11.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Fresh Oranges",
          "image": "/Images/product-thumb-12.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Gourmet Dark Chocolate Bars",
          "image": "/Images/product-thumb-13.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Fresh Green Celery",
          "image": "/Images/product-thumb-14.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Sandwich Bread",
          "image": "/Images/product-thumb-15.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Honeycrisp Apples",
          "image": "/Images/product-thumb-16.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        },
        {
          "title": "Whole Wheat Sandwich Bread",
          "image": "/Images/product-thumb-17.png",
          "link": "index.html",
          "rating": 4.5,
          "reviews": 222,
          "original_price": "$24.00",
          "discounted_price": "$18.00",
          "discount": "10% OFF"
        }
      ]
      

  return (
    <section id="featured-products" className="products-carousel">
      <div className="container-lg overflow-hidden py-5">
        <div className="row">
          <div className="col-md-12">

            <div className="section-header d-flex flex-wrap justify-content-between my-4">
              
              <h2 className="section-title">Featured products</h2>

              <div className="d-flex align-items-center">
                <a href="#" className="btn btn-primary me-2">View All</a>
                <div className="swiper-buttons ">
                  <button className="swiper-prev products-carousel-prev btn btn-primary m-2">❮</button>
                  <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                </div>  
              </div>
            </div>
            
          </div>
        </div>
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
          className="swiper"
        >
          {productData.map((product,index) => (
            <SwiperSlide key={index} className="product-item swiper-slide">
              <figure>
                <a href="index.html" title={product.title}>
                  <img src={product.image} alt={product.title} className="tab-image" />
                </a>
              </figure>
              <div className="d-flex flex-column text-center">
                <h3 className="fs-6 fw-normal">{product.title}</h3>
                <div>
                  <span className="rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="18" height="18" className={i < product.rating ? "text-warning" : "text-secondary"}>
                        <use xlinkHref={i < product.rating ? "#star-full" : "#star-half"}></use>
                      </svg>
                    ))}
                  </span>
                  <span>({product.reviews})</span>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <del>${product.original_price}</del>
                  <span className="text-dark fw-semibold">${product.discounted_price}</span>
                  <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                    {product.discount}
                  </span>
                </div>
                <div className="button-area p-3 pt-0">
                  <div className="row g-1 mt-2">
                    <div className="col-3">
                      <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                    </div>
                    <div className="col-7">
                      <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                        <svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart
                      </a>
                    </div>
                    <div className="col-2">
                      <a onClick={AddTOwishlist(productData)}  className="btn btn-outline-dark rounded-1 p-2 fs-6">
                        <svg width="18" height="18"><use xlinkHref="#heart"></use></svg>
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

export default Featured_Product;