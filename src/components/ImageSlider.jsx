import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';


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

    return (
        <div className="slider-container">
            {transitions((style, i) => (
                <animated.div className="slide" style={{ ...style, backgroundImage: `url(${images[i]})` }} />
            ))}
            <div className="dots">
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === index ? 'active' : ''}`}
                        onClick={() => setIndex(i)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
