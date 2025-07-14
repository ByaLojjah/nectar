import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="container recherche">
        <form className="d-flex m-5" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Egg"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <section className="container">
        <div className="row m-4 d-flex justify-content-center gap-5 liste">
          {[
            { name: "Egg Chicken Red", image: "image search/image01.png" },
            { name: "Egg Chicken White", image: "image search/image02.png" },
            { name: "Egg Pasta", image: "image search/image3.png" },
            { name: "Egg Noodles", image: "image search/image04.png" },
            { name: "Mayonnais Eggless", image: "image search/image05.png" },
            { name: "Egg Noodles", image: "image search/image06.png" },
          ]
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-12 border border-secondary border-1 rounded-4 text-center BLOC"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-100 h-50"
                />
                <p>
                  <strong>{product.name}</strong> <br />
                  <span className="text-secondary">4pcs, Price</span>
                </p>
                <div className="row d-flex justify-content-center">
                  <div className="col-4">
                    <h2>$1.99</h2>
                  </div>
                  <div className="col-4 text-end me-2">
                    <button
                      className="rounded-5"
                      style={{ border: "none", background: "none" }}
                    >
                      <i
                        className="fa-solid fa-square-plus"
                        style={{ color: "#76bc76", fontSize: "50px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
