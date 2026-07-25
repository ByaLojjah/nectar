import React from "react";

const Settings = () => {
  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">Paramètres</h1>

      <div className="card shadow-sm p-4">
        <h5>Configuration du compte</h5>

        <p className="text-muted">
          Gérez vos préférences et paramètres utilisateur.
        </p>

        <button className="btn btn-success">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

export default Settings;