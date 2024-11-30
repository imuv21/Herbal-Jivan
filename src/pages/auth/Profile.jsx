import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import EditIcon from '@mui/icons-material/Edit';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';


const Profile = () => {

    const dispatch = useDispatch();
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isClickedFooterTwo, setIsClickedFooterTwo] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClickFooter = (event) => {
        event.preventDefault();
        setIsClickedFooter(true);
    };
    const handleClickFooterTwo = (event) => {
        event.preventDefault();
        setIsClickedFooterTwo(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setIsClickedFooterTwo(false);
    }

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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

    const [addressValues, setAddressValues] = useState({
        address: '',
        landmark: '',
        city: '',
        pincode: '',
        number: '',
        default: false,
    });

    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressValues({
            ...addressValues, [name]: type === 'checkbox' ? checked : value,
        });
        dispatch(clearErrors());
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isClickedFooter || isClickedFooterTwo) {
                setIsClickedFooter(false);
                setIsClickedFooterTwo(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isClickedFooter, isClickedFooterTwo]);
    const truef = 1;


    return (
        <Fragment>
            <Helmet>
                <title>Profile | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/profile" />
            </Helmet>

            <div className="page flexcol wh">
                <article><h1 className='heading'>Profile</h1></article>
                <div className="profile">
                    <div className="flex verify center-start g5">
                        <p className="name">John Snow</p> <EditIcon style={{ cursor: 'pointer' }} onClick={handleClickFooter} />
                    </div>
                    <div className="flexcol start-center">
                        <p className="text" style={{ color: 'var(--codeThree)' }}>Email</p>
                        <p className="text verify flex center-start g5" >imuv21@gmail.com
                            {truef === 1 ? <VerifiedIcon /> : <NewReleasesIcon style={{ color: 'orange' }} />}
                        </p>
                    </div>
                </div>

                <div className="profile">
                    <div className="flex verify center-start g5">
                        <p className="name">Addresses</p> <AddLocationAltIcon style={{ cursor: 'pointer' }} onClick={handleClickFooterTwo} />
                    </div>
                    <div className="addresses">
                        <div className="addressCard">
                            <div className="flex center-space wh">
                                <p className="text" style={{ color: '#565656' }}>Default address</p>  <EditIcon style={{ cursor: 'pointer' }} onClick={handleClickFooterTwo} />
                            </div>
                            <p className="text">Jayants PG, Parathe wali galiNear Amity University, Sector 126, 201301, Noida, Uttar Pradesh, India</p>
                        </div>
                        <div className="addressCard">
                            <div className="flex center-space wh">
                                <p className="text" style={{ color: '#565656' }}>Address 2</p>  <EditIcon style={{ cursor: 'pointer' }} onClick={handleClickFooterTwo} />
                            </div>
                            <p className="text">Jayants PG, Parathe wali galiNear Amity University, Sector 126, 201301, Noida, Uttar Pradesh, India</p>
                        </div>
                        <div className="addressCard">
                            <div className="flex center-space wh">
                                <p className="text" style={{ color: '#565656' }}>Address 3</p>  <EditIcon style={{ cursor: 'pointer' }} onClick={handleClickFooterTwo} />
                            </div>
                            <p className="text">Jayants PG, Parathe wali galiNear Amity University, Sector 126, 201301, Noida, Uttar Pradesh, India</p>
                        </div>
                    </div>
                </div>

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={handleSubmit}>
                                <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Update Profile</h2>

                                <div className="pageBox5 flexcol center">
                                    <input type="text" name='firstName' autoComplete="given-name" placeholder='Enter your first name...' value={formValues.firstName} onChange={handleInputChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name='lastName' autoComplete="family-name" placeholder='Enter your last name...' value={formValues.lastName} onChange={handleInputChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleInputChange} required />
                                </div>

                                <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                    <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Updating...' : 'Update'}</button>
                                    <button type="button" className="applyBtn" onClick={closepopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`popup-btn ${isClickedFooterTwo ? 'clicked' : ''}`}>
                    {isClickedFooterTwo && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={handleSubmit}>
                                <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Add Address</h2>

                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="address" autoComplete="street-address" placeholder="Enter your address..." value={addressValues.address} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="landmark" autoComplete="off" placeholder="Enter any landmark (optional)..." value={addressValues.landmark} onChange={handleAddressChange} />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="city" autoComplete="address-level2" placeholder="Enter your city..." value={addressValues.city} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="pincode" autoComplete="postal-code" placeholder="Enter your pincode..." value={addressValues.pincode} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="number" autoComplete="tel" placeholder="Enter your number..." value={addressValues.number} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flex center-start" style={{ marginTop: '5px' }}>
                                    <input type="checkbox" name='default' checked={addressValues.default} onChange={handleAddressChange} /> <div className="text">Make it default address</div>
                                </div>

                                <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                    <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Updating...' : 'Update'}</button>
                                    <button type="button" className="applyBtn" onClick={closepopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default Profile