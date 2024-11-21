import React, { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader/Loader';
import { images } from '../assets/schemas';
import Carousel from '../components/Carousel';
import { products } from '../assets/schemas';
const ImageSlider = lazy(() => import('../components/ImageSlider'));

const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Herbal Jivan - Embrace Wellness, Naturally</title>
        <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
        <link rel="canonical" href="https://herbaljivan.netlify.app" />
      </Helmet>
      <section className='page flexcol g5 center'>
        <Suspense fallback={<Loader />}>
          <ImageSlider images={images} interval={5000} />
        </Suspense>

        <article><h1 className='heading'>Best Deals</h1></article>
        <Carousel products={products} />

        <article><h1 className='heading'>Daily Wellness</h1></article>
        <Carousel products={products} />

      </section>
    </Fragment>
  );
};

export default Home;