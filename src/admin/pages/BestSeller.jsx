import React, { Fragment } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../../assets/schemas';
import defaulImg from '../../assets/images/defaultImage.jpg';


const BestSeller = () => {
    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Best Seller Products</h1>
                <select name="sort">
                    <option value="atoz">High to Low</option>
                    <option value="atoz">Low to High</option>
                </select>
            </article>
            <div className="adminGrid">
                {products && products.length > 0 && products.map((pro, index) => (
                    <Fragment key={index}>
                        <ProductCard name={pro.name} id={pro.productId} image={pro.image ? pro.image : defaulImg} ratings={pro.ratings} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                    </Fragment>
                ))}
            </div>
        </Fragment>
    )
}

export default BestSeller