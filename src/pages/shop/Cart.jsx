import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getCart, updateCart, removeCart } from '../../slices/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import cartImg from '../../assets/images/defaultImage.jpg';



const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems, totalSellPrice, getLoading, getError, updLoading, updError } = useSelector((state) => state.cart);
    const [quantities, setQuantities] = useState({});
    const [isRemove, setIsRemove] = useState(false);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        if (cartItems) {
            const initialQuantities = cartItems.reduce((acc, item, index) => {
                acc[index] = item.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cartItems]);

    const updateCartQuantity = (productId, quantity) => {
        dispatch(updateCart({ productId, quantity }));
    };

    //quantity
    const increase = (index, productId) => {
        setQuantities((prev) => {
            const newQuantities = { ...prev, [index]: prev[index] + 1 };
            updateCartQuantity(productId, newQuantities[index]);
            return newQuantities;
        });
    };

    const decrease = (index, productId) => {
        setQuantities((prev) => {
            const newQuantities = { ...prev, [index]: Math.max(1, prev[index] - 1) };
            updateCartQuantity(productId, newQuantities[index]);
            return newQuantities;
        });
    };

    const removeCart = (productId) => {
        if (isRemove) return;
        setIsRemove(true);
        try {
            dispatch(removeCart(productId));
            toast(<div className='flex center g5'> < VerifiedIcon /> Product removed successfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error removing product!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }

    const handleQuantity = (index, productId, e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setQuantities((prev) => {
            const newQuantities = { ...prev, [index]: value > 0 ? value : 1 };
            updateCartQuantity(productId, newQuantities[index]);
            return newQuantities;
        });
    };

    //discount
    const discount = (ogPrice, salePrice) => {
        const discountPercentage = ((ogPrice - salePrice) / ogPrice) * 100;
        return discountPercentage.toFixed(0);
    }

    const totalPrice = (salePrice, quantity) => {
        return ((salePrice || 0) * quantity).toFixed(2);
    };


    return (
        <Fragment>
            <Helmet>

                <title>Cart - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/cart" />
            </Helmet>
            <section className='page flexcol center'>
                <article className='flex center-start wh'><h1 className='heading'>Shopping Cart</h1></article>
                <section className='cartCont'>

                    <article className='cartProducts'>
                        {(getLoading || updLoading) && <p className="text">Loading products...</p>}
                        {(getError || updError) && <p className="text">Error loading products...</p>}
                        {!getLoading && !updLoading && !getError && !updError && cartItems && cartItems.length > 0 ?
                            (cartItems.map((item, index) => (
                                <article key={index} className='cartproCont'>
                                    <img src={item.image?.imageUrl || cartImg} className='cartImg' alt={`${item.itemName}-${index}`} />
                                    <div className='cartDetailCont'>
                                        <div className="cartDetail">
                                            <p className="text">{item.itemName}</p>
                                            <div className='cartPriceBox'>
                                                <p className='product-discounThree'>Rs. {Number(item.unitPrice).toFixed(2)}₹</p>
                                                <p className='product-priceThree'>Rs. {Number(item.sellPrice).toFixed(2)}₹</p>
                                                <div className='discount-iconThree'>{discount(item.unitPrice, item.sellPrice)}% OFF</div>
                                            </div>
                                            <button onClick={() => removeItem(item.productId)}>Remove</button>
                                        </div>
                                        <div className="cartBtnsCont">
                                            {totalSellPrice && <p className='product-priceThreeTwo'>Rs. {totalPrice(item.sellPrice, quantities[index])}₹</p>}
                                            <div className="plusMinusCartCont">
                                                <div onClick={() => increase(index, item.productId)}><AddIcon /></div>
                                                <input type="number" value={quantities[index]} onChange={(e) => handleQuantity(index, item.productId, e)} min={1} disabled={updLoading} />
                                                <div onClick={() => decrease(index, item.productId)}><RemoveIcon /></div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )))
                            :
                            <p className='text'>There are no products in the cart!</p>
                        }
                    </article>

                    <article className='cartCalc'>
                        <article><h1 className='heading'>Cart Summary</h1></article>
                        <div className="flexcol center g5 wh">
                            <input className='applyInput' type="text" placeholder='Enter the code' />
                            <button style={{ width: '100%' }}>Apply coupon</button>
                        </div>
                        <div className="flexcol start-center wh g5">
                            <div className="flex center-space wh">
                                <p className="textBig">Subtotal</p>
                                {totalSellPrice && <p className="textBig">Rs. {Number(totalSellPrice).toFixed(2)}₹</p>}
                            </div>
                            <p className="textSmol">Tax included. Shipping calculated at checkout.</p>
                        </div>
                        <button style={{ width: '100%' }}>Buy Now</button>
                    </article>

                </section>
            </section>
        </Fragment>
    );
};

export default Cart;