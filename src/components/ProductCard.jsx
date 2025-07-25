<<<<<<< HEAD
const ProductCard = () => {
    return (
        <div>
            <h1>Rechercher</h1>
        </div>
    )
}

export default ProductCard;
=======
import mango from '../pages/img-categories/mango.jpg'
import orannge from '../pages/img-categories/orannge.jpg'
import ananas from '../pages/img-categories/ananas.jpg'
import banane from '../pages/img-categories/banane.jpg'
import fraise from '../pages/img-categories/fraise.jpg'
import pomme from '../pages/img-categories/pomme.jpg'
import huile1 from '../pages/img-categories/huile1.jpg'
import huile2 from '../pages/img-categories/huile2.jpg'
import huile3 from '../pages/img-categories/huile3.jpg'
import huile7 from '../pages/img-categories/huile7.png'
import huile5 from '../pages/img-categories/huile5 (2).jpeg'
import huile6 from '../pages/img-categories/huile6.jpeg'
import meat1 from '../pages/img-categories/meat1.jpg'
import meat2 from '../pages/img-categories/meat2.jpeg'
import meat3 from '../pages/img-categories/meat3.jpeg'
import meat4 from '../pages/img-categories/meat4.jpg'
import meat5 from '../pages/img-categories/meat5.jpeg'
import meat6 from '../pages/img-categories/meat6.jpg'
import snack1 from '../pages/img-categories/snack1.jpeg'
import snack2 from '../pages/img-categories/snack2.jpeg'
import snack3 from '../pages/img-categories/snack3.jpeg'
import snack4 from '../pages/img-categories/snack4.jpeg'
import snack5 from '../pages/img-categories/snack5.jpeg'
import snack6 from '../pages/img-categories/snack6.jpeg'
import bev1 from '../pages/img-categories/bev1.png'
import bev2 from '../pages/img-categories/bev2.png'
import bev3 from '../pages/img-categories/bev3.png'
import bev4 from '../pages/img-categories/bev4.png'
import bev5 from '../pages/img-categories/bev5.png'
import bev6 from '../pages/img-categories/bev6.png'
import eggs1 from '../pages/img-categories/eggs1.png'
import eggs2 from '../pages/img-categories/eggs2.png'
import eggs3 from '../pages/img-categories/egg3.png'
import eggs4 from '../pages/img-categories/eggs4.png'
import eggs5 from '../pages/img-categories/eggs5.png'
import eggs6 from '../pages/img-categories/eggs6.png'
import { FaPlus } from "react-icons/fa6";

import { useParams } from "react-router-dom";
const allProducts = {
  fruits: [
    { title: 'Mango', img: mango, price: '$1.99' },
    { title: 'Orange', img: orannge, price: '$1.99' },
    { title: 'Ananas', img: ananas, price: '$1.99' },
    { title: 'Banane', img: banane, price: '$1.99' },
    { title: 'Fraise', img: fraise, price: '$1.99' },
    { title: 'Pomme', img: pomme, price: '$1.99' },
    
  ],
  huile: [
    { title: "Dairy & Eggs", img: huile1, price: "$1.99" },
      { title: "Fresh Fruits", img: huile2, price: "$1.99" },
      { title: "Bakery", img: huile3, price: "$1.99" },
      { title: "Bakery", img:huile7 , price: "$1.99" },
      { title: "Bakery", img: huile5, price: "$1.99" },
      { title: "Bakery", img:huile6 , price: "$1.99" },
  ],
  meat: [
         { title: "Meat & Fish", img: meat1, price: "$1.99" },
        { title: "Meat", img:meat2 , price: "$1.99" },
        { title: "Meat", img:meat3 , price: "$1.99" },
        { title: "fish", img:meat4 , price: "$1.99" },
        { title: "fish", img:meat5 , price: "$1.99" },
        { title: "fish", img:meat6 , price: "$1.99" },
  ],
  bakery: [
          { title: "snack", img:snack1 , price: "$1.99" },
          { title: "snack", img:snack2 , price: "$1.99" },
          { title: "snack", img:snack3 , price: "$1.99" },
          { title: "snack", img:snack4 , price: "$1.99" },
          { title: "snack", img:snack5 , price: "$1.99" },
          { title: "snack", img:snack6 , price: "$1.99" },
  ],
  beverage: [
          { title: "bev", img:bev1 , price: "$1.99" },
          { title: "bev", img:bev2 , price: "$1.99" },
          { title: "bev", img:bev3 , price: "$1.99" },
          { title: "bev", img:bev4 , price: "$1.99" },
          { title: "bev", img:bev5 , price: "$1.99" },
          { title: "bev", img:bev6 , price: "$1.99" },
  ],
  eggs: [
          { title: "eggs", img:eggs1 , price: "$1.99" },
          { title: "egg", img:eggs2 , price: "$1.99" },
          { title: "egg", img:eggs3 , price: "$1.99" },
          { title: "egg", img:eggs4 , price: "$1.99" },
          { title: "egg", img:eggs5 , price: "$1.99" },
          { title: "egg", img:eggs6 , price: "$1.99" },
  ]
  // Ajoute meat, bakery si besoin
};



// const products = [
//   { title: 'Dairy & Eggs', img: mango, price: '$1.99' },
//   { title: 'Frash Fruits', img: orannge, price: '$1.99' },
//   { title: 'Bakery', img: ananas, price: '$1.99' },
//   { title: 'Bakery', img: banane, price: '$1.99' },
//   { title: 'Bakery', img: fraise, price: '$1.99' },
//   { title: 'Bakery', img: pomme, price: '$1.99' },
// ];

const ProductCard = () => {
    const { id } = useParams(); // fruits, huile, etc.
  const products = allProducts[id] || []; // produits de la catégorie
  return (
    <div className="container">
      <h1 className="mt-4">{id} Products</h1>

      <h1 className="mt-4">Frash Fruits & vegetable</h1>

      <div className="container p-2">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 p-4 cartes">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={product.img}
                    className="product-img"
                    alt={product.title}
                  />
                </div>
                <div className="card-body p-5">
                  <h5 className="card-title">{product.title}</h5>
                  <p>335ml, Price</p>
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{product.price}</h5>
                    <button type="button" className="btn btn-success">
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lien de retour (à personnaliser si navigation React Router) */}
      <a href="index.html" style={{ display: 'none' }}>Retour</a>
    </div>
  );
};

export default ProductCard;
>>>>>>> af0e59a523665156420bddd3acf96593128cda99
