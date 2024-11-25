import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const ImageSlider = ({ images, interval }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 },
    });

    const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
    const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

    return (
        <div className="slider-container">
            {transitions((style, i) => (
                <animated.div className="slide" style={style}>
                    <img src={images[i]} alt={`Slide ${i}`} className="slide-image" />
                </animated.div>
            ))}
            <div className="arrows">
                <span className="arrow left"><ArrowCircleLeftIcon onClick={handlePrev} /></span>
                <span className="arrow right" ><ArrowCircleRightIcon onClick={handleNext} /></span>
            </div>
            <div className="dots">
                {images.map((_, i) => (
                    <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
