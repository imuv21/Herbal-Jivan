import React, { Fragment } from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import whatsapp from '../assets/images/icons8-whatsapp-480.png';


const Layout = ({ children }) => {

    return (
        <Fragment>
            <Header />
            {children}
            <a id="whatsapp-link" target="_blank" aria-label="Send a message via WhatsApp" href="https://wa.me/+917004453015?text=Hii, I need help ">
                <img className='whatsapp' src={whatsapp} alt="whatsapp" />
            </a>
            <Footer />
        </Fragment>
    );
};

export default Layout;