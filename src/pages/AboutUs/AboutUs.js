import React,{useContext} from 'react'
import './AboutUs.css'
import Cart from '../Cart/Cart'
import { CartContext } from '../../contexts/showCartContext';
import Footer from '../Footer/Footer';


const AboutUs = () => {
    const { showCart } = useContext(CartContext);
  return (
   <>
    <div className='about-container'>
        <h1> this is About Page</h1>
    </div>

    <div className={`cartPage ${showCart ? 'visible' : 'hidden'}`}>
          <Cart />
    </div>
    <Footer/>
   </>
  )
}

export default AboutUs