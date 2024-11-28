import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


const BuyMoreCard = ({ id, name, image, originalPrice, salePrice, ratings }) => {
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
        <a href={`/product-details/${id}`} >
            <div className='flex start g15 mt-3'>
                <img width={'80px'} src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg" alt={`${name}`} />
                <div className='product-detail-info'>
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
                    <p className='product-title'>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</p>
                    <div className='flex' style={{ gap: '10px' }}>
                        <p className='product-discount'>Rs. {Number(originalPrice).toFixed(2)}₹</p>
                        <p className='product-price'>Rs. {Number(salePrice).toFixed(2)}₹</p>
                    </div>
                    <button><AddShoppingCartIcon />Add to cart</button>
                </div>
            </div>
        </a>
    )
}

export default BuyMoreCard