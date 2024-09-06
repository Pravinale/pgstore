import React from 'react'
import './Thankyou.css'
import { useNavigate } from 'react-router-dom'; 


const Thankyou = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleShopAgain = () =>{
        navigate('/home')
    }

  return (
    <div className='thankyou-container'>
        <h1>Thankyou For Your Order</h1>
        <button onClick={handleShopAgain}>Shop Again..</button>
    </div>
  )
}

export default Thankyou