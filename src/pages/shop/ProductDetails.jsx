import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, animated } from '@react-spring/web';
import { addToCart, getCart } from '../../slices/cartSlice';
import { fetchProductDetails } from '../../slices/productSlice';
import { productDetail, reviews, quests } from '../../assets/schemas';
import Carousel from '../../components/Carousel';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import freedelivery from '../../assets/images/icons8-delivery-100.png';
import cod from '../../assets/images/icons8-cash-on-delivery-100.png';
import returns from '../../assets/images/icons8-return-purchase-100.png';
import payment from '../../assets/images/icons8-secure-payment-100.png';
import delivery from '../../assets/images/icons8-delivery.png';



const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { pDetails, pdLoading, pdError } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const discountPercentage = ((pDetails?.originalPrice - pDetails?.salePrice) / pDetails?.originalPrice) * 100;
  const price = (pDetails?.salePrice || 0) * quantity;
  const ogPrice = (pDetails?.originalPrice || 0) * quantity;

  const fivestar = Number(pDetails?.fiveStar ?? 0);
  const fourstar = Number(pDetails?.fourStar ?? 0);
  const threestar = Number(pDetails?.threeStar ?? 0);
  const twostar = Number(pDetails?.twoStar ?? 0);
  const onestar = Number(pDetails?.oneStar ?? 0);
  
  const totalreviews = fivestar + fourstar + threestar + twostar + onestar;
  const ratings = [{ stars: 5, count: fivestar }, { stars: 4, count: fourstar }, { stars: 3, count: threestar }, { stars: 2, count: twostar }, { stars: 1, count: onestar }];

  const images = pDetails?.image?.map((img) => img.imageUrl) || [];
  const inStock = pDetails?.stock > 0 ? true : false;

  //image slider
  const [index, setIndex] = useState(0);
  const interval = 4000;

  useEffect(() => {
    if (index >= images.length) {
      setIndex(0);
    }
  }, [images.length, index]);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [images.length, interval]);

  const transitions = useTransition(index, {
    key: images.length > 0 ? index : null,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);


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


  //login, add to cart
  const addToCartHandler = async (id, quantity) => {
    if (isAdded) return;
    setIsAdded(true);
    try {
      const response = await dispatch(addToCart({ productId: id, quantity })).unwrap();
      toast(<div className='flex center g5'> < VerifiedIcon /> {`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } finally {
      setIsAdded(false);
    }
  };

  const login = () => {
    navigate('/login');
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


  //stars
  const getStars = (ratings) => {
    const fullStars = Math.floor(ratings);
    const decimalPart = ratings % 1;
    const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
    const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
    const emptyStars = 5 - adjustedFullStars - halfStar;
    return { fullStars: adjustedFullStars, halfStar, emptyStars };
  };
  const rating = ((fivestar * 5 + fourstar * 4 + threestar * 3 + twostar * 2 + onestar * 1) / totalreviews).toFixed(1);
  const { fullStars, halfStar, emptyStars } = getStars(rating);
  const calculatePercentage = (count) => ((count / totalreviews) * 100).toFixed(2);


  const getReviewStars = (ratings) => {
    const fullReviewStars = Math.floor(ratings);
    const decimalPart = ratings % 1;
    const halfReviewStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
    const adjustedFullReviewStars = decimalPart >= 0.75 ? fullReviewStars + 1 : fullReviewStars;
    const emptyReviewStars = 5 - adjustedFullReviewStars - halfReviewStar;
    return { fullReviewStars: adjustedFullReviewStars, halfReviewStar, emptyReviewStars };
  };



  //reviews & question forms
  const showReviewForm = () => {
    setShowReview((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => {
          const formElement = document.getElementById('reviewForm');
          if (formElement) {
            const currentScrollY = window.scrollY || window.pageYOffset;
            const yOffset = -130;
            const yPosition = formElement.getBoundingClientRect().top + currentScrollY + yOffset;
            window.scrollTo({ top: yPosition, behavior: 'smooth' });
          }
        }, 100);
      }
      return newState;
    });
  };
  const showQuestionForm = () => {
    setShowQuestion((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => {
          const formElement = document.getElementById('questionForm');
          if (formElement) {
            const currentScrollY = window.scrollY || window.pageYOffset;
            const yOffset = -130;
            const yPosition = formElement.getBoundingClientRect().top + currentScrollY + yOffset;
            window.scrollTo({ top: yPosition, behavior: 'smooth' });
          }
        }, 100);
      }
      return newState;
    });
  };

  const [star, setStar] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleStarClick = (index) => {
    setStar(index + 1);
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uniqueFiles = files.filter(
      (file) => !reviewImages.some((img) => img.name === file.name)
    );
    const totalImagesAllowed = Math.max(2 - reviewImages.length, 0);
    const filesToAdd = uniqueFiles.slice(0, totalImagesAllowed);
    const previews = filesToAdd.map((file) => URL.createObjectURL(file));

    setReviewImages((prev) => [...prev, ...filesToAdd]);
    setPreviewImages((prev) => [...prev, ...previews]);
    if (files.length > filesToAdd.length) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> You can only upload up to 2 images.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    }
  };
  const handleDeleteImage = (index) => {
    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setReviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const reviewSubmit = (e) => {
    e.preventDefault();
    const reviewText = e.target.review.value;

    console.log(`Rating: ${star}`);
    console.log(`Review: ${reviewText}`);
    console.log(`Images: ${reviewImages.map((img) => img.name).join(', ')}`);
    console.log(reviewImages);

    setStar(0);
    setReviewImages([]);
    setPreviewImages([]);
    e.target.reset();
  };


  const questionSubmit = (e) => {
    e.preventDefault();
    const questionText = e.target.question.value;
    console.log(`Question: ${questionText}`);
  };


  //reviews and questions list toggle
  const [activeSection, setActiveSection] = useState("reviews");

  const handleToggle = (section) => {
    setActiveSection(section);
  };

  if (pdLoading) {
    return <p className="text">Loading product details...</p>
  }
  if (pdError) {
    return <p className="text">Error loading product details...</p>
  }


  return (
    <Fragment>
      <Helmet>
        <title>Product Details - Embrace Wellness, Naturally</title>
        <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
        <link rel="canonical" href="https://herbaljivan.netlify.app/product-details" />
      </Helmet>
      <div className='page flexcol center'>

        <section className='pdCont'>
          <article className="pdContImg">
            {images.length > 0 ? (
              <>
                <div className="slider-containerpd">
                  {transitions((style, i) => (
                    <animated.div className="slide" style={style}>
                      <img src={images[i]} alt={`Slide ${i}`} className="slide-imagepd" />
                    </animated.div>
                  ))}
                  <div className="arrows">
                    <span className="arrow left"><ArrowCircleLeftIcon onClick={handlePrev} /></span>
                    <span className="arrow right" ><ArrowCircleRightIcon onClick={handleNext} /></span>
                  </div>
                  <div className="dots">
                    {images.map((_, i) => (
                      <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                    ))}
                  </div>
                </div>
                <div className="smallImages">
                  {images.map((img, i) => (
                    <img key={i} src={img} alt={`image${i + 1}`} className={`smolImg ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
                  ))}
                </div>
              </>
            ) : (
              <div>No images available</div>
            )}
          </article>

          <article className='pdContDetail'>
            <h1 className='headingSmol'>{pDetails?.name}</h1>
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
              &nbsp;&nbsp;&nbsp;<span className="textBig">{rating}</span>
            </div>
            <div className='flexcol start-center'>
              <div className='flex center g10'>
                <p className='product-discounTwo'>Rs. {Number(ogPrice).toFixed(2)}₹</p>
                <p className='product-priceTwo'>Rs. {Number(price).toFixed(2)}₹</p>
                <div className='discount-iconTwo'>{discountPercentage.toFixed(0)}% OFF</div>
              </div>
              <p className="product-discounTwo" style={{ textDecoration: 'none' }}>Tax included.</p>
            </div>
            <div className="plusMinusCont">
              <div onClick={increase}><AddIcon /></div>
              <input type="number" value={quantity} onChange={handleQuantity} min={1} />
              <div onClick={decrease}><RemoveIcon /></div>
            </div>

            <div className="flex center g20">
              <button className='payBtn' onClick={() => (user ? addToCartHandler(id, quantity) : login())} disabled={isAdded || !inStock}>{isAdded ? 'Adding...' : 'Add to cart'}</button>
              <div className="stock" style={{ backgroundColor: inStock ? 'var(--codeFive)' : '#ff7979' }}>
                {inStock ? `In Stock` : 'Out of Stock'}
              </div>
            </div>

            <p className='textBig proDetext'>{pDetails?.info}{productDetail?.info}</p>
            <div className="pdFeatureIcons">
              <div><img src={freedelivery} alt="delivery" /><p className="text">Free Delivery</p></div>
              <div><img src={cod} alt="pay-on-delivery" /><p className="text">Pay on Delivery</p></div>
              <div><img src={returns} alt="returns" /><p className="text">Easy Returns</p></div>
              <div><img src={payment} alt="secure-payment" /><p className="text">Secure Payment</p></div>
            </div>
            <div className="flex end-start wh g15 estimated">
              <img src={delivery} alt="delivery" /> <p className='text'> Estimated Delivery: {formattedDeliveryStart} - {formattedDeliveryEnd} </p>
            </div>
          </article>
        </section>

        <section className='ratings'>
          <article><h1 className='heading'>Customer Reviews</h1></article>
          <article className='ratingCont'>

            <div className='ratingBox g5'>
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
            <div className='ratingBox g5'>
              <button className='payBtn' onClick={showReviewForm}>Write a review</button>
              <div className="text">OR</div>
              <button style={{ border: 'none' }} onClick={showQuestionForm}>Ask a question</button>
            </div>

          </article>
        </section>

        <form onSubmit={reviewSubmit} className={`reviewForm ${showReview ? 'visible' : 'hidden'}`} id="reviewForm">
          <h1 className='headingSmol'>Give your rating</h1>
          <div className="starContFour">
            {[...Array(5)].map((_, i) => (
              <span key={`rating-${i}`} className={i < star ? 'starFour' : 'dullStarFour'} onClick={() => handleStarClick(i)}>
                {i < star ? <StarIcon /> : <StarOutlineIcon />}
              </span>
            ))}
          </div>

          <h2 className='headingSmol'>Write a review</h2>
          <textarea name="review" style={{ border: '1px solid var(--codeThree)' }} placeholder="Write your review here..." rows="6" cols="50" />

          <label htmlFor="file-upload" className="upload-label">
            <UploadIcon />
            <span>Upload Images</span>
          </label>
          <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
          {previewImages && previewImages.length > 0 &&
            <div className="preview-container">
              {previewImages.map((image, index) => (
                <div className="preview-box" key={index}>
                  <img src={image} alt={`Preview ${index}`} className="preview-image" />
                  <span className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImage(index)} /></span>
                </div>
              ))}
            </div>
          }

          <button type='submit'>Submit</button>
        </form>

        <form onSubmit={questionSubmit} className={`questionForm ${showQuestion ? 'visible' : 'hidden'}`} id="questionForm">
          <h1 className='headingSmol'>Ask your question</h1>
          <textarea name="question" style={{ border: '1px solid var(--codeThree)' }} placeholder="Write your question here..." rows="6" cols="50" />
          <button type='submit'>Submit</button>
        </form>

        <section className='randqCont'>
          <div className="sortToggle">
            <div className="flex center g10">
              <button className={activeSection === "reviews" ? "toggleBtn active" : "toggleBtn"} onClick={() => handleToggle("reviews")}>Reviews</button>
              <button className={activeSection === "questions" ? "toggleBtn active" : "toggleBtn"} onClick={() => handleToggle("questions")}>Questions</button>
            </div>
            <select className={`reviewListSort ${activeSection === "reviews" ? "visible" : "hidden"}`} name="sort" id="sort">
              <option value="pictureonly">Pictures Only</option>
              <option value="high">Highest Rating</option>
              <option value="low">Lowest Rating</option>
            </select>
          </div>

          <article className={`reviewList ${activeSection === "reviews" ? "visible" : "hidden"}`}>
            {pDetails && pDetails.review && pDetails.review.length > 0 && pDetails.review.map((item, index) => {
              const { fullReviewStars, halfReviewStar, emptyReviewStars } = getReviewStars(item.rating);
              return (
                <div key={index} className="reviewBox">
                  <div className="starContFive">
                    {[...Array(fullReviewStars)].map((_, i) => (
                      <span key={`full-${i}`} className="starFive"><StarIcon /></span>
                    ))}
                    {halfReviewStar === 1 && (
                      <span className="starFive"><StarHalfIcon /></span>
                    )}
                    {[...Array(emptyReviewStars)].map((_, i) => (
                      <span key={`empty-${i}`} className="dullStarFive"><StarOutlineIcon /></span>
                    ))}
                  </div>
                  <div className="reviewprocont">
                    <AccountCircleIcon /> <p className="textBig">{item.reviewerName}</p>
                  </div>
                  <p className="text cap">{item.description}</p>
                  <div className="reviewImages">
                    {item.image1 &&  <img src={item.image1} alt={`Review-image ${index + 1}`} /> }
                    {item.image2 &&  <img src={item.image2} alt={`Review-image ${index + 1}`} /> }
                  </div>
                </div>
              )
            })}
          </article>

          <article className={`questionList ${activeSection === "questions" ? "visible" : "hidden"}`}>
            {pDetails && pDetails.question && pDetails.question.length > 0 && pDetails.question.map((item, index) => {
              return (
                <div key={index} className="questionBox">
                  <div className="questionprocont">
                    <AccountCircleIcon /> <p className="textBig">{item.username}</p>
                  </div>
                  <p className="text">{item.question}</p>
                  <div className="reply"><p className='textBig'>Herbal Jivan:</p> <p className="text">{item.answer ? `${item.answer}` : `No reply yet!`}</p></div>
                </div>
              )
            })}
          </article>
        </section>

        <section className="youlike">
          <article><h1 className='heading'>You May Also Like</h1></article>
          <Carousel />
        </section>

      </div>
    </Fragment>
  );
};

export default ProductDetails;