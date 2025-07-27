import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedProduct"));
    if (data) {
      setProduct(data);
    }
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="container py-4 text-center mt-5 pt-5 bg-danger">
      <h4>{product.name || product.title}</h4>
      <img
        src={product.image || product.img}
        className="img-fluid mb-3"
        style={{ maxHeight: "200px", objectFit: "cover" }}
        alt={product.name || product.title}
      />
      <p className="lead">${product.price}</p>

      <button className="btn btn-success" onClick={handleAddToCart}>
        Ajouter au panier
      </button>

      {showSuccess && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "green", color: "white", padding: 10 }}>
          Produit ajouté avec succès !
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
