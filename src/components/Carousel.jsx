import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sliders from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchProducts } from '../slices/productSlice';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Loader from './Loader/Loader';

const ProductCard = lazy(() => import('./ProductCard'));


const Carousel = () => {

    const dispatch = useDispatch();
    const { products, getProLoading, getProError } = useSelector((state) => state.product);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        dispatch(fetchProducts({ page, size }));
    }, [dispatch, page, size]);

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1', right: '0%' }} onClick={onClick}>
                <ChevronRightIcon />
            </div>
        );
    };
    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '1' }} onClick={onClick}>
                <ChevronLeftIcon />
            </div>
        );
    };
    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 7,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: null,
                    prevArrow: null,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: null,
                    prevArrow: null,
                },
            },
        ],
    };

    return (
        <div className={`product-slider-cont`}>
            <Sliders {...settings}>
                {getProLoading && <p className="text">Loading products...</p>}
                {getProError && <p className="text">Error loading products...</p>}
                {!getProLoading && !getProError && Array.isArray(products) && products.map((pro) => (
                    <div className='show-img-detail-sup' key={pro.productId}>
                        <Suspense fallback={<Loader />}>
                            <ProductCard name={pro.name} id={pro.productId} images={pro.images} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                        </Suspense>
                    </div>
                ))}
            </Sliders>
        </div>
    );
};

export default Carousel;