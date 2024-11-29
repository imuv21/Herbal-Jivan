import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';


const AboutUs = () => {

    return (
        <Fragment>
            <Helmet>
                <title>About US | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/about-us" />
            </Helmet>

            <section className='page flexcol center'>
                <article><h1 className='headingBig'>Welcome to Herbal Jivan – Discover Wellness with us!</h1></article>

                <p className="text">
                    Founded in 2019, Herbal Jivan is dedicated to understanding the daily challenges and imbalances of modern life, aiming to restore harmony and quality to your everyday routine. We believe that balance is essential for achieving overall wellness. At Herbal Jivan, our mission is to discover and develop natural formulations in the most effective ways, ensuring a healthy and fulfilling life for our customers.
                </p>
                <p className="text">
                    Herbal Jivan represents the pursuit of wellness both internally and externally, bringing equilibrium to your life. We stand by our promise to deliver products made from the highest quality ingredients, meticulously selected by our experts from the purest sources. Our goal is to offer you the most effective and genuine experience with our natural solutions.
                </p>
                <p className="text">
                    At Herbal Jivan, we are dedicated to providing you with the finest products, supporting your journey to wellness. We are continually seeking trusted formulations from ancient traditions, ensuring that our products help you lead healthier and more balanced lives.
                </p>
            </section>
        </Fragment>
    )
}

export default AboutUs