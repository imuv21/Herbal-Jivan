import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const ProductCard = ({ id, name, image, originalPrice, salePrice, ratings }) => {

    const navigate = useNavigate();
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

    const gotoEdit = (id, e) => {
        e.preventDefault();
        navigate(`/dashboard/edit-product/${id}`);
    }
    const see = (id, e) => {
        e.preventDefault();
        navigate(`/dashboard/product-list/product-details/${id}`)
    }

    return (
        <div className='show-img-detail-sub' >
            <img className='product-img-size' src={image} alt={`${name}`} />
            <div className="discount-icon">{discountPercentage.toFixed(0)}% OFF</div>
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
            </div>
            <div className="show-img-detail-sub-admin">
                <EditIcon style={{ color: 'var(--codeSix)' }} onClick={(e) => gotoEdit(id, e)} />
                <RemoveRedEyeIcon style={{ color: 'var(--codeThree)' }} onClick={(e) => see(id, e)} />
                <DeleteIcon />
            </div>
        </div>
    )
};

export default ProductCard