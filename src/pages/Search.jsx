
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
        <div className="row m-4 d-flex justify-content-center gap-5 listeh">
          {[
            { name: "Egg Chicken Red", image: "images/image01.png" },
            { name: "Egg Chicken White", image: "images/image02.png" },
            { name: "Egg Pasta", image: "images/image3.png" },
            { name: "Egg Noodles", image: "images/image04.png" },
            { name: "Mayonnais Eggless", image: "images/image05.png" },
            { name: "Egg Noodles", image: "images/image06.png" },
          ]
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-12 border border-secondary border-1 rounded-4 text-center BLOC "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-100 h-50 p-4 mt-5"
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
                      className="rounded-2"
                      style={{ border: "none", background: "white", height: "40px", width: "70%", }}
                    >
                      <i
                        className="fa-solid fa-square-plus "
                        style={{ color: "#76bc76", fontSize: "40px" }}
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

