import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Récupérer fonctions et données du panier global via contexte
  const { basket, addToCart } = useCart();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("selectedProduct"));
    if (data) {
      if (!data.id) {
        data.id = Date.now() + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("selectedProduct", JSON.stringify(data));
      }
      setProduct(data);
    }
  }, []);

  const addToBasket = async (product) => {
    if (!product) {
      console.warn("Produit invalide");
      return;
    }

    // Vérifie si le produit est déjà dans le panier global (contexte)
    const exists = basket.some((item) => item.id === product.id);
    if (exists) {
      alert("Ce produit est déjà dans le panier.");
      return;
    }

    try {
      await addToCart(product);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur ajout panier :", error);
      alert("Erreur lors de l'ajout au panier.");
    }
  };

  if (!product) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container py-4 text-center pt-5 mt-5">
      <h4>{product.name || product.title}</h4>
      <img
        src={product.image || product.img}
        className="img-fluid mb-3"
        style={{ maxHeight: "200px", objectFit: "cover" }}
        alt={product.name || product.title}
      />
      <hr className="my-4" />
      <strong className="fw-bold text-black text-start">Produit Détail</strong>
      <p>
        Les Fruits, légumes et viandes sont nutritives.
        <br />
        Dans le cadre d'un régime alimentaire sain et varié.
      </p>
      <hr className="my-4" />
      <p className="fw-bold text-black">
        Avis{" "}
        <span className="fw-bold justify-content-end me-2 rounded text-end">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="fa fa-star" style={{ color: "#ffcc00" }} />
          ))}
        </span>
      </p>
      <p className="lead">${product.price}</p>

      <button className="btn btn-success" onClick={() => addToBasket(product)}>
        Ajouter au panier
      </button>

      {showSuccess && (
        <div
          style={{
            display: "block",
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "green",
            color: "white",
            padding: 10,
            borderRadius: 5,
            fontSize: 20,
            fontWeight: "bold",
            zIndex: 9999,
          }}
        >
          Produit ajouté avec succès !
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
