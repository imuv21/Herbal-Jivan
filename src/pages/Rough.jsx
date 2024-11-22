import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { images } from '../assets/schemas';

const Rough = () => {
    const [index, setIndex] = useState(0);
    const interval = 10000;

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
        <div className="slider-containerpd">
            {transitions((style, i) => (
                <animated.div className="slidepd" style={{ ...style, backgroundImage: `url(${images[i]})` }} />
            ))}
            <div className="arrows">
                <span className="arrow left" onClick={handlePrev}>&lt;</span>
                <span className="arrow right" onClick={handleNext}>&gt;</span>
            </div>
            <div className="dotspd">
                {images.map((_, i) => (
                    <span key={i} className={`dotpd ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                ))}
            </div>
        </div>
    );
};

export default Rough;
