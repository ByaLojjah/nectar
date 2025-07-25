import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products'; // tu dois avoir un tableau de produits ici
import { FaArrowLeft, FaCartPlus } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Chercher le produit par ID
  const product = products.find((item) => item.id.toString() === id);

  if (!product) {
    return <div className="container mt-5">Produit non trouvé</div>;
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier !');
  };

  return (
    <div className="container mt-5">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
        <FaArrowLeft /> Retour
      </button>

      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">{product.price} FCFA</h4>

          <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
            <FaCartPlus className="me-2" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
