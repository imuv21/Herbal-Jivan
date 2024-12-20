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
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const NewPassword = lazy(() => import('./pages/auth/NewPassword'));

//private
const Profile = lazy(() => import('./pages/auth/Profile'));
const Cart = lazy(() => import('./pages/shop/Cart'));
const Order = lazy(() => import('./pages/shop/Order'));

//both
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/shop/Search'));
const ProductDetails = lazy(() => import('./pages/shop/ProductDetails'));
const Category = lazy(() => import('./pages/shop/Category'));

const ContactUs = lazy(() => import('./pages/static/ContactUs'));
const AboutUs = lazy(() => import('./pages/static/AboutUs'));
const BulkOrder = lazy(() => import('./pages/static/BulkOrder'));
const Privacy = lazy(() => import('./pages/static/Privacy'));
const Refund = lazy(() => import('./pages/static/Refund'));
const Shipping = lazy(() => import('./pages/static/Shipping'));
const Term = lazy(() => import('./pages/static/Term'));

//admin panel
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const AddNewProduct = lazy(() => import('./admin/pages/AddNewProduct'));
const EditProduct = lazy(() => import('./admin/pages/EditProduct'));
const ProductList = lazy(() => import('./admin/pages/ProductList'));
const TopRated = lazy(() => import('./admin/pages/TopRated'));
const BestSeller = lazy(() => import('./admin/pages/BestSeller'));
const Featured = lazy(() => import('./admin/pages/Featured'));
const CategoryList = lazy(() => import('./admin/pages/CategoryList'));
const UsersList = lazy(() => import('./admin/pages/UsersList'));
const OrdersList = lazy(() => import('./admin/pages/OrdersList'));
const ReviewsList = lazy(() => import('./admin/pages/ReviewsList'));
const QuestionsList = lazy(() => import('./admin/pages/QuestionsList'));
const UserOrder = lazy(() => import('./admin/pages/UserOrder'));
const Reviews = lazy(() => import('./admin/pages/Reviews'));
const Questions = lazy(() => import('./admin/pages/Questions'));
const ProductDetailAdmin = lazy(() => import('./admin/pages/ProductDetailAdmin'));
const AddAdmin = lazy(() => import('./admin/pages/AddAdmin'));
const RoleManagement = lazy(() => import('./admin/pages/RoleManagement'));


function App() {

  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>

          {/* admin routes (public) */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/admin/login' element={<AdminLogin />} />
          </Route>

          {/* admin routes (private) */}
          {/* <Route element={<Protector user={user} requiredRole="ADMIN" redirect="/admin/login" />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-new-product" element={<AddNewProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="orders-list" element={<OrdersList />} />
              <Route path="reviews-list" element={<ReviewsList />} />
              <Route path="questions-list" element={<QuestionsList />} />
              <Route path="user-list" element={<UsersList />} />
              <Route path="user-list/user-orders/:id" element={<UserOrder />} />
              <Route path="user-list/user-reviews/:id" element={<Reviews />} />
              <Route path="user-list/user-questions/:id" element={<Questions />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="product-list/product-details/:id" element={<ProductDetailAdmin />} />
              <Route path="top-rated-products" element={<TopRated />} />
              <Route path="best-seller-products" element={<BestSeller />} />
              <Route path="featured-products" element={<Featured />} />
              <Route path="add-new-admin" element={<AddAdmin />} />
              <Route path="role-management" element={<RoleManagement />} />
            </Route>
          </Route> */}

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-new-product" element={<AddNewProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="orders-list" element={<OrdersList />} />
            <Route path="reviews-list" element={<ReviewsList />} />
            <Route path="questions-list" element={<QuestionsList />} />
            <Route path="user-list" element={<UsersList />} />
            <Route path="user-list/user-orders/:id" element={<UserOrder />} />
            <Route path="user-list/user-reviews/:id" element={<Reviews />} />
            <Route path="user-list/user-questions/:id" element={<Questions />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="product-list/product-details/:id" element={<ProductDetailAdmin />} />
            <Route path="top-rated-products" element={<TopRated />} />
            <Route path="best-seller-products" element={<BestSeller />} />
            <Route path="featured-products" element={<Featured />} />
            <Route path="add-new-admin" element={<AddAdmin />} />
            <Route path="role-management" element={<RoleManagement />} />
          </Route>

          {/* user routes (private) */}
          <Route element={<Protector user={user} requiredRole="USER" redirect="/login" />}>
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/orders' element={<Layout><Order /></Layout>} />
          </Route>

          {/* user routes (public) */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify-otp' element={<Otp />} />
            <Route path='/verify-password' element={<ForgotPassword />} />
            <Route path='/new-password' element={<NewPassword />} />
          </Route>

          {/* user routes (public & private) */}
          <Route path='/' element={<Layout><Home /></Layout>} />
          <Route path='/product-details/:id' element={<Layout><ProductDetails /></Layout>} />
          <Route path='/search-results' element={<Layout><Search /></Layout>} />
          <Route path='/category' element={<Layout><Category /></Layout>} />

          <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
          <Route path='/about-us' element={<Layout><AboutUs /></Layout>} />
          <Route path='/bulk-order' element={<Layout><BulkOrder /></Layout>} />
          <Route path='/privacy-policy' element={<Layout><Privacy /></Layout>} />
          <Route path='/shipping-policy' element={<Layout><Shipping /></Layout>} />
          <Route path='/return-policy' element={<Layout><Refund /></Layout>} />
          <Route path='/terms-and-conditions' element={<Layout><Term /></Layout>} />

          {/* not found */}
          <Route path='*' element={<div className='page flex center wh'>The path does not exist!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;