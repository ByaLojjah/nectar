function SearchBar() {
    return (
        <form className="d-flex my-3" role="search">
            <input
                className="form-control me-2"
                type="search"
                placeholder="Rechercher un produit..."
                aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
                Rechercher
            </button>
        </form>
    );
}

export default SearchBar;
