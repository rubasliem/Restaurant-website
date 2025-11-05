
import { Route, Routes } from "react-router";
//import ProductList from '../components/pages/ProductList.jsx';
//import Cart from '../components/pages/Cart.jsx';
import Login from '../components/pages/Login.jsx';
import Register from '../components/pages/Register.jsx';
import NotFound from '../components/pages/NotFound.jsx';
//import Details from '../components/pages/Details.jsx';
import Connect from '../components/pages/Contact.jsx';
import React from "react";
import { Suspense } from "react";
//import Favorite from "../components/pages/Favotite.jsx";
import Contact from "../components/pages/Contact.jsx";
import Confirm from "../components/pages/ConfirmOrder.jsx"
import Invoice from "../components/pages/Invoice.jsx"

const MealsList = React.lazy(() => import('../components/pages/MealsList.jsx'));
const Cart = React.lazy(() => import('../components/pages/Cart.jsx'));
const Details = React.lazy(() => import('../components/pages/Details.jsx'));
const Favorite = React.lazy(() => import('../components/pages/Favotite.jsx'));

export default function RoutesList() {
    return (
        <Suspense fallback={<div>Loading <i className="bi bi-tux"></i> ...</div>}>
        <Routes>
          <Route path="/" element={<MealsList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/confirm" element={<Confirm/>} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
    )
}

