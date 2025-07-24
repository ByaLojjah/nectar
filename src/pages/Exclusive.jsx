import React from "react";

const Exclusive = () => {
  const products = [
    {
      id: 1,
      name: "Bananas",
      image: "https://i.pinimg.com/736x/f0/e8/ba/f0e8bae951c2ccdf948781a4f3ab4fde.jpg",
      price: 4.99,
    },
    {
      id: 2,
      name: "Pomme",
      image: "https://i.pinimg.com/736x/48/43/11/4843110c0a87f69186b7ad89e64100ee.jpg",
      price: 4.59,
    },
    {
      id: 3,
      name: "Raisain",
      image: "https://i.pinimg.com/736x/5d/ef/da/5defda60b0de8f3d67f0b362b38113e8.jpg",
      price: 5.19,
    },
    {
      id: 4,
      name: "Fraise",
      image: "https://i.pinimg.com/736x/e5/51/58/e55158e8fea3cb1bae182509a842085d.jpg",
      price: 3.49,
    },
    {
      id: 5,
      name: "Ananas",
      image: "https://i.pinimg.com/736x/a7/64/28/a7642807831419aa2696377ff4723681.jpg",
      price: 2.99,
    },
  ];

  const handleAdd = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product"; // À adapter selon ton routeur
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3 text-center">Exclusive Products</h4>
      <div className="d-flex overflow-auto gap-3">
        {products.map((product) => (
          <div className="card" style={{ width: "300px" }} key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top p-2"
              style={{ height: "150px", objectFit: "contain" }}
            />
            <div className="card-body text-center">
              <h6 className="card-title">{product.name}</h6>
              <p className="card-text">${product.price.toFixed(2)}</p>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleAdd(product)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exclusive;
