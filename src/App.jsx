import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';


//components
import Loader from './components/Loader/Loader';
const Protector = lazy(() => import('./components/Protector'));
const Layout = lazy(() => import('./components/Layout'));

//public
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Otp = lazy(() => import('./pages/auth/Otp'));

//private
const Profile = lazy(() => import('./pages/auth/Profile'));
const Cart = lazy(() => import('./pages/shop/Cart'));
const Order = lazy(() => import('./pages/shop/Order'));

//both
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/shop/Search'));
const ProductDetails = lazy(() => import('./pages/shop/ProductDetails'));
const ContactUs = lazy(() => import('./pages/static/ContactUs'));
const AboutUs = lazy(() => import('./pages/static/AboutUs'));



function App() {

  // const user = useSelector((state) => state.auth.user);
  const user = true;

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>

          {/* private */}
          <Route element={<Protector user={user} />}>
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/orders' element={<Layout><Order /></Layout>} />
          </Route>

          {/* public */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify-otp' element={<Otp />} />
          </Route>

          {/* both */}
          <Route path='/' element={<Layout><Home /></Layout>} />
          <Route path='/product-details/:id' element={<Layout><ProductDetails /></Layout>} />
          <Route path='/search-results' element={<Layout><Search /></Layout>} />
          <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
          <Route path='/about-us' element={<Layout><AboutUs /></Layout>} />
          <Route path='/loader' element={<Loader />} />

          {/* not found */}
          <Route path='*' element={<div className='page flex center wh'>The path does not exist!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;