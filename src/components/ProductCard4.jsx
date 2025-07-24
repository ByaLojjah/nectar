import React from "react";

const ProductCard4 = () => {
  return (
    <section>
      <div className="d-flex justify-content-center">
        <div>
          <h1>Bakery & Snacks</h1>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row gap-4">
          {/* 1. Bread */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img
                src="public/images/pain.png"
                className="card-img-top w-100"
                height="200px"
                alt="Bread"
              />
              <div className="card-body">
                <h5 className="card-title">Bread</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <div>
                    <h5>$65.45</h5>
                  </div>
                  <div>
                    <a href="#" className="btn btn-success">
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Cake */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img
                src="public/images/pain1.png"
                className="card-img-top w-100"
                height="200px"
                alt="Cake"
              />
              <div className="card-body">
                <h5 className="card-title">Cake</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <div>
                    <h5>$25.90</h5>
                  </div>
                  <div>
                    <a href="#" className="btn btn-success">
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
         {/* 3. Cake */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img
                src="public/images/gateau.png"
                className="card-img-top w-100"
                height="200px"
                alt="Cake"
              />
              <div className="card-body">
                <h5 className="card-title">Cake</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <div>
                    <h5>$55.89</h5>
                  </div>
                  <div>
                    <a href="#" className="btn btn-success">
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* 4. Cake */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img
                src="public/images/pain c.png"
                className="card-img-top w-100"
                height="200px"
                alt="Cake"
              />
              <div className="card-body">
                <h5 className="card-title">Cake</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <div>
                    <h5>$35.45</h5>
                  </div>
                  <div>
                    <a href="#" className="btn btn-success">
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Cake */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img
                src="public/images/croissant.png"
                className="card-img-top w-100"
                height="200px"
                alt="Cake"
              />
              <div className="card-body">
                <h5 className="card-title">Cake</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <div>
                    <h5>$15.68</h5>
                  </div>
                  <div>
                    <a href="#" className="btn btn-success">
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Cake */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img
                src="public/images/croissant2.png"
                className="card-img-top w-100"
                height="200px"
                alt="Cake"
              />
              <div className="card-body">
                <h5 className="card-title">Cake</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <div>
                    <h5>$38.26</h5>
                  </div>
                  <div>
                    <a href="#" className="btn btn-success">
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          

        </div>
      </div>
    </section>
  );
};

export default ProductCard4;
