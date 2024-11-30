import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import tempimg from '../assets/images/korean-ginseng.webp';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ProductCardList = ({ id, name, image, originalPrice, salePrice, ratings }) => {

    const discountPercentage = ((originalPrice - salePrice) / originalPrice) * 100;
    const getStars = (ratings) => {
        const fullStars = Math.floor(ratings);
        const decimalPart = ratings % 1;
        const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
        const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
        const emptyStars = 5 - adjustedFullStars - halfStar;
        return { fullStars: adjustedFullStars, halfStar, emptyStars };
    };
    const { fullStars, halfStar, emptyStars } = getStars(ratings);

    return (
        <a className='productList' href={`/product-details/${id}`} style={{ position: 'relative' }}>

            <div>
                <img className='w-100' src={tempimg} alt={`${name}`} />
            </div>

            <div className="discount-icon">{discountPercentage.toFixed(0)}% OFF</div>

            <div className='product-detail-info'>
                <p className='headingSmol'>{name}</p>

                <div className="starCont">
                    {[...Array(fullStars)].map((_, i) => (
                        <span key={`full-${i}`} className="star"><StarIcon /></span>
                    ))}
                    {halfStar === 1 && (
                        <span className="star"><StarHalfIcon /></span>
                    )}
                    {[...Array(emptyStars)].map((_, i) => (
                        <span key={`empty-${i}`} className="dullStar"><StarOutlineIcon /></span>
                    ))}
                    &nbsp;&nbsp;<span className="textBig">{ratings}</span>
                </div>

                <div className='flex' style={{ gap: '10px' }}>
                    <p className='product-discount'>Rs. {Number(originalPrice).toFixed(2)}₹</p>
                    <p className='product-price'>Rs. {Number(salePrice).toFixed(2)}₹</p>
                </div>

                <button className='mt-2'><AddShoppingCartIcon />Add to cart</button>
            </div>
        </a>
    )
};

export default ProductCardList