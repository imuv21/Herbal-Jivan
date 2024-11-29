import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { products } from '../../assets/schemas';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard';

// pagination mui
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';



const Search = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSerachQuery] = useState('')
    let { search } = useLocation();

    const queryValue = new URLSearchParams(search)
    const getQueryValue = queryValue.get('query')

    // pagination variables
    const totalProduct = products.length
    const limit = 8
    const PaginationBtn = Math.ceil(totalProduct / limit)
    const offset = (currentPage - 1) * limit

    useEffect(() => {
        setSerachQuery(getQueryValue)
    }, [getQueryValue])

    return (
        <Fragment>
            <Helmet>
                <title>Search Results | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/search-results" />
            </Helmet>
            <section className='page flexcol wh'>

                <div className='flex center mt-3 heading'>
                   Search results for "{searchQuery}"
                </div>

                <div className='search-con mt-3'>
                    {Array.isArray(products) && products.slice(offset, (offset * 1) + limit).map((pro) => (
                        <div className='show-img-detail-sup' key={pro.productId}>
                            <Suspense fallback={<Loader />}>
                                <ProductCard name={pro.name} id={pro.productId} image={pro.image ? pro.image : defaulImg} ratings={pro.ratings} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                            </Suspense>
                        </div>
                    ))}
                </div>

                {
                    limit !== totalProduct &&
                    (<div className='flex center mt-3'>
                        <Stack spacing={2}>
                            <Pagination count={PaginationBtn} onChange={(e, pageNumber) => setCurrentPage(pageNumber)} />
                        </Stack>
                    </div>)
                }
            </section>
        </Fragment>
    );
}

export default Search