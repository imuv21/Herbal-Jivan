import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import cartImg from '../../assets/images/defaultImage.jpg';
import { products } from '../../assets/schemas';


const Cart = () => {

    //quantity
    const [quantities, setQuantities] = useState(
        products.reduce((acc, _, index) => {
            acc[index] = 1;
            return acc;
        }, {})
    );
    const increase = (index) => {
        setQuantities((prev) => ({
            ...prev, [index]: prev[index] + 1,
        }));
    };
    const decrease = (index) => {
        setQuantities((prev) => ({
            ...prev, [index]: prev[index] > 1 ? prev[index] - 1 : 1,
        }));
    };
    const handleQuantity = (index, e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setQuantities((prev) => ({
            ...prev, [index]: value > 0 ? value : 1,
        }));
    };

    //discount totalprice
    const discount = (ogPrice, salePrice) => {
        const discountPercentage = ((ogPrice - salePrice) / ogPrice) * 100;
        return discountPercentage.toFixed(0);
    }
    const totalPrice = (salePrice, quantity) => {
        const totalPrice = (salePrice || 0) * quantity;
        return totalPrice.toFixed(2);
    }


    return (
        <Fragment>
            <Helmet>
                <title>Cart - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/cart" />
            </Helmet>
            <section className='page flexcol center'>
                <article><h1 className='headingBig' style={{ color: 'var(--codeSix)' }}>Shopping Cart</h1></article>
                <section className='cartCont'>
                    <article className='cartProducts'>
                        {products && products.map((item, index) => (
                            <article key={index} className='cartproCont'>
                                <img src={item.image || cartImg} className='cartImg' alt={`${item.name}-${index}`} />
                                <div className="cartDetail">
                                    <p className="textSmol">{item.name}</p>
                                    <div className='flex center g10'>
                                        <p className='product-discounThree'>Rs. {Number(item.originalPrice).toFixed(2)}₹</p>
                                        <p className='product-priceThree'>Rs. {Number(item.salePrice).toFixed(2)}₹</p>
                                        <div className='discount-iconThree'>{discount(item.originalPrice, item.salePrice)}% OFF</div>
                                    </div>
                                    <button>Remove</button>
                                </div>
                                <div className="cartBtnsCont">
                                    <p className='product-priceThree'>Rs. {totalPrice(item.salePrice, quantities[index])}₹</p>
                                    <div className="plusMinusCartCont">
                                        <div onClick={() => increase(index)}><AddIcon /></div>
                                        <input type="number" value={quantities[index]} onChange={(e) => handleQuantity(index, e)} min={1} />
                                        <div onClick={() => decrease(index)}><RemoveIcon /></div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </article>
                    <article className='cartCalc'>

                    </article>
                </section>
            </section>
        </Fragment>
    );
};

export default Cart;