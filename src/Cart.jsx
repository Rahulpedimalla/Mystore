/*
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDiscount, decrement, increment, purchaseItems, removeFromCart } from './Store';

function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");

    // Function to apply both discount and coupon code
    const applyCombinedDiscount = (percentage = discountPercentage, coupon = couponCode) => {
        setCouponError("");  // Reset any previous error message
        let totalPercentageDiscount = percentage;
        
        // Determine coupon discount
        let couponDiscount = 0;
        if (coupon === "Diwali") couponDiscount = 10;
        else if (coupon === "Christmas") couponDiscount = 5;
        else if (coupon === "NewYear") couponDiscount = 7;
        else if (coupon) {
            setCouponError("Invalid coupon code"); // Display error for invalid coupon
            couponDiscount = 0;
        }

        setDiscountPercentage(totalPercentageDiscount);
        setCouponDiscount(couponDiscount);
        dispatch(applyDiscount(totalPercentageDiscount + couponDiscount)); // Dispatch combined discount
    };

    // Handler for discount button click
    const handleDiscountButtonClick = (percentage) => {
        applyCombinedDiscount(percentage, couponCode); // Apply both discount and coupon if valid
    };

    // Handler for coupon apply button
    const handleApplyCoupon = () => {
        applyCombinedDiscount(discountPercentage, couponCode); // Apply both discount and coupon if valid
    };

    // Calculate total, discount amount, and final total
    const calculateTotal = () => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = Number((total * (discountPercentage / 100)).toFixed(2));
        const couponDiscountAmount = Number((total * (couponDiscount / 100)).toFixed(2));
        const finalTotal = Number((total - discountAmount - couponDiscountAmount).toFixed(2));
    
        return {
            total,
            discountAmount,
            couponDiscountAmount,
            finalTotal,
        };
    };
    
    const { total, discountAmount, couponDiscountAmount, finalTotal } = calculateTotal();

    // Purchase handler
    const handlePurchase = () => {
        if (items.length === 0) return alert("Cart is empty!");
        dispatch(purchaseItems());
        alert("Purchase completed! Items have been added to your purchase history.");
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                                <button onClick={() => dispatch(decrement(item))}>-</button>
                                <button onClick={() => dispatch(increment(item))}>+</button>
                                <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <p>Total before discounts: ${total}</p>
                    
                    // Discount buttons 
                    <div>
                        <h4>Apply Discount:</h4>
                        <button onClick={() => handleDiscountButtonClick(10)}>10% Off</button>
                        <button onClick={() => handleDiscountButtonClick(15)}>15% Off</button>
                        <button onClick={() => handleDiscountButtonClick(20)}>20% Off</button>
                    </div>

                    //Coupon Code Input and Apply Button 
                    <div>
                        <h4>Apply Coupon Code:</h4>
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button onClick={handleApplyCoupon}>Apply Coupon</button>
                        {couponError && <p style={{ color: 'red' }}>{couponError}</p>}
                    </div>

                    // Display calculated values
                    <p>Discount Percentage Applied: {discountPercentage}%</p>
                    <p>Discount Amount: ${discountAmount}</p>
                    <p>Coupon Discount Amount: ${couponDiscountAmount}</p>
                    <p>Final Amount after Discount: ${finalTotal}</p>

                    //Purchase Button 
                    <button onClick={handlePurchase}>Purchase</button>
                </>
            )}
        </div>
    );
}

export default Cart;
*/





import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDiscount, decrement, increment, purchaseItems, removeFromCart } from './Store';

function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");

    // Calculate total amounts
    const calculateTotal = () => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = total * (discountPercentage / 100);
        const couponDiscountAmount = total * (couponDiscount / 100);
        const finalTotal = total - discountAmount - couponDiscountAmount;

        return {
            total: total.toFixed(2),
            discountAmount: discountAmount.toFixed(2),
            couponDiscountAmount: couponDiscountAmount.toFixed(2),
            finalTotal: finalTotal.toFixed(2),
        };
    };

    const { total, discountAmount, couponDiscountAmount, finalTotal } = calculateTotal();

    // Apply both discount and coupon code
    const applyDiscounts = (percentage, code) => {
        const validCoupons = {
            Diwali: 10,
            Christmas: 5,
            NewYear: 7,
        };

        const couponDiscountValue = validCoupons[code] || 0;
        setCouponError(!couponDiscountValue && code ? "Invalid coupon code" : "");
        
        setDiscountPercentage(percentage);
        setCouponDiscount(couponDiscountValue);
        
        dispatch(applyDiscount(percentage + couponDiscountValue));
    };

    // Handlers
    const handleDiscountClick = (percentage) => applyDiscounts(percentage, couponCode);
    const handleApplyCoupon = () => applyDiscounts(discountPercentage, couponCode);

    const handlePurchase = () => {
        if (items.length === 0) return alert("Cart is empty!");
        dispatch(purchaseItems());
        alert("Purchase completed! Items have been added to your purchase history.");
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                                <button onClick={() => dispatch(decrement(item))}>-</button>
                                <button onClick={() => dispatch(increment(item))}>+</button>
                                <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <p>Total before discounts: ${total}</p>
                    
                    {/* Discount buttons */}
                    <div>
                        <h4>Apply Discount:</h4>
                        {[10, 15, 20].map((percent) => (
                            <button key={percent} onClick={() => handleDiscountClick(percent)}>
                                {percent}% Off
                            </button>
                        ))}
                    </div>

                    {/* Coupon Code Input and Apply Button */}
                    <div>
                        <h4>Apply Coupon Code:</h4>
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button onClick={handleApplyCoupon}>Apply Coupon</button>
                        {couponError && <p style={{ color: 'red' }}>{couponError}</p>}
                    </div>

                    {/* Display calculated values */}
                    <p>Discount Percentage Applied: {discountPercentage}%</p>
                    <p>Discount Amount: ${discountAmount}</p>
                    <p>Coupon Discount Amount: ${couponDiscountAmount}</p>
                    <p>Final Amount after Discount: ${finalTotal}</p>

                    {/* Purchase Button */}
                    <button onClick={handlePurchase}>Purchase</button>
                </>
            )}
        </div>
    );
}

export default Cart;

