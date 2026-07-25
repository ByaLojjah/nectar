import React from "react";

const OrderHistory = () => {
  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">Historique des commandes</h1>

      <div className="card shadow-sm p-4">
        <p className="text-muted">
          Vous n'avez pas encore de commandes.
        </p>
      </div>
    </div>
  );
};

export default OrderHistory;