import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
import { useCart } from '../context/CartContext';


const groceryProducts = [
  { id: 11, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 3.89 },
  { id: 12, name: "Fresh Chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuw91M07F8WUp6RBLD3M3ETGhSWaBbeUJvo65vZLMlulyiQsMmallHQDuuNFH92GyYE5U&usqp=CAU", price: 2.59 },
  { id: 13, name: "Brown Eggs (12 pcs)", image: "https://i.pinimg.com/736x/ac/05/ff/ac05ff382c8784edf71a460924522480.jpg", price: 4.59 },
  { id: 14, name: "Viande Hachée", image: "https://i.pinimg.com/736x/b9/a4/02/b9a4026eb3257a88dba6ccb69d95c65f.jpg", price: 5.19 },
  { id: 15, name: "Jambon Cru", image: "https://i.pinimg.com/1200x/92/96/d5/9296d5fa0dee0ca2c38331b97ae88da6.jpg", price: 3.49 },
  { id: 16, name: "Poisson frais", image: "https://previews.123rf.com/images/belchonock/belchonock1503/belchonock150304309/37964513-fresh-fish-and-other-seafood-isolated-on-white.jpg", price: 6.99 },
  { id: 17, name: "Saucisses", image: "https://schmid-traiteur.com/cdn/shop/files/MaisonSchmid-Saucisses-strasbourg.jpg?v=1728933545", price: 3.29 },
  { id: 18, name: "Lait Frais", image: "https://www.candia.fr/wp-content/uploads/2020/03/packshot-glfraisdemi-1.png", price: 1.99 },
];

const Grocery = () => {
  const { addToCart } = useCart();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "grocery") {
      setProducts(groceryProducts);
    }
  }, [location.search]);

  const handleAddToCart = (product) => {
    const item = {
      title: product.name,
      price: product.price,
      img: product.image,
    };
    addToCart(item);
  };

  const handleAddToFavorites = (product) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = existing.find((item) => item.id === product.id);

    if (!alreadyExists) {
      const updated = [...existing, product];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${product.name} ajouté aux favoris !`);
    } else {
      alert(`${product.name} est déjà dans vos favoris.`);
    }
  };

  return (
    <div className="container py-5 mt-4 px-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Produits Épicerie</h3>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/home")}>← Retour</button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted">Aucun produit trouvé dans cette catégorie.</p>
      ) : (
        <div className="row g-4">
          {products.map((p) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold">{p.name}</h6>
                  <p className="card-text text-success fw-semibold">
                    ${p.price.toFixed(2)}
                  </p>
                  <div className="d-flex flex-column gap-2 mt-auto">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleAddToCart(p)}
                    >
                      Ajouter au panier
                    </button>
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => handleAddToFavorites(p)}
                    >
                      ❤️ Favoris
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grocery;
