import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const exclusiveProducts = [
  // ... tes produits exclusifs (inchangés)
];

const bestProducts = [
  // ... tes best produits (inchangés)
];

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card text-center col-lg-4">
      <img src={product.image} className="img-fluid" style={{ height: "120px", objectFit: "contain" }} alt={product.name} />
      <h6 className="mt-2">{product.name}</h6>
      <p>${product.price.toFixed(2)}</p>
      <button className="btn btn-success btn-sm" onClick={() => onAdd(product)}>+</button>
    </div>
  );
}

function ProductSection({ title, link, products, onAdd }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>{title}</h5>
        <a href={link} className="see">See all</a>
      </div>
      <div className="scroll-container" ref={scrollRef}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  // Récupérer la localisation depuis Firestore
  useEffect(() => {
    const fetchLocation = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const ref = doc(db, 'locations', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setLocation(snap.data());
        }
      } catch (err) {
        console.error("Erreur récupération localisation :", err);
      }
    };

    fetchLocation();
  }, []);

  const handleAddToBasket = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/product/" + product.id);
  };

  return (
    <div className="mt-5 pt-5">
      <div className="container text-center my-3">
        {/* Affichage de la localisation */}
        {location ? (
          <div className="alert alert-info">
            📍 Votre localisation : <strong>{location.zone}</strong> - {location.area}
          </div>
        ) : (
          <p>Chargement de votre localisation...</p>
        )}

        {/* Tu peux garder LocationForm ici ou le supprimer si tu veux */}
        {/* <LocationForm /> */}

        <input className="form-control mt-3" type="search" placeholder="Search Store" />
      </div>

      {/* Le reste du code inchangé */}
      <div className="container my-4">
        <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded">
            <div className="carousel-item active">
              <img src="images/banner.png" className="d-block w-100" alt="Banner 1" />
            </div>
            <div className="carousel-item">
              <img src="https://i.pinimg.com/736x/ad/54/a3/ad54a3abda75b3ce9c2c3abb1bc59018.jpg" className="d-block w-100" alt="Banner 2" />
            </div>
            <div className="carousel-item">
              <img src="https://i.pinimg.com/736x/35/22/02/352202fd56128a82b18c8c0964053b4d.jpg" className="d-block w-100" alt="Banner 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
            <a href="/Best"><span className="carousel-control-next-icon"></span></a>
          </button>
        </div>
      </div>

      <ProductSection
        title="Exclusive Offer"
        link="exclusive.html?type=exclusive"
        products={exclusiveProducts}
        onAdd={handleAddToBasket}
      />
      <ProductSection
        title="Best Selling"
        link="best.html?type=best"
        products={bestProducts}
        onAdd={handleAddToBasket}
      />
    </div>
  );
};

export default Home;
