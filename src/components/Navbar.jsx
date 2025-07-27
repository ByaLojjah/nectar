import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top  w-100">
            

            <div className="container d-flex justify-content-around">
                <Link to="/home" className="nav-link text-center">
                    <i className="fa-solid fa-store"></i><br />
                    <strong>Shop</strong>
                </Link>
                <Link to="/categorycard" className="nav-link text-center">
                    <i className="fa-solid fa-compass"></i><br />
                    <strong>Explore</strong>
                </Link>
                <Link to="/cart" className="nav-link text-center">
                    <i className="fa-solid fa-cart-shopping"></i><br />
                    <strong>Cart</strong>
                </Link>
                <Link to="/favorite" className="nav-link text-center">
                    <i className="fa-solid fa-heart"></i><br />
                    <strong>Favourite</strong>
                </Link>
                <Link to="/profile" className="nav-link text-center">
                    <i className="fa-solid fa-user"></i><br />
                    <strong>Account</strong>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
