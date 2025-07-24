import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';

const exclusiveProducts = [
  { id: 1, name: "Organic Bananas", image: "https://i.pinimg.com/736x/f0/e8/ba/f0e8bae951c2ccdf948781a4f3ab4fde.jpg", price: 4.99 },
  { id: 2, name: "Red Apple", image: "https://i.pinimg.com/736x/48/43/11/4843110c0a87f69186b7ad89e64100ee.jpg", price: 4.99 },
  { id: 3, name: "Raisain", image: "https://i.pinimg.com/736x/5d/ef/da/5defda60b0de8f3d67f0b362b38113e8.jpg", price: 5.19 },
  { id: 4, name: "Fraise", image: "https://i.pinimg.com/736x/e5/51/58/e55158e8fea3cb1bae182509a842085d.jpg", price: 3.49 },
  { id: 5, name: "Ananas", image: "https://i.pinimg.com/736x/a7/64/28/a7642807831419aa2696377ff4723681.jpg", price: 2.99 }
];

const bestProducts = [
  { id: 6, name: "Piment", image: "https://i.pinimg.com/736x/b8/c2/15/b8c2159a4782b1abbf9a2c080b9a98c5.jpg", price: 3.89 },
  { id: 7, name: "Concombre", image: "https://i.pinimg.com/736x/5e/68/76/5e68765c170e3b020233bf97b8643277.jpg", price: 2.59 },
  { id: 8, name: "Ginger", image: "https://i.pinimg.com/736x/ac/40/0b/ac400bf6b98cdf235fea26515abf3235.jpg", price: 4.59 },
  { id: 9, name: "Aubergine", image: "https://i.pinimg.com/736x/75/73/6f/75736f14cca1a8f925e583a684addc96.jpg", price: 5.19 },
  { id: 10, name: "Carrot", image: "https://i.pinimg.com/736x/8f/e9/1f/8fe91fa57b62c158e36a5883febc1075.jpg", price: 3.49 }
];

const groceryProducts = [
  { id: 11, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 3.89 },
  { id: 12, name: "Fresh Chicken", image: "https://i.pinimg.com/736x/43/03/07/43030746e4444daf2678d3ad92f4d12b.jpg", price: 2.59 },
  { id: 13, name: "Brown Eggs (12 pcs)", image: "https://i.pinimg.com/736x/ac/05/ff/ac05ff382c8784edf71a460924522480.jpg", price: 4.59 },
  { id: 14, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 5.19 },
  { id: 15, name: "Beef Bone", image: "https://i.pinimg.com/1200x/f4/85/bf/f485bf8bf478bf2d7acfc8d1edd1de93.jpg", price: 3.49 }
];

const ProductCard = ({ product }) => {
  const handleAddToBasket = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product";
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h6>{product.name}</h6>
          <p>${product.price.toFixed(2)}</p>
          <button className="btn btn-success btn-sm" onClick={handleAddToBasket}>+</button>
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ title, link, products }) => (
  <div className="container">
    <div className="d-flex justify-content-between align-items-center">
      <h5>{title}</h5>
      <Link to="/best" className="see">See all</Link>
    </div>
    <div className="row w-100 justify-content-around">
      {products.slice(0, 2).map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  </div>
);

const Home = () => {
  useEffect(() => {
    document.title = "Grocery App";
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/banner.png" className="d-block w-100 object-fit-contain" alt="Banner 1" />
            </div>
            <div className="carousel-item">
              <img src="https://i.pinimg.com/736x/ad/54/a3/ad54a3abda75b3ce9c2c3abb1bc59018.jpg" className="d-block w-100 object-fit-contain" alt="Banner 2" />
            </div>
            <div className="carousel-item">
              <img src="https://i.pinimg.com/736x/35/22/02/352202fd56128a82b18c8c0964053b4d.jpg" className="d-block w-100 object-fit-contain" alt="Banner 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <ProductSection title="Exclusive Offer" link="/exclusive?type=exclusive" products={exclusiveProducts} />
      <ProductSection title="Best Selling" link="/best?type=best" products={bestProducts} />
      <ProductSection title="Grocery" link="/grocery?type=grocery" products={groceryProducts} />
    </>
  );
};

export default Home;
