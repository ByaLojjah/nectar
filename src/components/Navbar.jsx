import { Link } from 'react-router-dom';

function Navbar() {
    return (
       <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-bottom w-100">
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            
            <div class="container d-flex justify-content-around">
                <a href="groce.html" class="nav-link  text-center">
                    <i class="fa-solid fa-store"></i><br/><strong>Shop</strong>
                </a>
                <a href="explore.html" class="nav-link text-center">
                    <i class="fa-solid fa-compass"></i><br/><strong >Explore</strong>
                </a>
                <a href="#" class="nav-link text-center">
                    <i class="fa-solid fa-cart-shopping"></i><br/><strong>Cart</strong>
                </a>
                <a href="#" class="nav-link text-center">
                    <i class="fa-solid fa-heart"></i><br/><strong>Favourite</strong>
                </a>
                <a href="#" class="nav-link text-center">
                    <i class="fa-solid fa-user"></i><br/><strong>Account</strong>
                </a>
            </div>
    
        </nav>
    );
}

export default Navbar;
