<<<<<<< HEAD
const CategoryCard = () => {
    return (
        <div>
            <h1>Rechercher</h1>
        </div>
    )
}

export default CategoryCard;
=======
import './CategoryCard.css';
import produit1 from '../pages/img-categories/produit1.png'
import produit2 from '../pages/img-categories/produit2 (2).png'
import produit3 from '../pages/img-categories/produit3.png'
import produit4 from '../pages/img-categories/produit4.png'
import produit5 from '../pages/img-categories/produit5.png'
import produit6 from '../pages/img-categories/produit6.png'
import { useNavigate } from 'react-router-dom';

const products1 = [
  {
    id: "fruits",
    title: 'Frash Fruits & Vegetables',
    img: produit1,
  },
  {
    id: "huile",
    title: 'Cooking Oil & Ghee',
    img: produit2,
  },
  {
    id: "meat",
    title: 'Meat & Fish',
    img: produit3,
  },
  {
    id: "bakery",
    title: 'Bakery & Snacks',
    img: produit4,
  },
];

const products2 = [
  {
    id: "beverage",
    title: 'Beverage',
    img: produit6,
  },
  {
    id: "eggs",
    title: 'Eggs',
    img: produit5,
  },
  {
    id: "oil",
    title: 'Oil',
    img: produit2,
  },
  {
    id: "milk",
    title: 'Milk',
    img: produit5,
  },
];

const CategoryCard = () => {
  const navigate = useNavigate();
  
  // Fonction pour rediriger avec l'id
  const handleRedirect = (id) => {
    navigate(`/ProductCard/${id}`);
  };

  return (
    <div>
      <div className="container text-center mt-4">
        <h2>Find Products</h2>
        <button type="button" className="btn btn-light mt-2">
          <i className="bi bi-search"></i> Search Store
        </button>
      </div>

      {/* First Grid */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2 p-4 cartes">
          {products1.map((product, index) => (
            <div className="col" key={index}>
              <div
                className="card h-100 redirige"
                onClick={() => handleRedirect(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={product.img}
                  className="card-img-top categories-img"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    dangerouslySetInnerHTML={{ __html: product.title }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Grid */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2 p-4 cartes">
          {products2.map((product, index) => (
            <div className="col" key={index}>
              <div
                className="card h-100 redirige"
                onClick={() => handleRedirect(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={product.img}
                  className="card-img-top categories-img"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
>>>>>>> af0e59a523665156420bddd3acf96593128cda99
