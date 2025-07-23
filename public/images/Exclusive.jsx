import React from "react";

const Exclusive = () => {
  const products = [
    {
      id: 1,
      name: "Bananas",
      image:
        "https://i.pinimg.com/736x/f0/e8/ba/f0e8bae951c2ccdf948781a4f3ab4fde.jpg",
      price: 4.99,
    },
    {
      id: 2,
      name: "Pomme",
      image:
        "https://i.pinimg.com/736x/48/43/11/4843110c0a87f69186b7ad89e64100ee.jpg",
      price: 4.59,
    },
    {
      id: 3,
      name: "Raisain",
      image:
        "https://i.pinimg.com/736x/5d/ef/da/5defda60b0de8f3d67f0b362b38113e8.jpg",
      price: 5.19,
    },
    {
      id: 4,
      name: "Fraise",
      image:
        "https://i.pinimg.com/736x/e5/51/58/e55158e8fea3cb1bae182509a842085d.jpg",
      price: 3.49,
    },
    {
      id: 5,
      name: "Ananas",
      image:
        "https://i.pinimg.com/736x/a7/64/28/a7642807831419aa2696377ff4723681.jpg",
      price: 2.99,
    },
  ];

const add = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
};

return (
    <div id="scroll-container" className="d-flex flex-wrap gap-3 justify-content-center">
        {products.map((p) => (
            <div key={p.id} className="card" style={{ width: "200px" }}>
                <img
                    src={p.image}
                    className="card-img-top p-2"
                    style={{ height: "150px", objectFit: "contain" }}
                    alt={p.name}
                />
                <div className="card-body text-center">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-success btn-sm" onClick={() => add(p)}>
                        +
                    </button>
                </div>
            </div>
        ))}
    </div>
    );
};

export default Exclusive;
