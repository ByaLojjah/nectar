import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedProduct"));
    if (data) {
      setProduct(data);
    }
  }, []);

  const addToBasket = (productId) => {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.push(productId);
    localStorage.setItem("basket", JSON.stringify(basket));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="container py-4 text-center">
      <h4>{product.name}</h4>
      <img
        src={product.image}
        className="img-fluid mb-3"
        style={{ maxHeight: "200px" }}
        alt={product.name}
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

      <button
        className="btn btn-success"
        onClick={() => addToBasket(product.id)}
      >
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
          }}
        >
          Produit ajouté avec succès !
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
