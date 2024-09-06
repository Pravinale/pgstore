import React from 'react';
import { useLocation } from 'react-router-dom';
import './EsewaPaymentForm.css';
import {  useNavigate } from 'react-router-dom'; 

const EsewaPaymentForm = () => {
    const location = useLocation();
    const paymentData = location.state?.paymentData;
    const navigate = useNavigate(); 
    const BASE_URL = process.env.REACT_APP_BASE_URL;
;

    if (!paymentData) {
        return <div>Error: Payment data is missing</div>;
    }

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className='esewa-container'>
            <button className='back-button' onClick={goBack}>Back</button>
            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input type="hidden" id="amount" name="amount" value={paymentData.purchasedItemData.price} required />
                <input type="hidden" id="tax_amount" name="tax_amount" value="0" required />
                <input type="hidden" id="total_amount" name="total_amount" value={paymentData.purchasedItemData.price} required />
                <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={paymentData.purchasedItemData._id} required />
                <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required />
                <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
                <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
                <input type="hidden" id="success_url" name="success_url" value={`${BASE_URL}/complete-payment`} required />
                {/* <input type="hidden" id="success_url" name="success_url" value={`${FRONTEND_URL}/thankyou`} required /> */}
                <input type="hidden" id="failure_url" name="failure_url" value="http://esewa.com.np" required />
                <input type="hidden" id="signed_field_names" name="signed_field_names" value={paymentData.payment.signed_field_names} required />
                <input type="hidden" id="signature" name="signature" value={paymentData.payment.signature} required />
                <input value="Go To Esewa" type="submit" />
            </form>
        </div>
    );
};

export default EsewaPaymentForm;
