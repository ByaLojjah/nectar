import React, { useState } from "react";

const Product = ({ data }) => {
  const [showMessage, setShowMessage] = useState(false);

  // Taux de change USD -> CFA (à adapter si besoin)
  const tauxChange = 600;

  // Conversion du prix en CFA
  const priceCFA = (data.price * tauxChange).toFixed(0);

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
        <br />
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
        <p className="lead">{priceCFA} FCFA</p>
        <button className="btn btn-success" onClick={() => addToBasket(data.id)}>
          Ajouter au panier
        </button>
      </div>

      {showMessage && <div className="success-message">Produit ajouté avec succès !</div>}
    </div>
  );
};

export default Product;

