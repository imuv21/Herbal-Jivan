import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { productDetail } from '../../assets/schemas';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import freedelivery from '../../assets/images/icons8-delivery-100.png';
import cod from '../../assets/images/icons8-cash-on-delivery-100.png';
import returns from '../../assets/images/icons8-return-purchase-100.png';
import payment from '../../assets/images/icons8-secure-payment-100.png';
import delivery from '../../assets/images/icons8-delivery.png';


const ProductDetails = () => {

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const discountPercentage = ((productDetail?.originalPrice - productDetail?.salePrice) / productDetail?.originalPrice) * 100;
  const price = (productDetail?.salePrice || 0) * quantity;

  //image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    productDetail?.imageOne,
    productDetail?.imageTwo,
    productDetail?.imageThree,
    productDetail?.imageFour,
    productDetail?.imageFive,
  ].filter((img) => img);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };


  //stars
  const getStars = (ratings) => {
    const fullStars = Math.floor(ratings);
    const decimalPart = ratings % 1;
    const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
    const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
    const emptyStars = 5 - adjustedFullStars - halfStar;
    return { fullStars: adjustedFullStars, halfStar, emptyStars };
  };
  // const { fullStars, halfStar, emptyStars } = getStars(productDetail?.ratings);


  //quantity
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleQuantity = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setQuantity(value > 0 ? value : 1);
  };


  //dates
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 1);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5);

  const options = { month: 'short', day: 'numeric' };
  const formattedDeliveryStart = deliveryStart.toLocaleDateString('en-US', options);
  const formattedDeliveryEnd = deliveryEnd.toLocaleDateString('en-US', options);


  //reviews
  const fivestar = 57;
  const fourstar = 35;
  const threestar = 18;
  const twostar = 0;
  const onestar = 42;

  const totalreviews = fivestar + fourstar + threestar + twostar + onestar;
  const rating = ((fivestar * 5 + fourstar * 4 + threestar * 3 + twostar * 2 + onestar * 1) / totalreviews).toFixed(1);

  const { fullStars, halfStar, emptyStars } = getStars(rating);

  const calculatePercentage = (count) => ((count / totalreviews) * 100).toFixed(2);
  const ratings = [
    { stars: 5, count: fivestar },
    { stars: 4, count: fourstar },
    { stars: 3, count: threestar },
    { stars: 2, count: twostar },
    { stars: 1, count: onestar },
  ];



  return (
    <Fragment>
      <Helmet>
        <title>Product Details - Embrace Wellness, Naturally</title>
        <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
        <link rel="canonical" href="https://herbaljivan.netlify.app/product-details" />
      </Helmet>
      <div className='page flexcol g5 center'>

        <section className='pdCont outline3'>
          <article className="pdContImg">
            <div className="mainImgCont">
              <div className="mainImageWrapper" style={{ transform: `translateX(-${currentImageIndex * 100}%)`, width: `calc(100% * ${images?.length})`, "--num-images": images.length, }}>
                {images.map((img, index) => (
                  <img key={index} src={img} alt={`image${index + 1}`} className="mainImage" />
                ))}
              </div>
              <div className="imageSwitcher">
                <ArrowCircleLeftIcon onClick={handlePrevImage} />
                <ArrowCircleRightIcon onClick={handleNextImage} />
              </div>
            </div>
            <div className="smallImages">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`image${index + 1}`} onClick={() => handleImageClick(index)} className={index === currentImageIndex ? "selected" : ""} />
              ))}
            </div>
          </article>

          <article className='pdContDetail'>
            <h1 className='headingSmol'>{productDetail?.name}</h1>
            <div className="starContTwo">
              {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="starTwo"><StarIcon /></span>
              ))}
              {halfStar === 1 && (
                <span className="starTwo"><StarHalfIcon /></span>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="dullStarTwo"><StarOutlineIcon /></span>
              ))}
              &nbsp;&nbsp;&nbsp;<span className="textBig">{productDetail?.ratings}</span>
            </div>
            <div className='flexcol start-center'>
              <div className='flex center g10'>
                <p className='product-discounTwo'>Rs. {Number(productDetail?.originalPrice).toFixed(2)}₹</p>
                <p className='product-priceTwo'>Rs. {Number(productDetail?.salePrice).toFixed(2)}₹</p>
                <div className='discount-iconTwo'>{discountPercentage.toFixed(0)}% OFF</div>
              </div>
              <p className="product-discounTwo" style={{ textDecoration: 'none' }}>Tax included.</p>
            </div>
            <div className="plusMinusCont">
              <div onClick={increase}><AddIcon /></div>
              <input type="number" value={quantity} onChange={handleQuantity} min={1} />
              <div onClick={decrease}><RemoveIcon /></div>
            </div>
            <p className='textBig' style={{ lineHeight: '24px', color: 'gray' }}>{productDetail?.info}</p>
            <div className="pdFeatureIcons">
              <div><img src={freedelivery} alt="delivery" /><p className="text">Free Delivery</p></div>
              <div><img src={cod} alt="pay-on-delivery" /><p className="text">Pay on Delivery</p></div>
              <div><img src={returns} alt="returns" /><p className="text">Easy Returns</p></div>
              <div><img src={payment} alt="secure-payment" /><p className="text">Secure Payment</p></div>
            </div>
            <button className='payBtn'>Pay Now &nbsp; {Number(price).toFixed(2)}₹</button>
            <div className="flex end-start wh g15 estimated">
              <img src={delivery} alt="delivery" /> <p className='text'> Estimated Delivery: {formattedDeliveryStart} - {formattedDeliveryEnd} </p>
            </div>
          </article>
        </section>

        <section className='ratings outline2'>
          <article><h1 className='heading' style={{ color: 'var(--codeSix)' }}>Customer Reviews</h1></article>
          <article className='ratingCont outline1'>

            <div className='ratingBox'>
              <div className="flex center wh">
                {[...Array(fullStars)].map((_, i) => (
                  <span key={`full-${i}`} className="starTwo"><StarIcon /></span>
                ))}
                {halfStar === 1 && (
                  <span className="starTwo"><StarHalfIcon /></span>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <span key={`empty-${i}`} className="dullStarTwo"><StarOutlineIcon /></span>
                ))}
              </div>
              <p className="textBig">{rating} out of 5</p>
              <p className='textBig'>based on {totalreviews} reviews</p>
            </div>

            <div className='ratingBox'>
              {ratings.map((rating) => (
                <div key={rating.stars} className='ratingline'>
                  <div className='starContThree'>
                    {[...Array(rating.stars)].map((_, i) => (
                      <span key={`full-${i}`} className="starThree"><StarIcon /></span>
                    ))}
                    {[...Array(5 - rating.stars)].map((_, i) => (
                      <span key={`empty-${i}`} className="dullStarThree"><StarOutlineIcon /></span>
                    ))}
                  </div>
                  <div className='line'>
                    <div className='yellowline' style={{ width: `${calculatePercentage(rating.count)}%`, }}></div>
                  </div>
                  <p>{rating.count}</p>
                </div>
              ))}
            </div>

            <div className='ratingBox'>

            </div>
            
          </article>
        </section>
      </div>
    </Fragment>
  );
};

export default ProductDetails;