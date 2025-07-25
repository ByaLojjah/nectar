import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price;
  }, 0);
  
  const handleOrder = () => {
    alert('Merci pour votre commande !');
    // Tu peux aussi rediriger vers une page de paiement ou vider le panier
  };

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">Mon Panier</h2>
      {cart.length === 0 ? (
        <p>Aucun produit dans le panier.</p>
      ) : (
        <>
          <div className="row">
            {cart.map((item, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.img}
                        className="img-fluid rounded-start"
                        alt={item.title}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text text-success fw-bold">{item.price}</p>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(index)}
                        >
                          <FaTrash /> Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total : ${totalPrice.toFixed(2)}</h4>
            <button
              className="btn btn-success px-4 py-2"
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
