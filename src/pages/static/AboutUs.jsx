import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import ccare from '../../assets/images/customer-care.png';
import insu from '../../assets/images/insurance.png';
import tranp from '../../assets/images/transparency.png';
import svgp from '../../assets/images/bg-pattern.svg';

const AboutUs = () => {

    return (
        <Fragment>
            <Helmet>
                <title>About US | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/about-us" />
            </Helmet>

            <section className='page flexcol center'>

                <div className='section-con'>
                    <img src="https://cavinkare.com/wp-content/uploads/bfi_thumb/herbal-shampoo-ze1z27l7o67gpx3ypedf5s.jpg" alt="" />
                    <div >
                        <h3 className='text fw-600'>About us</h3>
                        <h2 className='heading mt'>Welcome to Herbal Jivan!</h2>
                        <p className='textBig mt'>  At Herbal Jivan, we believe in the power of nature to heal, nourish, and elevate your well-being. Our mission is to provide high-quality herbal products that promote health, wellness, and a balanced life for everyone. We take pride in offering products that harness the ancient wisdom of herbal remedies, crafted with care and precision to support modern lifestyles.</p>
                        <p className='textBig mt'>In a world increasingly driven by synthetic ingredients and quick fixes, we take pride in offering products that honor the wisdom of nature. Our herbal remedies are carefully selected from the purest, most potent plants to provide holistic support for your body and mind. By blending centuries-old healing practices with contemporary research, we strive to offer effective, natural alternatives that empower you to live your best life.</p>

                        <a href="tel:9599896554" className='call-us-con'>
                            <div className='icon-con'>
                                <HeadsetMicIcon />
                            </div>
                            <div>
                                <p className='fw-500'>Call us For query</p>
                                <div className='headingSmol'>+91-9599896554</div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className='mt-3'>
                    <article><h1 className='headingBig text-center'>Why Choose Herbal Jivan?</h1></article>
                    <div className='why-choose-card-wrapper'>
                        <div className='why-choose-card'>
                            <div className='card-icon-wrapper'>
                                <div className='icon-con'>
                                    <img src={ccare} alt="customer-care" />
                                </div>
                            </div>
                            <h3 className='headingSmol'>Authenticity</h3>
                            <p className='textBig mt'>
                                Our formulas are rooted in centuries-old herbal traditions, carefully crafted to ensure authenticity and efficacy.
                            </p>
                        </div>

                        <div className='why-choose-card'>
                            <div className='card-icon-wrapper'>
                                <div className='icon-con'>
                                    <img src={insu} alt="insurance" />
                                </div>
                            </div>
                            <h3 className='headingSmol'>Transparency</h3>
                            <p className='textBig mt'>
                                We believe in complete transparency, providing you with detailed information about our sourcing, ingredients, and the benefits of our products.
                            </p>
                        </div>

                        <div className='why-choose-card'>
                            <div className='card-icon-wrapper'>
                                <div className='icon-con'>
                                    <img src={tranp} alt="transparency" />
                                </div>
                            </div>
                            <h3 className='headingSmol'>Customer Care</h3>
                            <p className='textBig mt'>
                                Your health and satisfaction are our top priority. We’re here to guide you every step of the way on your wellness journey, ensuring you find the right products for your needs.
                            </p>
                        </div>
                    </div>

                </div>


                <div className='mt-3'>
                    <article><h1 className='headingBig text-center'>Our Values</h1></article>
                    <ul className='our-values-ul row row-cols-1 row-cols-md-2 justify-content-center'>
                        <li className='col'> <p className='textBig'><span className='textBig'><ArrowForwardIosRoundedIcon /> <h3 className='headingSmol'> Quality </h3> </span>We source only the finest herbs and botanicals, carefully selecting ingredients for their potency and purity. Each product is crafted with attention to detail and undergoes rigorous testing to ensure the highest standards of excellence.</p> </li>
                        <li className='col'> <p className='textBig'><span className='textBig'><ArrowForwardIosRoundedIcon /> <h3 className='headingSmol'> Sustainability</h3> </span>At Herbal Jivan, we are dedicated to eco-conscious practices. From sourcing our ingredients responsibly to using recyclable packaging, we strive to minimize our environmental footprint and protect the planet.</p> </li>
                        <li className='col'> <p className='textBig'><span className='textBig'><ArrowForwardIosRoundedIcon /> <h3 className='headingSmol'> Holistic Wellness</h3> </span>We believe in the interconnectedness of mind, body, and spirit. Our products are designed to support your overall well-being, helping you achieve balance, vitality, and harmony in your daily life.</p> </li>
                    </ul>

                </div>


                <div className='mt-3'>
                    <div className='join-us-con'>
                        <h3 className='heading c'>Join the Herbal Jivan Community</h3>
                        <p className='mt textBig'>At Herbal Jivan, we’re more than just a company—we’re a community of like-minded individuals who believe in the power of nature to transform lives. Whether you're just beginning your wellness journey or are a seasoned herbal enthusiast, we’re here to support you in achieving your goals.</p>
                        <img src={svgp} alt="svgpattern" />
                    </div>
                </div>


            </section>
        </Fragment>
    )
}

export default AboutUs