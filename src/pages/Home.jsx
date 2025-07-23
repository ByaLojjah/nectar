const Home = () => {
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
      { id: 10, name: "Carrot", image: "https://i.pinimg.com/736x/8f/e9/1f/8fe91fa57b62c158e36a5883febc1075.jpg", price: 3.49 },
    ];

    function createProductCard(product) {
      return `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h6>${product.name}</h6>
              <p>$${product.price.toFixed(2)}</p>
              <button class="btn btn-success btn-sm" onclick="addToBasket(${product.id})">+</button>
            </div>
          </div>
        </div>
      `;
    }

    function displayProducts(containerId, products) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = products.slice(0, 2).map(createProductCard).join("");
    }

    function addToBasket(productId) {
      const product = [...exclusiveProducts, ...bestProducts].find(p => p.id === productId);
      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      displayProducts("exclusive-products", exclusiveProducts);
      displayProducts("best-products", bestProducts);
    });
    return (
      <div>
        <div className="container text-center my-3">
          <p className="mb-0 fw-bold fs-4 text-uppercase text-center" id="home-location"><i className="fas fa-map-marker-alt me-2 text-success"></i>Bakeli Grocery</p>
          <input className="form-control mt-3" type="search" placeholder="Search Store"/>
        </div>

        <div className="container my-4">
          <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded ">
              <div className="carousel-item active">
                <img src="images/banner.png" className="d-block w-100 object-fit-contain" alt="Banner 1"/>
              </div>
              <div className="carousel-item">
                <img src="https://i.pinimg.com/736x/ad/54/a3/ad54a3abda75b3ce9c2c3abb1bc59018.jpg" className="d-block w-100 object-fit-contain" alt="Banner 2"/>
              </div>
              <div className="carousel-item">
                <img src="https://i.pinimg.com/736x/35/22/02/352202fd56128a82b18c8c0964053b4d.jpg" className="d-block w-100 object-fit-contain" alt="Banner 3"/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        <div classNameclass="container">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Exclusive Offer</h5>
            <a href="exclusive.html?type=exclusive" className="see">See all</a>
          </div>
          <div className="row w-100 justify-content-around" id="exclusive-products"></div>
        </div>

        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Best Selling</h5>
            <a href="best.html?type=best" className="see">See all</a>
          </div>
          <div className="row w-100 justify-content-around" id="best-products"></div>
        </div>
      </div>
    )
}