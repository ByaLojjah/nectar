import React from "react";

const Best = () => {
  const products = [
    {
      id: 1,
      name: "Piment",
      image:
        "https://i.pinimg.com/736x/7b/6c/5c/7b6c5c5430d95fe0cc8ef3464c66db59.jpg",
      price: 4.99,
    },
    {
      id: 2,
      name: "Ginger",
      image:
        "https://i.pinimg.com/736x/ac/40/0b/ac400bf6b98cdf235fea26515abf3235.jpg",
      price: 4.59,
    },
    {
      id: 3,
      name: "Aubergine",
      image:
        "https://i.pinimg.com/736x/75/73/6f/75736f14cca1a8f925e583a684addc96.jpg",
      price: 5.19,
    },
    {
      id: 4,
      name: "Carrot",
      image:
        "https://i.pinimg.com/736x/8f/e9/1f/8fe91fa57b62c158e36a5883febc1075.jpg",
      price: 3.49,
    },
    {
      id: 5,
      name: "Tomato",
      image:
        "https://i.pinimg.com/736x/0b/5d/41/0b5d415b75b3a0731ae71f372f944103.jpg",
      price: 2.99,
    },
  ];

  const handleAdd = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  };

  return (
    <div id="scroll-container" className="d-flex flex-wrap justify-content-center gap-3 p-3">
      {products.map((p) => (
        <div key={p.id} className="card" style={{ width: "300px" }}>
          <img
            src={p.image}
            className="card-img-top p-2"
            alt={p.name}
            style={{ height: "150px", objectFit: "contain" }}
          />
          <div className="card-body text-center">
            <h6 className="card-title">{p.name}</h6>
            <p className="card-text">${p.price}</p>
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleAdd(p)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Best;