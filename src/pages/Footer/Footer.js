import React from 'react'
import './Footer.css'
import { FaFacebook, FaYoutube, FaInstagram, FaGoogle, FaSmile   } from 'react-icons/fa';


const Footer = () => {
  return (
    <>
        <div className='footer-section'>

            <div className='footer-container'>  
            <div className='footer'>
              <h1>Custumer Care</h1>
              <a href='#'>Help Center</a>
              <a href='#'>How To Buy</a>
              <a href='#'>Contact Us</a>
            </div>
            <div className='footer'>
              <h1>PG | STORE</h1>
              <a href='#'>About PG | STORE</a>
              <a href='#'>Careers</a>
              <a href='#'>Terms & Conditions</a>
              <a href='#'>Privacy Policy</a>
            </div>
            <div className='footer'>
              <h1>Contact Us</h1>
              <a href='#'><i><FaFacebook/></i>Facebook</a>
              <a href='#'><i><FaInstagram/></i>Instagram</a>
              <a href='#'><i><FaYoutube/></i>Youtube</a>
              <a href='#'><i><FaGoogle /></i>Google</a>

            </div>
            <div className='footer'>
              <h1>Happy Shopping</h1>
              <span><i><FaSmile /></i></span>
            </div>
            </div>

            <div className='developed'>
              <h1>Developed By PG | STORE</h1>
            </div>
        </div>
    </>
  )
}

export default Footer