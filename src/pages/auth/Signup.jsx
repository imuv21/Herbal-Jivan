import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { signupUser, clearErrors, setSignupData } from '../../slices/authSlice';
import DOMPurify from 'dompurify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signErrors } = useSelector((state) => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [conPasswordVisible, setConPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConPasswordVisibility = () => {
        setConPasswordVisible(!conPasswordVisible);
    };

    //handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        dispatch(clearErrors());
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (formValues.password !== formValues.confirmPassword) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Passwords do not match.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        setIsSubmitting(true);

        try {
            const userData = {
                firstname: DOMPurify.sanitize(formValues.firstname),
                lastname: DOMPurify.sanitize(formValues.lastname),
                email: DOMPurify.sanitize(formValues.email),
                password: DOMPurify.sanitize(formValues.password),
            };
            const response = await dispatch(signupUser(userData)).unwrap();
            if (response.status === true) {

                dispatch(setSignupData({
                    email: userData.email,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    password: userData.password,
                }));

                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                navigate('/verify-otp');
            }
        } catch (error) {
            console.log(signErrors);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error signing up...</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        dispatch(clearErrors());
    }, [dispatch]);

    return (
        <Fragment>
            <Helmet>
                <title>Signup | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/signup" />
            </Helmet>
            <div className='page flex center' style={{ height: '100vh', backgroundColor: 'var(--authCode)' }}>
                <form className="authBox flexcol center" onSubmit={handleSignup}>
                    <h1 className="heading">Create your account</h1>

                    <div className="minBox flexcol center">
                        <input type="text" name='firstname' autoComplete="given-name" placeholder='Enter your first name...' value={formValues.firstname} onChange={handleChange} required />
                    </div>
                    <div className="minBox flexcol center">
                        <input type="text" name='lastname' autoComplete="family-name" placeholder='Enter your last name...' value={formValues.lastname} onChange={handleChange} required />
                    </div>
                    <div className="minBox flexcol center">
                        <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleChange} required />
                    </div>
                    {signErrors?.email && <p className="error flex center-start">{signErrors.email}</p>}
                    <div className="minBox flexcol center">
                        <div className="wh relative password">
                            <input type={passwordVisible ? "text" : "password"} style={{ textTransform: 'none' }} className='wh' name='password' autoComplete="new-password" placeholder='Enter your password...' value={formValues.password} onChange={handleChange} required />
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                        </div>
                    </div>
                    <div className="minBox flexcol center">
                        <div className="wh relative password">
                            <input type={conPasswordVisible ? "text" : "password"} style={{ textTransform: 'none' }} className='wh' name="confirmPassword" autoComplete="new-password" placeholder='Enter your password again...' value={formValues.confirmPassword} onChange={handleChange} required />
                            <span onClick={toggleConPasswordVisibility}>
                                {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                        </div>
                    </div>
                    <button type='submit' style={{ border: 'none', width: '100%' }} disabled={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Signup'}</button>
                    {signErrors?.length > 0 && <p className="error flex center">Please correct the above errors.</p>}
                    <p className="text">Already have an account? <Link className='text hover' to='/login'>Click here</Link></p>
                </form>
            </div>
        </Fragment>
    )
};

export default Signup;