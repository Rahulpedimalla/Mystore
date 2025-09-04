
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";

function Veg(){
    const dispatch = useDispatch();
    const vegProducts = useSelector(state => state.products.veg)
    const items = vegProducts.map((product, index)=>
    <li key = {index}>
    {product.name}  -  ${product.price.toFixed(2)}      
        <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button></li>
    )
    return(
        <>
        <h1> Veg Products!</h1>
        <ul>{items}</ul>
        </>
    )
}
export default Veg;