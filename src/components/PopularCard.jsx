import React from 'react';
import popularImage from '../assets/images/Plump-Skin.png';
import pithree from '../assets/images/tablettwo.png';


const PopularCard = () => {
    return (
        <div className='popular-card-wrapper custom-scroll'>

            <a href=""> <img src={popularImage} alt="imageone" /></a>

            <a href=""> <img src={pithree} alt="imagetwo" /></a>

        </div>
    )
}

export default PopularCard