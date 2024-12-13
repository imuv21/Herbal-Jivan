import React, { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { products, images, categories } from '../assets/schemas';
import Loader from '../components/Loader/Loader';
import Carousel from '../components/Carousel';
import VideoSec from '../components/VideoSec';
import PopularCard from '../components/PopularCard';
import InfSlider from '../components/InfSlider';
const ImageSlider = lazy(() => import('../components/ImageSlider'));



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
          {categories && categories.length > 0 && categories.map((cat, index) => (
            <Link to={`/category?query=${cat.name}`} className='cate-item' key={index}>
              <img src={cat.image} alt={cat.name} />
              <h1 className='heading'>{cat.name}</h1>
            </Link>
          ))}
        </section>

        <VideoSec />
        <article><h1 className='headingBig'>Popular Products</h1></article>
        <PopularCard />

        <article><h1 className='headingBig'>Daily Wellness</h1></article>
        <Carousel products={products} />

        <InfSlider />

      </section>
    </Fragment>
  );
};

export default Home;