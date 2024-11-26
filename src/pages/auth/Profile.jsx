import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const Profile = () => {

    const dispatch = useDispatch();
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClickFooter = (event) => {
        event.preventDefault();
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
    }

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        interests: '',
    });
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('imdb') || name.includes('insta') || name.includes('twitter') || name.includes('spotify')) {
            const [platform, key] = name.split('.');
            setFormValues({
                ...formValues,
                links: {
                    ...formValues.links,
                    [platform]: {
                        ...formValues.links[platform],
                        [key]: type === 'checkbox' ? checked : value
                    }
                }
            });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
        dispatch(clearErrors());
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const userData = {
                firstName: DOMPurify.sanitize(formValues.firstName),
                lastName: DOMPurify.sanitize(formValues.lastName),
                interests: DOMPurify.sanitize(formValues.interests),
            };
            const response = await dispatch(updateProfile(userData)).unwrap();
            if (response.status === "success") {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitted(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isClickedFooter) {
                setIsClickedFooter(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isClickedFooter]);
    const truef = 1;


    return (
        <Fragment>
            <Helmet>
                <title>Profile | Herbal Jivan - Find Genuine Connections Today</title>
                <meta name="description" content="JustDate is a modern dating platform designed to help you meet real people seeking meaningful relationships. Join today and start connecting with like-minded individuals for friendship, romance, or commitment." />
                <link rel="canonical" href="https://justdate.netlify.app/profile" />
            </Helmet>

            <div className="page flex wh">
                <div className="profile">
                    <div className="subProfile">
                    <article><h1 className='headingBig' style={{ color: 'var(--codeSix)' }}>Profile</h1></article>
                        <div className="pagebox10 flexcol start-center">
                            <div className="pagebox20 flex center-space">
                                <p className="textBig">Name :</p>
                                <p className="textBig">John Snow</p>
                            </div>
                            <div className="pagebox20 flex center-space">
                                <p className="textBig">Email :</p>
                                <p className="textBig verify flex center-start g5">imuv21@gmail.com
                                    {truef === 1 ? <VerifiedIcon /> : <NewReleasesIcon style={{ color: 'orange' }} />}
                                </p>
                            </div>
                        </div>
                        <div className="pagebox20 flex center-start">
                            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                                <button onClick={handleClickFooter}>Edit Profile</button>
                                {isClickedFooter && (
                                    <div className="popup">
                                        <form className="popup-wrapper" onSubmit={handleSubmit}>
                                            <h2 className="heading" style={{ marginBottom: '15px' }}>Update Profile</h2>

                                            <div className="pagebox5 flexcol center">
                                                <input type="text" name='firstName' autoComplete="given-name" placeholder='Enter your first name...' value={formValues.firstName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="pagebox5 flexcol center">
                                                <input type="text" name='lastName' autoComplete="family-name" placeholder='Enter your last name...' value={formValues.lastName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="pagebox5 flexcol center">
                                                <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleInputChange} required />
                                            </div>

                                            <div className="flex center g20 wh" style={{ marginTop: '15px' }}>
                                                <button type='submit' disabled={isSubmitted}>{isSubmitted ? 'Updating...' : 'Update'}</button>
                                                <button type="button" onClick={closepopup} className="btn">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile