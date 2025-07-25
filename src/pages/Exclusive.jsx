import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCartPlus, FaHeart } from "react-icons/fa";

const exclusiveProducts = [
  { id: 1, name: "Banane", image: "https://i.pinimg.com/736x/f0/e8/ba/f0e8bae951c2ccdf948781a4f3ab4fde.jpg", price: 4.99 },
  { id: 2, name: "Pomme", image: "https://i.pinimg.com/736x/48/43/11/4843110c0a87f69186b7ad89e64100ee.jpg", price: 4.59 },
  { id: 3, name: "Raisin", image: "https://i.pinimg.com/736x/5d/ef/da/5defda60b0de8f3d67f0b362b38113e8.jpg", price: 5.19 },
  { id: 4, name: "Fraise", image: "https://i.pinimg.com/736x/e5/51/58/e55158e8fea3cb1bae182509a842085d.jpg", price: 3.49 },
  { id: 5, name: "Ananas", image: "https://i.pinimg.com/736x/a7/64/28/a7642807831419aa2696377ff4723681.jpg", price: 2.99 },
  { id: 6, name: "Mangue", image: "https://cdn.futura-sciences.com/sources/mangue-opti.jpeg", price: 3.99 },
  { id: 7, name: "Orange", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6GoLpPXoOkT0lAuFcxXwJSQ7nxtRQqVJLg&s", price: 3.49 },
  { id: 8, name: "Papaye", image: "https://www.lanutrition.fr/sites/default/files/ressources/papaye.jpg", price: 4.89 },
];

const Exclusive = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const handleAddToCart = (product) => {
    const item = {
      title: product.name,
      price: `$${product.price.toFixed(2)}`,
      img: product.image,
    };
    addToCart(item);
  };

  const handleAddToFavorites = (product) => {
    const exists = favorites.find((f) => f.id === product.id);
    if (!exists) {
      const updated = [...favorites, product];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${product.name} ajouté aux favoris !`);
    } else {
      alert(`${product.name} est déjà dans vos favoris.`);
    }
  };

  return (
    <div className="container py-5 mt-4 px-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-success">🌟 Produits Exclusifs</h3>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/home")}>
          ← Retour
        </button>
      </div>

      <div className="row g-4">
        {exclusiveProducts.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card shadow-sm h-100">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title fw-bold">{product.name}</h6>
                <p className="card-text text-success fw-semibold">${product.price.toFixed(2)}</p>
                <div className="d-flex flex-column gap-2 mt-auto">
                  <button className="btn btn-success w-100" onClick={() => handleAddToCart(product)}>
                    <FaCartPlus className="me-2" /> Ajouter au panier
                  </button>
                  <button className="btn btn-outline-danger w-100" onClick={() => handleAddToFavorites(product)}>
                    <FaHeart className="me-2" /> Favoris
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exclusive;
