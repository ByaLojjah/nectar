import React from "react";

const Checkout = () => {
  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">Checkout</h1>

      <div className="card shadow-sm p-4">
        <h4>Finalisation de la commande</h4>

        <p className="text-muted">
          Vérifiez vos produits avant de procéder au paiement.
        </p>

        <button className="btn btn-success">
          Passer la commande
        </button>
      </div>
    </div>
  );
};

export default Checkout;