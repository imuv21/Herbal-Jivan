import React, { useState, useRef, Fragment } from 'react';
import { accordionData } from '../../assets/schemas';
import { useNavigate, Outlet } from 'react-router-dom';
import logo from '../../assets/images/tempLogo.png';

const Dashboard = () => {


    const [activeBrick, setActiveBrick] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            contentRefs.current[index].style.maxHeight = '';
            setActiveIndex(null);
        } else {
            contentRefs.current.forEach((ref, i) => {
                if (i === index) {
                    ref.style.maxHeight = ref.scrollHeight + 'px';
                } else {
                    ref.style.maxHeight = '';
                }
            });
            setActiveIndex(index);
        }
    };

    const handleBrickClick = (brickName, route) => {
        setActiveBrick(brickName);
        navigate(route);
    };


    return (
        <section className="dashboard">

            <div className="accordion">
                <div className='accordionCover'>
                    {accordionData.map((accordion, index) => (
                        <div className="accordion__item" key={index}>

                            <div className={`accordion__header ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                                <div className="textBig">{accordion.header}</div>
                            </div>

                            <div className="accordion__content" ref={(el) => (contentRefs.current[index] = el)}>
                                <div className="brickCover">
                                    {accordion.bricks.map((brick, brickIndex) => (
                                        <div key={brickIndex} className={`brick ${activeBrick === brick.name ? 'active' : ''}`} onClick={() => handleBrickClick(brick.name, brick.route)}>
                                            <img src={brick.icon ? brick.icon : ""} alt="icon" /> {brick.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="admin-logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>

            <div className="anyPage">
                <Outlet />
            </div>

        </section>
    );
};

export default Dashboard