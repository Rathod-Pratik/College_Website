import React from "react";
import { CiHeart } from "react-icons/ci";
import { apiClient } from "../lib/api-Client";
import { useAppStore } from "../Store";

const Selling = () => {
  const products = [
    {
      id: 1,
      title: "Whole Wheat Sandwich Bread",
      image: "/Images/product-thumb-1.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 2,
      title: "Whole Grain Oatmeal",
      image: "/Images/product-thumb-2.png",
      link: "index.html",
      rating: 4.5,
      reviews: 41,
      original_price: "$54.00",
      discounted_price: "$50.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 3,
      title: "Sharp Cheddar Cheese Block",
      image: "/Images/product-thumb-3.png",
      link: "index.html",
      rating: 4.5,
      reviews: 32,
      original_price: "$14.00",
      discounted_price: "$12.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 4,
      title: "Organic Baby Spinach",
      image: "/Images/product-thumb-4.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 5,
      title: "Organic Spinach Leaves (Fresh Produce)",
      image: "/Images/product-thumb-5.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 6,
      title: "Fresh Salmon",
      image: "/Images/product-thumb-6.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 7,
      title: "Imported Italian Spaghetti Pasta",
      image: "/Images/product-thumb-7.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 8,
      title: "Granny Smith Apples",
      image: "/Images/product-thumb-8.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 9,
      title: "Organic 2% Reduced Fat Milk",
      image: "/Images/product-thumb-9.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
    {
      id: 10,
      title: "Greek Style Plain Yogurt",
      image: "/Images/product-thumb-10.png",
      link: "index.html",
      rating: 4.5,
      reviews: 222,
      original_price: "$24.00",
      discounted_price: "$18.00",
      discount: "10% OFF",
      quantity: 1,
    },
  ];

  const { userInfo, addWishListItem, wishListItems } = useAppStore();
  const AddTOwishlist = async (product) => {
    try {
      if (!userInfo || !userInfo._id) {
        console.log("User not logged in.");
        return;
      }
  
      const response = await apiClient.post(`/wishlist`, {
      _id:userInfo._id,
        ...product,  // Spreading the product data into the object
      });
  
      if (response.status >= 200 && response.status < 300) {
        addWishListItem(product);
      } else {
        console.log("Some error occurred while adding to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  
  console.log(wishListItems);
  return (
    <section className="pb-5">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between my-4">
              <h2 className="section-title">Best selling products</h2>

              <div className="d-flex align-items-center">
                <a href="#" className="btn btn-primary rounded-1">
                  View All
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
              {products.map((product) => (
                <div className="col" key={product.id}>
                  <div className="product-item">
                    <figure>
                      <a href="index.html" title={product.title}>
                        <img
                          src={product.image}
                          alt="Product Thumbnail"
                          className="tab-image"
                        />
                      </a>
                    </figure>
                    <div className="d-flex flex-column text-center">
                      <h3 className="fs-6 fw-normal">{product.title}</h3>
                      <div>
                        <span className="rating">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="18"
                              height="18"
                              className="text-warning"
                            >
                              <use
                                xlinkHref={
                                  i < Math.floor(product.rating)
                                    ? "#star-full"
                                    : "#star-half"
                                }
                              ></use>
                            </svg>
                          ))}
                        </span>
                        <span>({product.reviews})</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <del>${product.original_price}</del>
                        <span className="text-dark fw-semibold">
                          ${product.discounted_price}
                        </span>
                        <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                          {product.discount}
                        </span>
                      </div>
                      <div className="button-area p-3 pt-0">
                        <div className="row g-1 mt-2">
                          <div className="col-3">
                            <input
                              readOnly
                              type="number"
                              name="quantity"
                              className="form-control border-dark-subtle input readOnly-number quantity"
                              value="1"
                            />
                          </div>
                          <div className="col-7">
                            <a
                              href="#"
                              className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"
                            >
                              <svg width="18" height="18">
                                <use xlinkHref="#cart"></use>
                              </svg>{" "}
                              Add to Cart
                            </a>
                          </div>
                          <div className="col-2">
                            <a
                              onClick={() => AddTOwishlist(product)}
                              className="btn btn-outline-dark rounded-1 p-2 fs-6"
                            >
                              <svg width="18" height="18">
                                <use xlinkHref="#heart"></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Selling;
