import React from 'react';
import { useSelector } from 'react-redux';
function PurchaseHistory() {
    const purchaseHistory = useSelector(state => state.cart.purchaseHistory);

    return (
        <div>
            <h1>Purchase History</h1>
            {purchaseHistory.length === 0 ? (
                <p>No purchases yet.</p>
            ) : (
                <ul>
                    {purchaseHistory.map((purchase, index) => (
                        <li key={index}>
                            <h3>Purchase Date: {purchase.purchaseDate}</h3>
                            <ul>
                                {purchase.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p>Total: ${purchase.total.toFixed(2)}</p>
                            <p>Discount Applied: {purchase.discount}%</p>
                            <p>Final Amount: ${(purchase.total * ((100 - purchase.discount) / 100)).toFixed(2)}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PurchaseHistory;
