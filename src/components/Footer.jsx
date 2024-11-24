import React, { Fragment } from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import Visa from '../assets/images/visa.png';
import Upi from '../assets/images/upi.png';
import Paypal from '../assets/images/paypal.png';
import Mastercard from '../assets/images/mastercard.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Fragment>
            <div className='footer'>
                <div className='footer-flex-1'>
                    <div className='support-1'>
                        <LiaShippingFastSolid className='footer-img' />
                        <p className='para-1 mt'>Free Shipping</p>
                        <p className='foSize mt'>Free Shipping for orders over Rs.289</p>
                    </div>
                    <div className='support-1'>
                        <MdSupportAgent className='footer-img' />
                        <p className='para-1 mt'>Expert Support</p>
                        <p className='foSize mt'>Every Day 10:00 am to 7:00 pm</p>
                    </div>
                    <div className='support-1'>
                        <MdPayment className='footer-img' />
                        <p className='para-1 mt'>Secure Payment</p>
                        <p className='foSize mt'>100% Secure payment getaway</p>
                    </div>
                </div>
                <div className='border-line-1 mt-3'></div>
                <div className='footer-nav-item mt-3'>
                    <div className='footer-flex-2'>
                        <div className='para-2'>KEEP IN TOUCH</div>
                        <p className='para-3 mt'>Expert Support</p>
                        <input className='input-width' type='text' placeholder='Email' />
                        <div className='para-2'>Payment Method</div>
                        <div className='footer-flex-3 mt'>
                            <img className='payment-icon' src={Visa} />
                            <img className='payment-icon' src={Upi} />
                            <img className='payment-icon' src={Mastercard} />
                            <img className='payment-icon' src={Paypal} />
                        </div>
                    </div>
                    <div className='footer-flex-2'>
                        <div className='para-2'>QUICK LINKS</div>
                        <div className=' para-3 mt'>About Us</div>
                        <div className='para-3'>Track Our Order</div>
                        <Link to='/contact-us' className='para-3'>Contact Us</Link>
                        <div className='para-3'>Terms of Services</div>
                        <div className='para-3'>Refund and Term Services</div>
                        <div className='para-3'>Shipping Policy</div>
                        <div className='para-3'>Privacy and Policy</div>
                    </div>
                    <div className='footer-flex-2'>
                        <div className='para-2'>CATEGORY</div>
                        <div className='para-3 mt'>Joint Pain</div>
                        <div className='para-3'>Hair Fall</div>
                        <div className='para-3'>Weight Gain</div>
                        <div className='para-3'>Diabetic</div>
                        <div className='para-3'>Sexual</div>
                    </div>
                    <div className='footer-flex-2'>
                        <div className='para-2'>CONNECT WITH US</div>
                        <div className=' para-3 mt'>Address: Plot no. A-1/197,Hastsal,
                            <p className='para-3'>Uttam Nagar, Delhi, India, 110059</p></div>
                        <div className='para-3'>Phone: 9599896554</div>
                        <div className='para-3'>Email: herbalscience28@gmail.com</div>
                        <div className='footer-flex-3 mt'>
                            <FacebookIcon />
                            <InstagramIcon />
                            <XIcon />
                            <YouTubeIcon />
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className='border-line-1 mt-3'></div>
                <div className='para-1 content-padding '>© Copyright 2024 Herbal Science</div>
            </div>
        </Fragment>
    )
}
export default Footer