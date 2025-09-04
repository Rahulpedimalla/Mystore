import { configureStore, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        veg: [
            { name: 'tomato', price: 27.5 },
            { name: 'potato', price: 56.7 },
            { name: 'chillis', price: 90.7 },
            { name: 'carrots', price: 49.7 },
            { name: 'onions', price: 89.7 },
            { name: 'garlic', price: 75.7 }
        ],
        nonveg: [
            { name: 'chicken', price: 280.5 },
            { name: 'fish', price: 330.7 },
            { name: 'mutton', price: 420.7 },
            { name: 'prawns', price: 470.7 }
        ],
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        discount: 0,
        purchaseHistory: [] // New state to store purchase history
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        increment: (state, action) => {
            const item = state.items.find(item => item.name === action.payload.name);
            if (item) item.quantity += 1;
        },
        decrement: (state, action) => {
            const item = state.items.find(item => item.name === action.payload.name);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(i => i.name !== item.name);
                }
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload.name);
        },
        applyDiscount: (state, action) => {
            state.discount = action.payload;
        },
        purchaseItems: (state) => {
            const purchaseRecord = {
                items: state.items,
                total: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                discount: state.discount,
                purchaseDate: new Date().toLocaleDateString(),
            };
            state.purchaseHistory.push(purchaseRecord);
            state.items = []; // Clear the cart after purchase
            state.discount = 0; // Reset discount
        }
    }
});

export const { addToCart, increment, decrement, removeFromCart, applyDiscount, purchaseItems } = cartSlice.actions;
const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
    },
});
export default store;