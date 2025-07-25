import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const exclusiveProducts = [
  { id: 1, name: "Organic Bananas", image: "https://i.pinimg.com/736x/f0/e8/ba/f0e8bae951c2ccdf948781a4f3ab4fde.jpg", price: 4.99 },
  { id: 2, name: "Red Apple", image: "https://i.pinimg.com/736x/48/43/11/4843110c0a87f69186b7ad89e64100ee.jpg", price: 4.99 },
  { id: 3, name: "Raisain", image: "https://i.pinimg.com/736x/5d/ef/da/5defda60b0de8f3d67f0b362b38113e8.jpg", price: 5.19 },
  { id: 4, name: "Fraise", image: "https://i.pinimg.com/736x/e5/51/58/e55158e8fea3cb1bae182509a842085d.jpg", price: 3.49 },
  { id: 5, name: "Ananas", image: "https://i.pinimg.com/736x/a7/64/28/a7642807831419aa2696377ff4723681.jpg", price: 2.99 },
  { id: 6, name: "Poire", image: "https://i.pinimg.com/736x/29/fc/4b/29fc4bd7c0f2ce7794a733f502f987e5.jpg", price: 3.89 },
];

const bestProducts = [
  { id: 7, name: "Piment", image: "https://i.pinimg.com/736x/b8/c2/15/b8c2159a4782b1abbf9a2c080b9a98c5.jpg", price: 3.89 },
  { id: 8, name: "Concombre", image: "https://i.pinimg.com/736x/5e/68/76/5e68765c170e3b020233bf97b8643277.jpg", price: 2.59 },
  { id: 9, name: "Ginger", image: "https://i.pinimg.com/736x/ac/40/0b/ac400bf6b98cdf235fea26515abf3235.jpg", price: 4.59 },
  { id: 10, name: "Aubergine", image: "https://i.pinimg.com/736x/75/73/6f/75736f14cca1a8f925e583a684addc96.jpg", price: 5.19 },
];

const groceryProducts = [
  { id: 13, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 3.89 },
  { id: 14, name: "Fresh Chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuw91M07F8WUp6RBLD3M3ETGhSWaBbeUJvo65vZLMlulyiQsMmallHQDuuNFH92GyYE5U&usqp=CAU", price: 2.59 },
  { id: 15, name: "Brown Eggs (12 pcs)", image: "https://i.pinimg.com/736x/ac/05/ff/ac05ff382c8784edf71a460924522480.jpg", price: 4.59 },
    { id: 15, name: "poisson", image: "https://previews.123rf.com/images/belchonock/belchonock1503/belchonock150304309/37964513-fresh-fish-and-other-seafood-isolated-on-white.jpg", price: 3.49 },

];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProductCard = ({ product, index }) => {
  const handleAddToBasket = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product";
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="col-6 col-md-3 mb-4"
    >
      <div className="card shadow-sm h-100 border-0 hover-shadow">
        <img src={product.image} className="card-img-top rounded-top" alt={product.name} style={{ height: 150, objectFit: 'cover' }} />
        <div className="card-body d-flex flex-column justify-content-between">
          <h6 className="text-truncate">{product.name}</h6>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fw-bold text-success">${product.price.toFixed(2)}</span>
            <button className="btn btn-sm btn-outline-success rounded-circle" onClick={handleAddToBasket}>
              +
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductSection = ({ title, link, products }) => (
  <div className="container my-5">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="fw-bold">{title}</h5>
      <Link to={link} className="text-success">See all</Link>
    </div>
    <div className="row">
      {products.slice(0, 4).map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  </div>
);

const Home = () => {
  useEffect(() => {
    document.title = "Grocery App";
  }, []);

  return (
    <>
      <div className="container mt-5 pt-5">
        <Carousel fade interval={4000}>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src="/images/banner.png" alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src="https://i.pinimg.com/736x/ad/54/a3/ad54a3abda75b3ce9c2c3abb1bc59018.jpg" alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src="https://i.pinimg.com/736x/35/22/02/352202fd56128a82b18c8c0964053b4d.jpg" alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>

      <ProductSection title="🍌 Exclusive Offer" link="/exclusive?type=exclusive" products={exclusiveProducts} />
      <ProductSection title="🔥 Best Selling" link="/best?type=best" products={bestProducts} />
      <ProductSection title="🛒 Grocery" link="/grocery?type=grocery" products={groceryProducts} />
    </>
  );
};

export default Home;