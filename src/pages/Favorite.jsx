import React, { useEffect, useState } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleAdd = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product";
  };

  const handleRemoveFavorite = (indexToRemove) => {
    const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container py-4 mt-5 pt-5">
      <h4 className="mb-4 fw-bold text-center text-danger">❤️ Mes Favoris</h4>

      {favorites.length === 0 ? (
        <p className="text-center text-muted">Aucun produit ajouté aux favoris.</p>
      ) : (
        <div
          className="d-flex overflow-auto gap-4 px-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {favorites.map((product, index) => (
            <div
              className="card shadow-sm border-0"
              style={{ width: "250px", flex: "0 0 auto", scrollSnapAlign: "center" }}
              key={index}
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top rounded-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title fw-bold text-dark">{product.name}</h6>
                <p className="card-text text-muted">${product.price.toFixed(2)}</p>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleAdd(product)}
                    aria-label={`Ajouter ${product.name} au panier`}
                  >
                    <FaCartPlus /> Ajouter
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveFavorite(index)}
                    aria-label={`Supprimer ${product.name} des favoris`}
                  >
                    <FaTrash /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
