// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export { CartContext };


export const CartProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // Charger le panier Firestore au montage
  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBasket(items);
      } catch (err) {
        console.error("Erreur récupération panier Firestore", err);
      }
    };
    fetchCart();
  }, []);

  // Ajouter un produit au panier (Firestore + local state + localStorage)
  const addToCart = async (product) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Veuillez vous connecter");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "cart"), product);
      setBasket(prev => [...prev, { id: docRef.id, ...product }]);

      // Mise à jour localStorage (optionnel, pour compatibilité)
      const existing = JSON.parse(localStorage.getItem("basket")) || [];
      localStorage.setItem("basket", JSON.stringify([...existing, product]));

    } catch (err) {
      console.error("Erreur ajout au panier Firestore", err);
    }
  };

  // Supprimer un produit par son id Firestore
  const removeFromCart = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", id));
      setBasket(prev => prev.filter(item => item.id !== id));

      // Mise à jour localStorage (optionnel)
      const existing = JSON.parse(localStorage.getItem("basket")) || [];
      const updated = existing.filter(item => item.id !== id);
      localStorage.setItem("basket", JSON.stringify(updated));
    } catch (err) {
      console.error("Erreur suppression panier Firestore", err);
    }
  };

  return (
    <CartContext.Provider value={{ basket, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
