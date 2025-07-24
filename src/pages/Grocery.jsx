// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const groceryProducts = [
//   { id: 11, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 3.89 },
//   { id: 12, name: "Fresh Chicken", image: "https://i.pinimg.com/736x/43/03/07/43030746e4444daf2678d3ad92f4d12b.jpg", price: 2.59 },
//   { id: 13, name: "Brown Eggs (12 pcs)", image: "https://i.pinimg.com/736x/ac/05/ff/ac05ff382c8784edf71a460924522480.jpg", price: 4.59 }, 
//   { id: 14, name: "Viande Hachée", image: "https://i.pinimg.com/736x/b9/a4/02/b9a4026eb3257a88dba6ccb69d95c65f.jpg", price: 5.19 },
//   { id: 15, name: "Jambon Cru", image: "https://i.pinimg.com/1200x/92/96/d5/9296d5fa0dee0ca2c38331b97ae88da6.jpg", price: 3.49 },
// ];

// const Grocery = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const params = new URLSearchParams(location.search);
//   const type = params.get("type");

//   const products = type === "grocery" ? groceryProducts : [];

//   const addToBasket = (product) => {
//     localStorage.setItem("selectedProduct", JSON.stringify(product));
//     navigate("/product"); 
//   };

//   return (
//     <div className="d-flex flex-wrap justify-content-center" id="scroll-container">
//       {products.map((p) => (
//         <div key={p.id} className="card m-2 bg-primary text-white" style={{ width: "250px" }}>
//           <img
//             src={p.image}
//             alt={p.name}
//             className="card-img-top p-2"
//             style={{ height: "150px", objectFit: "contain" }}
//           />
//           <div className="card-body text-center">
//             <h6 className="card-title">{p.name}</h6>
//             <p className="card-text">${p.price}</p>
//             <button className="btn btn-success btn-sm" onClick={() => addToBasket(p)}>+</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Grocery;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const groceryProducts = [
  { id: 11, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 3.89 },
  { id: 12, name: "Fresh Chicken", image: "https://i.pinimg.com/736x/43/03/07/43030746e4444daf2678d3ad92f4d12b.jpg", price: 2.59 },
  { id: 13, name: "Brown Eggs (12 pcs)", image: "https://i.pinimg.com/736x/ac/05/ff/ac05ff382c8784edf71a460924522480.jpg", price: 4.59 },
  { id: 14, name: "Viande Hachée", image: "https://i.pinimg.com/736x/b9/a4/02/b9a4026eb3257a88dba6ccb69d95c65f.jpg", price: 5.19 },
  { id: 15, name: "Jambon Cru", image: "https://i.pinimg.com/1200x/92/96/d5/9296d5fa0dee0ca2c38331b97ae88da6.jpg", price: 3.49 },
];

const Grocery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "grocery") {
      setProducts(groceryProducts);
    }
  }, [location.search]);

  const addToCart = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/product"); // change to your actual route if different
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3 text-center fw-bold">Best Products</h4>
      <div className="d-flex overflow-auto gap-3" id="scroll-container">
        {products.map((p) => (
          <div className="card m-2 bg-primary text-white" style={{ width: "250px" }} key={p.id}>
            <img
              src={p.image}
              alt={p.name}
              className="card-img-top p-2"
              style={{ height: "150px", objectFit: "contain" }}
            />
            <div className="card-body text-center">
              <h6 className="card-title">{p.name}</h6>
              <p className="card-text">${p.price}</p>
              <button className="btn btn-success btn-sm" onClick={() => addToCart(p)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
