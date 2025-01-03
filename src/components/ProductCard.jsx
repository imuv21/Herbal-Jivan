import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import defaulImg from '../assets/images/defaultImage.jpg';


const ProductCard = ({ id, name, images, originalPrice, salePrice, ratings }) => {

    const discountPercentage = ((originalPrice - salePrice) / originalPrice) * 100;

    const getStars = (ratings) => {
        const numericRating = Number(ratings) || 0;
        const fullStars = Math.floor(numericRating);
        const decimalPart = numericRating % 1;
        const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
        const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
        const emptyStars = Math.max(5 - adjustedFullStars - halfStar, 0);
        return { fullStars: Math.min(adjustedFullStars, 5), halfStar, emptyStars };
    };
    const { fullStars, halfStar, emptyStars } = getStars(ratings);

    const imageToShow = (images && images.length > 0 && images[1]?.imageUrl) ? images[1].imageUrl : defaulImg;

    return (
        <a className='show-img-detail-sub' href={`/product-details/${id}`}>
            <img className='product-img-size' src={imageToShow} alt={`${name}`} />
            <div className="discount-icon">{discountPercentage.toFixed(0)}% OFF</div>
            <div className='product-detail-info'>
                <div className="starCont">
                    {[...Array(fullStars || 0)].map((_, i) => (
                        <span key={`full-${i}`} className="star"><StarIcon /></span>
                    ))}
                    {halfStar === 1 && (
                        <span className="star"><StarHalfIcon /></span>
                    )}
                    {[...Array(emptyStars || 0)].map((_, i) => (
                        <span key={`empty-${i}`} className="dullStar"><StarOutlineIcon /></span>
                    ))}
                    &nbsp;&nbsp;<span className="textBig">{ratings}</span>
                </div>
                <p className='product-title'>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</p>
                <div className='flex' style={{ gap: '10px' }}>
                    <p className='product-discount'>Rs. {Number(originalPrice).toFixed(2)}₹</p>
                    <p className='product-price'>Rs. {Number(salePrice).toFixed(2)}₹</p>
                </div>
                <button className='applyBtn'><AddShoppingCartIcon />Add to cart</button>
            </div>
        </a>
    )
};

export default ProductCard