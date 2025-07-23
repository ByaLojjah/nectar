
import React, { useState } from "react";


const Cart = () => {
    const [products, setProducts] = useState([
        {
            id: 0,
            name: "Bell Pepper Red",
            image: "images/imagess1.png",
            unitPrice: 4.99,
            quantity: 0,
        },
        {
            id: 1,
            name: "Egg Chicken Red",
            image: "images/imagess2.png",
            unitPrice: 1.99,
            quantity: 0,
        },
        {
            id: 2,
            name: "Organic Bananas",
            image: "images/imagess3.png",
            unitPrice: 3.0,
            quantity: 0,
        },
        {
            id: 3,
            name: "Ginger",
            image: "images/imagess4.png",
            unitPrice: 2.99,
            quantity: 0,
        },
    ]);

    const updateQuantity = (id, delta) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, quantity: Math.max(0, p.quantity + delta) }
                    : p
            )
        );
    };

    const removeProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const confirmOrder = () => {
        const ordered = products.filter((p) => p.quantity > 0);

        if (ordered.length === 0) {
            alert("❌ Aucun produit sélectionné !");
            return;
        }

        const lignes = ordered.map((p) => {
            const lineTotal = p.unitPrice * p.quantity;
            return `- ${p.name} x${p.quantity} = $${lineTotal.toFixed(2)}`;
        });

        const total = ordered.reduce(
            (acc, p) => acc + p.unitPrice * p.quantity,
            0
        );

        let message = "🛒 Résumé de votre commande :\n\n";
        message += lignes.join("\n");
        message += `\n\n💰 Total à payer : $${total.toFixed(2)}`;

        alert(message);
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center my-5">🛒 My Cart</h1>

            {products.map((product) => (
                <div key={product.id} className="carte-produit mb-4 mt-5"
                    style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "15px", borderBottom: "1px solid antiquewhite", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", borderRadius: "10px" }} >
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "140px", height: "auto", borderRadius: "10px" }}
                    />

                    <div className="infos text-center">
                        <h3>{product.name}</h3>
                        <p>Prix unitaire</p>
                        <div className="quantite d-flex gap-5">
                            <button
                                onClick={() => updateQuantity(product.id, -1)}
                                className="btn border"
                            >
                                −
                            </button>
                            <span>{product.quantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, 1)}
                                className="btn border"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="so" style={{ display: "flex", flexDirection: "column", gap: "60px", alignItems: "center" }}>
                        <div
                            className="supprimer"
                            onClick={() => removeProduct(product.id)}
                            style={{ cursor: "pointer" }}
                        >
                            ×
                        </div>
                        <div className="prix">
                            ${(product.unitPrice * product.quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
            ))}

            <div className="bouton-confirmation" style={{ marginTop: "7%", textAlign: "center" }}>
                <button onClick={confirmOrder} style={{ background: "#00c58e", color: "white", padding: "12px", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                    Confirmer la commande
                </button>
            </div>
        </div>
    );
};

export default Cart;


