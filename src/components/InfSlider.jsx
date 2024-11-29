import React from 'react'
import { infslider } from '../assets/schemas';
import LazyLoad from 'react-lazyload';
import defaultimg from '../assets/images/defaultImage.jpg';


const InfSlider = () => {

    return (
        <div className="slider-inf">
            <div className="slide_track-inf">
                {infslider.map((imageName, index) => (
                    <div className="slide-inf" key={index}>
                        <LazyLoad height={50} offset={100} placeholder={<img src={defaultimg} alt="Loading..." />}>
                            <img src={imageName} className="smallImage" alt={`image ${index + 1}`} loading="lazy" />
                        </LazyLoad>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfSlider