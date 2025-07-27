import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Cart = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchBasket = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBasket(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
      }
    };

    fetchBasket();
  }, []);

  const total = basket.reduce((sum, item) => {
    let price = 0;
    if (typeof item.price === "string") {
      price = parseFloat(item.price.replace("$", "")) || 0;
    } else if (typeof item.price === "number") {
      price = item.price;
    }
    return sum + price;
  }, 0);

  const handleRemove = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Supprimer le doc Firestore
      await deleteDoc(doc(db, "users", user.uid, "cart", id));

      // Mettre à jour le state local
      setBasket(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };

  const handleOrder = () => {
    if (basket.length === 0) {
      alert("Votre panier est vide.");
      return;
    }
    alert(`Merci pour votre commande ! Montant total : $${total.toFixed(2)}`);
    setBasket([]);
    // Optionnel : vider Firestore ? Sinon garder
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Mon Panier</h2>
      {basket.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {basket.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name || item.title}</strong>
                  <p className="mb-0 text-muted">${item.price}</p>
                </div>
                <img
                  src={item.img || item.image}
                  alt={item.name || item.title}
                  style={{ height: 60, width: 60, objectFit: "cover" }}
                />
                <button
                  className="btn btn-sm btn-danger ms-3"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Supprimer ${item.name || item.title}`}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <h4>Total : ${total.toFixed(2)}</h4>
          <button className="btn btn-success w-100 mt-3" onClick={handleOrder}>
            Commander
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
