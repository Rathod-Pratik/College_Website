import React from "react";

const NewsletterBanner = () => {
  return (
    <section>
      <div className="container-lg">
        <div className="bg-secondary text-light py-5 my-5 newsletter-banner">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-5 p-3 text-center text-md-start">
                <div className="section-header">
                  <h2 className="section-title display-5 text-light">
                    Get 25% Discount on Your First Purchase
                  </h2>
                </div>
                <p>Just Sign Up & Register now to become a member.</p>
              </div>

              {/* Right Side: Form */}
              <div className="col-md-5 p-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label d-none">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-md rounded-0"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label d-none">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-md rounded-0"
                      name="email"
                      id="email"
                      placeholder="Your Email Address"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark btn-md rounded-0">
                      Subscribe Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;