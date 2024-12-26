import React, { useState, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { accordionData } from '../../assets/schemas';
import { logout } from '../../slices/authSlice';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VerifiedIcon from '@mui/icons-material/Verified';
import logo from '../../assets/images/logo.jpeg';



const Dashboard = () => {

    const dispatch = useDispatch();
    const [activeBrick, setActiveBrick] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [isLogout, setIsLogout] = useState(false);
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

    const logoutHandler = (e) => {
        e.preventDefault();
        if (isLogout) return;
        setIsLogout(true);
        dispatch(logout());
        toast(<div className='flex center g5'> < VerifiedIcon /> Successfully logged out!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        setIsLogout(false);
        navigate('/admin/login');
    };



    return (
        <section className="dashboard">

            <div className="accordion">
                <div className='accordionCover'>
                    <div className="admin-logo">
                        <img src={logo} alt="logo" />
                    </div>
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

                <button onClick={logoutHandler} className='logoutBtn' disabled={isLogout}>{isLogout ? `Loging out...` : `Logout`} <ExitToAppIcon /></button>
            </div>

            <div className="adminPage">
                <Outlet />
            </div>

        </section>
    );
};

export default Dashboard