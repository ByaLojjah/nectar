import React, { useState } from "react";

const Product = ({ data }) => {
  const [showMessage, setShowMessage] = useState(false);

  // Taux de change CFA -> USD (par exemple 600 FCFA = 1 USD)
  const tauxChange = 600;

  // Conversion du prix
  const priceCFA = (data.price * tauxChange).toFixed(0); // USD → CFA
  const priceUSD = (data.price).toFixed(2); // Juste pour clarté
  // ou si tu pars du CFA : const priceUSD = (priceCFA / tauxChange).toFixed(2);

  const addToBasket = (id) => {
    console.log("Produit ajouté:", id);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div>
      <div className="container py-4 text-center">
        <h4>{data.name}</h4>
        <img
          src={data.image}
          alt={data.name}
          className="img-fluid mb-3"
          style={{ maxHeight: "200px" }}
        />
        <hr className="my-4" />
        <strong className="fw-bold text-black text-start">Produit Détail</strong>
        <p>
          Les fruits et légumes sont nutritifs.
          <br />
          Dans le cadre d'un régime alimentaire sain et varié.
        </p>
        <hr className="my-4" />
        <p className="fw-bold text-black">
          Avis{" "}
          <span className="fw-bold justify-content-end me-2 rounded text-end">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="fa fa-star"></span>
            ))}
          </span>
        </p>
        
        <p className="lead">
          {priceCFA} FCFA <br />
          <small className="text-muted">({priceUSD} USD)</small>
        </p>

        <button className="btn btn-success" onClick={() => addToBasket(data.id)}>
          Ajouter au panier
        </button>
      </div>

      {showMessage && <div className="success-message">Produit ajouté avec succès !</div>}
    </div>
  );
};

export default Product;
