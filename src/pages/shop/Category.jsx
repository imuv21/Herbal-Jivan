import React, { Fragment, lazy, Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../assets/schemas';
import Loader from '../../components/Loader/Loader';
import defaulImg from '../../assets/images/defaultImage.jpg';
const ProductCard = lazy(() => import('../../components/ProductCard'));

const Category = () => {

    const [categoryParams] = useSearchParams();
    const categoryName = categoryParams.get('query');
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;
    const total_results = products?.length;
    const total_pages = Math.ceil(total_results / pageSize);

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= total_pages) {
            setCurrentPage(newPage);
        }
    };
    const paginatedItems = products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Fragment>
            <Helmet>
                <title>Category | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/category" />
            </Helmet>

            <section className='page flexcol center'>

                <div className="sortCat">
                    <h1 className="heading">{categoryName}</h1>
                    <select name="sort">
                        <option value="featured">Featured</option>
                        <option value="bestselling">Best Selling</option>
                        <option value="atoz">Alphabetically A to Z</option>
                        <option value="ztoa">Alphabetically Z to A</option>
                        <option value="atoz">Price High to Low</option>
                        <option value="atoz">Price Low to High</option>
                    </select>
                </div>

                <div className="categoryGrid">
                    {paginatedItems && paginatedItems.length > 0 && paginatedItems.map((pro) => (
                        <Fragment key={pro.productId}>
                            <Suspense fallback={<Loader />}>
                                <ProductCard name={pro.name} id={pro.productId} image={pro.image ? pro.image : defaulImg} ratings={pro.ratings} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                            </Suspense>
                        </Fragment>
                    ))}
                </div>

                {total_results > pageSize && (
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                        <span>{`Page ${currentPage} of ${total_pages}`}</span>
                        <button disabled={currentPage === total_pages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                )}
            </section>
        </Fragment>
    );
};

export default Category;