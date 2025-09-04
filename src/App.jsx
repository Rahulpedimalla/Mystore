
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Cart from './Cart';
import PurchaseHistory from './PurchaseHistory';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './App.css';
import { useSelector } from 'react-redux';
import GoogleLoginComponent from './GoogleLoginComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FaceBookLoginComponent from './FaceBookLoginComponent';

function App() {
  // Access `cart.items` instead of `cart` to get the array of items in the cart
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);    

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/home'>Home</Link>
          <Link to='/veg'>Veg</Link>
          <Link to='/nonveg'>NonVeg</Link>
          <Link to='/cart'>Cart ({totalItems})</Link>
          <Link to='/purchasehistory'>PurchaseHistory</Link>
          <Link to='/aboutus'>AboutUs</Link>
          <Link to='/contactus'>ContactUs</Link>
          <GoogleOAuthProvider clientId="938065162934-it81qcqs2gtqgi99ajii7f96lvh65m72.apps.googleusercontent.com">
            <GoogleLoginComponent />
          </GoogleOAuthProvider>
    <FaceBookLoginComponent />
    
  

        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchasehistory" element={<PurchaseHistory />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App
