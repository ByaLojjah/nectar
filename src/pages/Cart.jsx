import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price;
  }, 0);

  const handleOrder = () => {
    alert('Merci pour votre commande !');
    clearCart();
  };

  return (
    <div className="container py-5 mt-5 pt-5">
      <h2 className="mb-4 text-center">
        <FaShoppingCart className="me-2" /> Mon Panier
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Votre panier est vide</h4>
          <p className="text-secondary">Ajoutez des produits pour commencer votre commande.</p>
        </div>
      ) : (
        <>
          <div className="row">
            {cart.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={item.img || item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title || item.name}</h5>
                    <p className="card-text text-success fw-bold mb-2">{item.price}</p>
                    <div className="mt-auto d-flex justify-content-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(index)}
                      >
                        <FaTrash className="me-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <h4 className="text-dark mb-3 mb-md-0">
              Total : <span className="text-success">${totalPrice.toFixed(2)}</span>
            </h4>
            <button
              className="btn btn-success btn-lg px-5"
              onClick={handleOrder}
            >
              Commander maintenant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
