import React from "react";

const Featured = () => {
  return (
    <section className="py-3">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="banner-blocks d-flex flex-wrap gap-3 justify-content-between">
              
              {/* Banner 1 */}
              <div
                className="banner-ad d-flex align-items-center justify-content-center large block-1"
                style={{
                  background: "url('/Images/banner-ad-1.jpg') center center / cover no-repeat",
                  height: "250px",
                  width: "100%",
                }}
              >
                <div className="banner-content text-center text-light">
                  <h3 className="banner-title">Items on SALE</h3>
                  <p>Discounts up to 30%</p>
                  <a href="#" className="btn btn-light">
                    Shop Now
                  </a>
                </div>
              </div>

              {/* Banner 2 */}
              <div
                className="banner-ad d-flex align-items-center justify-content-center block-2"
                style={{
                  background: "url('/Images/banner-ad-2.jpg') center center / cover no-repeat",
                  height: "250px",
                  width: "100%",
                }}
              >
                <div className="banner-content text-center text-light">
                  <h3 className="banner-title">Combo Offers</h3>
                  <p>Discounts up to 50%</p>
                  <a href="#" className="btn btn-light">
                    Shop Now
                  </a>
                </div>
              </div>

              {/* Banner 3 */}
              <div
                className="banner-ad d-flex align-items-center justify-content-center block-3"
                style={{
                  background: "url('/Images/banner-ad-3.jpg') center center / cover no-repeat",
                  height: "250px",
                  width: "100%",
                }}
              >
                <div className="banner-content text-center text-light">
                  <h3 className="banner-title">Discount Coupons</h3>
                  <p>Discounts up to 40%</p>
                  <a href="#" className="btn btn-light">
                    Shop Now
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
