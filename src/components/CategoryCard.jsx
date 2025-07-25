import React, { useState } from "react";
// import produit1 from '../pages/img-categories/produit1.png';
// import produit2 from '../pages/img-categories/produit2 (2).png';
// import produit3 from '../pages/img-categories/produit3.png';
// import produit4 from '../pages/img-categories/produit4.png';
// import produit5 from '../pages/img-categories/produit5.png';
// import produit6 from '../pages/img-categories/produit6.png';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: "fruits", title: 'Fresh Fruits & Vegetables', img: produit1 },
  { id: "huile", title: 'Cooking Oil & Ghee', img: produit2 },
  { id: "meat", title: 'Meat & Fish', img: produit3 },
  { id: "bakery", title: 'Bakery & Snacks', img: produit4 },
  { id: "beverage", title: 'Beverage', img: produit6 },
  { id: "eggs", title: 'Eggs', img: produit5 },
  // { id: "oil", title: 'Oil', img: produit2 },
  // { id: "milk", title: 'Milk', img: produit5 },
];

// Composant carte produit
const CategoryItem = ({ product, onClick }) => (
  <div className="col">
    <div
      role="button"
      tabIndex={0}
      className="card h-100 shadow-sm border-0 category-card"
      onClick={() => onClick(product.id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(product.id)}
      style={{ cursor: "pointer", borderRadius: 12 }}
      aria-label={`Voir la catégorie ${product.title}`}
    >
      <img
        src={product.img}
        alt={product.title}
        className="card-img-top mx-auto d-block"
        style={{ maxHeight: 140, objectFit: "contain", padding: "1rem" }}
      />
      <div className="card-body">
        <h5 className="card-title text-center text-truncate" title={product.title}>
          {product.title}
        </h5>
      </div>
    </div>
  </div>
);

const CategoryCard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRedirect = (id) => {
    navigate(`/ProductCard/${id}`);
  };

  // Filtrer les produits selon la recherche
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container my-5 px-3 mt-5 pt-5">
      <header className="text-center mb-4">
        <h2 className="fw-bold">Find Products</h2>
        <div className="d-flex justify-content-center mt-3">
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search store..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 400 }}
          />
          <button
            className="btn btn-primary ms-2"
            onClick={() => alert("Recherche déclenchée : " + searchTerm)}
            aria-label="Search store button"
          >
            <i className="bi bi-search" /> Search
          </button>
        </div>
      </header>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-muted fs-5 mt-5">Aucun produit trouvé.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {filteredProducts.map((product) => (
            <CategoryItem key={product.id} product={product} onClick={handleRedirect} />
          ))}
        </div>
      )}

      <style>{`
        .category-card:hover {
          box-shadow: 0 0.75rem 1.5rem rgba(0, 123, 255, 0.25);
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        .category-card:focus {
          outline: 3px solid #0d6efd;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default CategoryCard;
