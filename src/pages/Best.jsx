// src/pages/Best.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const bestProducts = [
  { id: 1, name: "Piment", image: "https://i.pinimg.com/736x/7b/6c/5c/7b6c5c5430d95fe0cc8ef3464c66db59.jpg", price: 4.99 },
  { id: 2, name: "Ginger", image: "https://i.pinimg.com/736x/ac/40/0b/ac400bf6b98cdf235fea26515abf3235.jpg", price: 4.59 },
  { id: 3, name: "Aubergine", image: "https://i.pinimg.com/736x/75/73/6f/75736f14cca1a8f925e583a684addc96.jpg", price: 5.19 },
  { id: 4, name: "Carotte", image: "https://i.pinimg.com/736x/8f/e9/1f/8fe91fa57b62c158e36a5883febc1075.jpg", price: 3.49 },
  { id: 5, name: "Tomate", image: "https://i.pinimg.com/736x/0b/5d/41/0b5d415b75b3a0731ae71f372f944103.jpg", price: 2.99 },
  { id: 6, name: "Chou vert", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeSK2zTLe7L5NH_MzAQUcaRhFCxfiJlXBg4AxAv1B90kwMdP-4T3tscpvkIClZe9vk_Y&usqp=CAU", price: 4.79 },
  { id: 7, name: "Oignon rouge", image: "https://www.academiedugout.fr/images/15749/1200-auto/fotolia_61211686_subscription_xl-copy.jpg?poix=50&poiy=50", price: 2.29 },
  { id: 8, name: "Feuilles de menthe", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG6jwthJym6s47UvhrKq2fpu-U-VM4kR6xgw&s", price: 1.99 },
  { id: 9, name: "Persil", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQns5lLN8gnnUx7EVuE5BANsFWNk6R91eTaFQ&s", price: 2.15 },
  { id: 10, name: "Poivron vert", image: "https://static.wixstatic.com/media/2db10a_f70af7ce5038462f93a2ac208f6310e6~mv2.png/v1/fill/w_480,h_508,al_c,lg_1,q_85,enc_avif,quality_auto/2db10a_f70af7ce5038462f93a2ac208f6310e6~mv2.png", price: 3.79 },
];

const Best = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setProducts(bestProducts);
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
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = existing.find((item) => item.id === product.id);

    if (!alreadyExists) {
      const updated = [...existing, product];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${product.name} ajouté aux favoris !`);
    } else {
      alert(`${product.name} est déjà dans vos favoris.`);
    }
  };

  return (
    <div className="container py-5 mt-4 px-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-success">🔥 Meilleurs Produits</h3>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/home")}>← Retour</button>
      </div>

      <div className="row g-4">
        {products.map((product) => (
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
                    Ajouter au panier
                  </button>
                  <button className="btn btn-outline-danger w-100" onClick={() => handleAddToFavorites(product)}>
                    ❤️ Favoris
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

export default Best;
