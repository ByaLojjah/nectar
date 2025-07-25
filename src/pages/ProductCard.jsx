import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase-config";

import mango from '../pages/img-categories/mango.jpg';
import orannge from '../pages/img-categories/orannge.jpg';
import ananas from '../pages/img-categories/ananas.jpg';
import banane from '../pages/img-categories/banane.jpg';
import fraise from '../pages/img-categories/fraise.jpg';
import pomme from '../pages/img-categories/pomme.jpg';
import huile1 from '../pages/img-categories/huile1.jpg';
import huile2 from '../pages/img-categories/huile2.jpg';
import huile3 from '../pages/img-categories/huile3.jpg';
import huile7 from '../pages/img-categories/huile7.png';
import huile5 from '../pages/img-categories/huile5 (2).jpeg';
import huile6 from '../pages/img-categories/huile6.jpeg';
import meat1 from '../pages/img-categories/meat1.jpg';
import meat2 from '../pages/img-categories/meat2.jpeg';
import meat3 from '../pages/img-categories/meat3.jpeg';
import meat4 from '../pages/img-categories/meat4.jpg';
import meat5 from '../pages/img-categories/meat5.jpeg';
import meat6 from '../pages/img-categories/meat6.jpg';
import snack1 from '../pages/img-categories/snack1.jpeg';
import snack2 from '../pages/img-categories/snack2.jpeg';
import snack3 from '../pages/img-categories/snack3.jpeg';
import snack4 from '../pages/img-categories/snack4.jpeg';
import snack5 from '../pages/img-categories/snack5.jpeg';
import snack6 from '../pages/img-categories/snack6.jpeg';
import bev1 from '../pages/img-categories/bev1.png';
import bev2 from '../pages/img-categories/bev2.png';
import bev3 from '../pages/img-categories/bev3.png';
import bev4 from '../pages/img-categories/bev4.png';
import bev5 from '../pages/img-categories/bev5.png';
import bev6 from '../pages/img-categories/bev6.png';
import eggs1 from '../pages/img-categories/eggs1.png';
import eggs2 from '../pages/img-categories/eggs2.png';
import eggs4 from '../pages/img-categories/eggs4.png';
import eggs5 from '../pages/img-categories/eggs5.png';
import eggs6 from '../pages/img-categories/eggs6.png';

const allProducts = {
  fruits: [
    { title: "Mango", img: mango, price: 1.99 },
    { title: "Orange", img: orannge, price: 1.99 },
    { title: "Ananas", img: ananas, price: 1.99 },
    { title: "Banane", img: banane, price: 1.99 },
    { title: "Fraise", img: fraise, price: 1.99 },
    { title: "Pomme", img: pomme, price: 1.99 },
  ],
  huile: [
    { title: "Dairy & Eggs", img: huile1, price: 1.99 },
    { title: "Fresh Fruits", img: huile2, price: 1.99 },
    { title: "Bakery", img: huile3, price: 1.99 },
    { title: "Bakery", img: huile7, price: 1.99 },
    { title: "Bakery", img: huile5, price: 1.99 },
    { title: "Bakery", img: huile6, price: 1.99 },
  ],
  meat: [
    { title: "Meat & Fish", img: meat1, price: 1.99 },
    { title: "Meat", img: meat2, price: 1.99 },
    { title: "Meat", img: meat3, price: 1.99 },
    { title: "Fish", img: meat4, price: 1.99 },
    { title: "Fish", img: meat5, price: 1.99 },
    { title: "Fish", img: meat6, price: 1.99 },
  ],
  bakery: [
    { title: "Snack", img: snack1, price: 1.99 },
    { title: "Snack", img: snack2, price: 1.99 },
    { title: "Snack", img: snack3, price: 1.99 },
    { title: "Snack", img: snack4, price: 1.99 },
    { title: "Snack", img: snack5, price: 1.99 },
    { title: "Snack", img: snack6, price: 1.99 },
  ],
  beverage: [
    { title: "Beverage", img: bev1, price: 1.99 },
    { title: "Beverage", img: bev2, price: 1.99 },
    { title: "Beverage", img: bev3, price: 1.99 },
    { title: "Beverage", img: bev4, price: 1.99 },
    { title: "Beverage", img: bev5, price: 1.99 },
    { title: "Beverage", img: bev6, price: 1.99 },
  ],
  eggs: [
    { title: "Eggs", img: eggs1, price: 1.99 },
    { title: "Eggs", img: eggs2, price: 1.99 },
    // { title: "Eggs", img: eggs3, price: 1.99 },
    { title: "Eggs", img: eggs4, price: 1.99 },
    { title: "Eggs", img: eggs5, price: 1.99 },
    { title: "Eggs", img: eggs6, price: 1.99 },
  ],
};

const ProductCard = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const products = allProducts[id] || [];
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (product) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Veuillez vous connecter pour ajouter au panier.");
      return;
    }

    setLoading(true);

    const cartRef = doc(db, "panier", user.uid);
    const productToAdd = {
      title: product.title,
      price: `$${product.price.toFixed(2)}`,
      img: product.img,
    };

    try {
      const docSnap = await getDoc(cartRef);
      if (docSnap.exists()) {
        await updateDoc(cartRef, {
          items: arrayUnion(productToAdd),
        });
      } else {
        await setDoc(cartRef, {
          items: [productToAdd],
        });
      }
      addToCart(productToAdd);
      alert(`${product.title} ajouté au panier !`);
    } catch (error) {
      console.error("Erreur ajout panier:", error);
      alert("Erreur lors de l'ajout au panier. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-3">
      <h1 className="mb-4 text-capitalize">{id} Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-muted fs-5">Aucun produit dans cette catégorie.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.img}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: 140, objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="text-success fw-semibold mb-3">${product.price.toFixed(2)}</p>
                  <button
                    disabled={loading}
                    type="button"
                    className="btn btn-success mt-auto"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Ajouter ${product.title} au panier`}
                  >
                    <FaPlus className="me-2" /> Ajouter au panier
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

export default ProductCard;
