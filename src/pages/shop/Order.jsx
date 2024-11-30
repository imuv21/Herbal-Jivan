
import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Orderproducts, products } from '../../assets/schemas';
import InventoryIcon from '@mui/icons-material/Inventory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// pagination mui
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BuyMoreCard from '../../components/BuyMoreCard';


const Order = () => {

    const [currentPage, setCurrentPage] = useState(1)

    // status dynamic styles 
    const Delivered = { background: '#0bcc4fcc', borderRadius: '40px', padding: '6px 10px', color: 'white' }
    const Shipped = { background: 'rgba(128, 128, 128, 0.862)', borderRadius: '40px', padding: '6px 10px', color: 'white' }
    const Processing = { background: '#e2e200d1', borderRadius: '40px', padding: '6px 10px', color: 'white' }

    // pagination variables
    const totalProduct = Orderproducts.length
    const limit = 4
    const PaginationBtn = Math.ceil(totalProduct / limit)
    const offset = (currentPage - 1) * limit

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };
    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1' }} onClick={onClick}>
                <ChevronLeftIcon />
            </div>
        );
    };

    // slick setting
    const settings = {
        dots: false,
        infinite: false,
        arrow: false,
        // speed: 400,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },


        ],
    };


    return (
        <Fragment>
            <Helmet>
                <title>Your Orders | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/orders" />
            </Helmet>
            <section className='page flexcol center'>
                <article><h1 className='headingBig'> Orders </h1></article>

                <div className='order-wrapper'>
                    <div>
                        <div className='order-con-wrapper'>
                            {
                                Orderproducts.slice(offset, (offset * 1) + limit).map((e) => {
                                    return (
                                        <div key={e.orderId} className='wh order-con'>


                                            <div className='flexcol order-con-two-wrapper'>
                                                <div className='order-con-two'>
                                                    <div>
                                                        <div className='textSmol title'><InventoryIcon /> Order Id</div>
                                                        <div className='textBig heading fw-600'>   <div className='textBig fw-500 order-text'>
                                                            Order id : <span className='fw-600 textBig'>{e.orderId}</span>
                                                        </div></div>
                                                    </div>

                                                    <div>
                                                        <div className='title textSmol'> <CurrencyRupeeIcon />Total Prize</div>
                                                        <div className='textBig heading fw-600'> {e.price}</div>
                                                    </div>

                                                    <div>
                                                        <div className='title textSmol'><DoneIcon /> Status</div>
                                                        <div className='textSmol  fw-600' style={e.status == 'Processing' ? Processing : (e.status == 'Shipped' ? Shipped : (e.status == 'Delivered' && Delivered))} > {e.status}</div>
                                                    </div>

                                                    <div>
                                                        <div className='title textSmol'><LocalShippingIcon />Expected Date</div>
                                                        <div className='textBig heading  fw-600'
                                                        >   {e.deliveryDate} </div>
                                                    </div>

                                                  
                                                </div>
                                            </div>



                                            <div className='order-con-one custom-scroll'>

                                        
                                                <div className='order-card-product-con '>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>

                                                  
                                                <div className='order-card-product-con '>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>


                                                <div className='order-card-product-con  '>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>

                                                <div className='order-card-product-con  '>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>

                                                <div className='order-card-product-con  '>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>


                                                <div className='order-card-product-con '>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>


                                                <div className='order-card-product-con'>
                                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt="" />

                                                    <ul className='p-2 flexcol  mt'>
                                                        <li>Price : <span className='fw-600'>2000</span></li>
                                                        <li>Quantity : <span className='fw-600'>5</span></li>
                                                    </ul>
                                                </div>




                                            </div>

                                            <div className='bottom-info '>
                                                <div className='flex g15'>
                                                    <a href=""><button>View Order </button></a>
                                                    <a href=""><button className='cancel-btn'>Cancel </button></a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {
                            limit !== totalProduct &&
                            (<div className='flex center mt-3'>
                                <Stack spacing={2}>
                                    <Pagination count={PaginationBtn} onChange={(e, pageNumber) => setCurrentPage(pageNumber)} />
                                </Stack>
                            </div>)
                        }
                    </div>

                    <div className='buy-more-con'>
                        <h2 className='headingSmol'>Buy More</h2>
                        {
                            products?.slice(0, 3).map((e) => {
                                return (
                                    <BuyMoreCard name={e.name} id={e.productId} image={e.image} ratings={e.ratings} originalPrice={e.originalPrice} salePrice={e.salePrice} />
                                )
                            })
                        }
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default Order