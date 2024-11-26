import './Header.scss';
import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../slices/authSlice';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/images/tempLogo.png';


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const logout = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(logoutUser()).unwrap();
            toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error logging out...</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            navigate('/login');
        }
    }

    useEffect(() => {
        const navbarMenu = document.getElementById("menu");
        const burgerMenu = document.getElementById("burger");
        const headerMenu = document.getElementById("header");

        const handleBurgerClick = () => {
            burgerMenu.classList.toggle("is-active");
            navbarMenu.classList.toggle("is-active");
        };

        const handleLinkClick = () => {
            burgerMenu.classList.remove("is-active");
            navbarMenu.classList.remove("is-active");
        };

        const handleScroll = () => {
            if (window.scrollY >= 85) {
                headerMenu.classList.add("on-scroll");
            } else {
                headerMenu.classList.remove("on-scroll");
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 768 && navbarMenu.classList.contains("is-active")) {
                navbarMenu.classList.remove("is-active");
            }
        };

        burgerMenu.addEventListener("click", handleBurgerClick);

        document.querySelectorAll(".menu-link").forEach((link) => {
            link.addEventListener("click", handleLinkClick);
        });

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            burgerMenu.removeEventListener("click", handleBurgerClick);
            document.querySelectorAll(".menu-link").forEach((link) => {
                link.removeEventListener("click", handleLinkClick);
            });
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Fragment>
            <header className="header" id="header">
                <nav className="navbar">
                    <div className='headerBox'>
                        <div className="burger" id="burger">
                            <span className="burger-line"></span>
                            <span className="burger-line"></span>
                            <span className="burger-line"></span>
                        </div>
                        <a href="/" className="brand"><img src={logo} alt="Herbal Jivan" /></a>
                    </div>

                    <div className='searchCont'>
                        <input type="text" placeholder='Search products...' />
                        <SearchIcon />
                    </div>

                    <div className="menu" id="menu">
                        <ul className="menu-inner">
                            <li className="menu-item">
                                <a href="/cart" className="menu-link cartIcon">
                                    <ShoppingCartIcon />
                                    <div className='cartNum'>12</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="/profile" className="menu-link main-div" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <AccountCircleIcon className='header-icon' /> <KeyboardArrowDownIcon />
                                    <div className={`hover-div ${isHovered ? 'visible' : ''}`}>
                                        <a href='/profile' className='text'>Profile</a>
                                        <a href='/orders' className='text'>Orders</a>
                                        <a href="/contact-us" className='text'>Contact us</a>
                                        <a href="/about-us" className='text'>About us</a>
                                        <a onClick={logout} className='text'>Logout</a>
                                    </div>
                                </a>
                            </li>
                            <li className="menu-item mlink"><a href="/profile" className="menu-link">Profile</a></li>
                            <li className="menu-item mlink"><a href='/orders' className="menu-link">Orders</a></li>
                            <li className="menu-item mlink"><a href="/contact-us" className="menu-link">Contact us</a></li>
                            <li className="menu-item mlink"><a href="/about-us" className="menu-link">About us</a></li>
                            <li className="menu-item mlink"><a onClick={logout} className="menu-link">Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </Fragment>
    )
};

export default Header;