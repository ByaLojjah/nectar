import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/"></Link></li>
                <li><Link to="/"></Link></li>
                <li><Link to="/"></Link></li>
                <li><Link to="/"></Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;