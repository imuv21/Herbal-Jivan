import React from 'react'

const SmallCard = ({ id, name, image, salePrice }) => {
    return (
        <a className="smallCard" href={`/product-details/${id}`}>
            <img src={image} alt={`${name}`} />
            <div className='smallCardDetail'>
                <p className='product-title'>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</p>
                <p className='product-price'>Rs. {Number(salePrice).toFixed(2)}₹</p>
            </div>
        </a>
    )
}

export default SmallCard