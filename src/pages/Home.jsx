import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Herbal Jivan - Embrace Wellness, Naturally</title>
        <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
        <link rel="canonical" href="https://herbaljivan.netlify.app" />
      </Helmet>
      <div className='page flexcol g5 center'>
        <h1 className="text">Home page</h1>
      </div>
    </Fragment>
  );
};

export default Home;