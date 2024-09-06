

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import CategoryResults from './pages/CategoryResults/CategoryResults';
import SignUp from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';
import SingleProductDetails from './pages/SingleProductDetails/SingleProductDetails';
import { AuthProvider } from './contexts/AuthContext';
import SearchResults from './pages/SearchResults/SearchResults';
import { SearchProvider } from './contexts/Search';
import { CartProvider } from './contexts/CartContext';
import Alladminsdetails from './components/AdminPanel/Alladmins/Alladminsdetails';
import Allproducts from './components/AdminPanel/Allproducts/Allproducts';
import Allusersdetails from './components/AdminPanel/Allusers/Allusersdetails';
import Outofstuck from './components/AdminPanel/Outofstuck/Outofstuck';
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPassword from './pages/Login/ResetPassword';
import ActivateAccount from './pages/Signup/ActivateAccount';
import Checkout from './pages/CheckoutPage/Checkout';
import UserDashboard from './pages/Dashboard/UserDashboard';
import Orders from './components/AdminPanel/Orders/Orders';
import Thankyou from './pages/Thankyou/Thankyou';
import EsewaPaymentForm from './pages/Esewa/EsewaPaymentForm';
import MyOrders from './pages/Dashboard/MyOrders/MyOrders';
import CashInHandOrders from './components/AdminPanel/CashInHandOrders/CashInHandOrders'
import OtherPaymentOrders from './components/AdminPanel/OtherPaymentOrders/OtherPaymentOrders'
import OnGoingDelivery from './components/AdminPanel/OnGoingDelivery/OnGoingDelivery'
import DeliveredOrders from './components/AdminPanel/DeliveredOrders/DeliveredOrders'

const Layout = ({ children, showNavbar = true }) => (
  <>
    {showNavbar && <Navbar />}
    {children}
  </>
);

const App = () => {
  return (
    <SearchProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="*" element={<Navigate to="/home" replace />} />
              <Route
                path="/home"
                element={<Layout><Home /></Layout>}
              />
              <Route
                path="/home/:userid"
                element={<Layout><Home /></Layout>}
              />
              <Route
                path="/search"
                element={<Layout><SearchResults /></Layout>}
              />
              <Route
                path="/category-results"
                element={<Layout><CategoryResults /></Layout>}
              />
              <Route
                path="/product/:id"
                element={<Layout><SingleProductDetails /></Layout>}
              />
              <Route
                path="/about"
                element={<Layout><AboutUs /></Layout>}
              />
              <Route
                path="/signup"
                element={<Layout><SignUp /></Layout>}
              />
              <Route
                path="/activate/:token"
                element={<Layout><ActivateAccount /></Layout>}
              />
              <Route
                path="/login"
                element={<Layout><Login /></Layout>}
              />
              <Route
                path="/forgot-password"
                element={<Layout><ForgotPassword /></Layout>}
              />
              <Route
                path="/reset-password/:token"
                element={<Layout><ResetPassword /></Layout>}
              />
              <Route
                path="/checkout"
                element={<Layout showNavbar={false}><Checkout /></Layout>}
              />

              {/* AdminPanel routes */}
              <Route
                path="/admin"
                element={<Layout><AdminPanel /></Layout>}
              />
              <Route
                path="/alladmins"
                element={<Layout><Alladminsdetails /></Layout>}
              />
              <Route
                path="/allusers"
                element={<Layout><Allusersdetails /></Layout>}
              />
              <Route
                path="/allproducts"
                element={<Layout><Allproducts /></Layout>}
              />
              <Route
                path="/outofstock"
                element={<Layout><Outofstuck /></Layout>}
              />
              <Route
                path="/dashboard"
                element={<Layout><UserDashboard /></Layout>}
              />
              <Route
                path="/orders"
                element={<Layout><Orders /></Layout>}
              />
              <Route
                path="/myorders"
                element={<Layout>< MyOrders/></Layout>}
              />
                <Route
                path="/cashinhandorders"
                element={<Layout><CashInHandOrders/></Layout>}
              />
                <Route
                path="/onlineorders"
                element={<Layout><OtherPaymentOrders/></Layout>}
              />
                <Route
                path="/ongoingdelivery"
                element={<Layout><OnGoingDelivery/></Layout>}
              />
                <Route
                path="/deliveredorders"
                element={<Layout><DeliveredOrders/></Layout>}
              />
              <Route
                path="/thankyou"
                element={<Layout><Thankyou /></Layout>}
              />
                <Route
                path="/esewa"
                element={<Layout><EsewaPaymentForm /></Layout>}
              />
            </Routes>
          </Router>
        </AuthProvider>
      </CartProvider>
    </SearchProvider>
  );
};

export default App;
