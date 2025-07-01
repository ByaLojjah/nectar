import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/search">Recherche</Link></li>
                    <li><Link to="/cart">Panier</Link></li>
                    <li><Link to="/profile">Profil</Link></li>
                    <li><Link to="/login">Se connecter</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
