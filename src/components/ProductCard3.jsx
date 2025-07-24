// import React from "react";

const ProductCard3 = () => {
  return (
    <section>
      <div className="d-flex justify-content-center">
        <div>
          <h1>Meat & Fish</h1>
        </div>
        <div></div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row gap-4">

          {/* 1ère carte */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img src="public/images/viande.png" className="card-img-top w-100" height="200px" alt="Meat" />
              <div className="card-body">
                <h5 className="card-title">Meat</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <h5>$15.99</h5>
                  <a href="#" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2e carte */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img src="public/images/poulet.png" className="card-img-top w-100" height="200px" alt="Beef Bone" />
              <div className="card-body">
                <h5 className="card-title">Beef Bone</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <h5>$25.19</h5>
                  <a href="#" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3e carte */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img src="public/images/poisson.png" className="card-img-top" height="200px" alt="Fish" />
              <div className="card-body">
                <h5 className="card-title">Fish</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <h5>$18.88</h5>
                  <a href="#" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4e carte */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img src="public/images/arachide.png" className="card-img-top" height="200px" alt="Arachide" />
              <div className="card-body">
                <h5 className="card-title">Arachide</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <h5>$35.20</h5>
                  <a href="#" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 5e carte */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img src="public/images/guerter.png" className="card-img-top" height="200px" alt="Guerter" />
              <div className="card-body">
                <h5 className="card-title">Guerter</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <h5>$55.12</h5>
                  <a href="#" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 6e carte */}
          <div className="col text-center">
            <div className="card text-center" style={{ width: "18rem" }}>
              <img src="public/images/oeuf.png" className="card-img-top" height="200px" alt="Oeufs" />
              <div className="card-body">
                <h5 className="card-title">Oeufs</h5>
                <p className="card-text">1kg, Priceg</p>
                <div className="d-flex gap-5 justify-content-center">
                  <h5>$35.78</h5>
                  <a href="#" className="btn btn-success">
                    <i className="fa-solid fa-plus"></i>
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

export default ProductCard3;
