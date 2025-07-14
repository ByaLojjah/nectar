import React, { useState } from "react";
import "./Cart.css"; // Assure-toi d’avoir ce fichier CSS à côté

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 0,
      name: "Bell Pepper Red",
      image: "image my cart/image1.png",
      unitPrice: 4.99,
      quantity: 0,
    },
    {
      id: 1,
      name: "Egg Chicken Red",
      image: "image my cart/image2.png",
      unitPrice: 1.99,
      quantity: 0,
    },
    {
      id: 2,
      name: "Organic Bananas",
      image: "image my cart/image3.png",
      unitPrice: 3.0,
      quantity: 0,
    },
    {
      id: 3,
      name: "Ginger",
      image: "image my cart/image4.png",
      unitPrice: 2.99,
      quantity: 0,
    },
  ]);

  const updateQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(0, p.quantity + delta) }
          : p
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const confirmOrder = () => {
    const ordered = products.filter((p) => p.quantity > 0);

    if (ordered.length === 0) {
      alert("❌ Aucun produit sélectionné !");
      return;
    }

    const lignes = ordered.map((p) => {
      const lineTotal = p.unitPrice * p.quantity;
      return `- ${p.name} x${p.quantity} = $${lineTotal.toFixed(2)}`;
    });

    const total = ordered.reduce(
      (acc, p) => acc + p.unitPrice * p.quantity,
      0
    );

    let message = "🛒 Résumé de votre commande :\n\n";
    message += lignes.join("\n");
    message += `\n\n💰 Total à payer : $${total.toFixed(2)}`;

    alert(message);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">🛒 My Cart</h1>

      {products.map((product) => (
        <div key={product.id} className="carte-produit mb-4">
          <img src={product.image} alt={product.name} />

          <div className="infos text-center">
            <h3>{product.name}</h3>
            <p>Prix unitaire</p>
            <div className="quantite">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="btn border"
              >
                −
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="btn border"
              >
                +
              </button>
            </div>
          </div>

          <div className="so">
            <div
              className="supprimer"
              onClick={() => removeProduct(product.id)}
            >
              ×
            </div>
            <div className="prix">
              ${(product.unitPrice * product.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      ))}

      <div className="bouton-confirmation">
        <button onClick={confirmOrder}>Confirmer la commande</button>
      </div>
    </div>
  );
};

export default Cart;
