import React, { Fragment, lazy, Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../../slices/searchSlice';
import Loader from '../../components/Loader/Loader';
const ProductCard = lazy(() => import('../../components/ProductCard'));


const Search = () => {

    const dispatch = useDispatch();
    const { products, totalItems, totalPages, numberOfElements, isFirst, isLast, hasNext, hasPrevious, getProLoading, getProError } = useSelector((state) => state.search);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState("PRICE_LOW_TO_HIGH");

    useEffect(() => {
        dispatch(searchProducts({ page, size, search: query, sort }));
    }, [dispatch, page, size, query, sort]);

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const getPageNumbers = (currentPage, totalPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 0) {
                endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);
            } else if (endPage === totalPages - 1) {
                startPage = Math.max(0, endPage - maxPageButtons + 1);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers(page, totalPages);


    return (
        <Fragment>
            <Helmet>
                <title>Search | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/search-results" />
            </Helmet>

            <section className='page flexcol center'>

                <div className="sortCat">
                    <div className="flexcol">
                        <h1 className="text">Search results for - {query}</h1>
                        <p className="text">Showing {numberOfElements} of {totalItems} products</p>
                    </div>
                    <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="PRICE_HIGH_TO_LOW">Price High to Low</option>
                        <option value="PRICE_LOW_TO_HIGH">Price Low to High</option>
                    </select>
                </div>

                <div className="categoryGrid">
                    {getProLoading && <p className="text">Loading products...</p>}
                    {getProError && <p className="text">Error loading products...</p>}
                    {!getProLoading && !getProError && products && products.length > 0 && products.map((pro) => (
                        <Fragment key={pro.productId}>
                            <Suspense fallback={<Loader />}>
                                <ProductCard name={pro.name} id={pro.productId} images={pro.image} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                            </Suspense>
                        </Fragment>
                    ))}
                </div>

                {!getProLoading && !getProError && totalItems > size && (
                    <div className="pagination">
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={isFirst}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPrevious}>
                                Previous
                            </button>
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            {pageNumbers.map(index => (
                                <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNext}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={isLast}>
                                Last Page
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </Fragment>
    );
};

export default Search;