import React, { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader/Loader';
import { images } from '../assets/schemas';
import Carousel from '../components/Carousel';
import { products } from '../assets/schemas';
import tempImage from '../assets/images/defaultImage.jpg';
const ImageSlider = lazy(() => import('../components/ImageSlider'));
import VideoSec from '../components/VideoSec';
import PopularCard from '../components/PopularCard';


const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Herbal Jivan - Embrace Wellness, Naturally</title>
        <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
        <link rel="canonical" href="https://herbaljivan.netlify.app" />
      </Helmet>
      <Suspense fallback={<Loader />}>
        <ImageSlider images={images} interval={5000} />
      </Suspense>
      <section className='homepage flexcol center'>

        <article><h1 className='headingBig'>Best Deals</h1></article>
        <Carousel products={products} />

        <article><h1 className='headingBig'>Shop By Category</h1></article>

        <section className="category">
          <article className='cate-item'>
            <img src={tempImage} alt="JOINT PAIN" />
            <h1 className='heading'>JOINT PAIN</h1>
          </article>
          <article className='cate-item'>
            <img src={tempImage} alt="HAIR FALL" />
            <h1 className='heading'>HAIR FALL</h1>
          </article>
          <article className='cate-item'>
            <img src={tempImage} alt="WEIGHT GAIN" />
            <h1 className='heading'>WEIGHT GAIN</h1>
          </article>
          <article className='cate-item'>
            <img src={tempImage} alt="DIABETIC" />
            <h1 className='heading'>DIABETIC</h1>
          </article>
          <article className='cate-item'>
            <img src={tempImage} alt="SEXUAL" />
            <h1 className='heading'>SEXUAL</h1>
          </article>
        </section>

        <VideoSec />
        <article><h1 className='headingBig'>Popular Products</h1></article>
        <PopularCard />

        <article><h1 className='headingBig'>Daily Wellness</h1></article>
        <Carousel products={products} />

      </section>
    </Fragment>
  );
};

export default Home;