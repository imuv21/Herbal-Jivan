import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { verifyPassword, clearErrors } from '../../slices/authSlice';
import { toast } from 'react-hot-toast';

import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { emailData, vepaError } = useSelector((state) => state.auth);

    // Focus management
    const otpInputs = useRef([]);
    const focusNextInput = currentIndex => {
        if (currentIndex < otpInputs.current.length - 1) {
            otpInputs.current[currentIndex + 1].focus();
        }
    };
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));

    const handleInputChange = async (index, newValue) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = newValue;
        setOtpDigits(newOtpDigits);
        if (newValue !== '' && index < otpDigits.length - 1) {
            focusNextInput(index);
        }
        const isOtpComplete = newOtpDigits.every(digit => digit !== '');

        if (isOtpComplete) {
            try {
                const otpResponse = await dispatch(verifyPassword({ otp: newOtpDigits.join(''), username: emailData.email })).unwrap();

                if (otpResponse.status === true) {
                    toast(<div className='flex center g5'> < VerifiedIcon />  Password updated successfully.</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                    navigate('/login');
                } else {
                    toast(<div className='flex center g5'> < NewReleasesIcon /> OTP verification failed!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                }
            } catch (error) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> OTP verification failed!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            e.preventDefault();
            if (index > 0) {
                otpInputs.current[index - 1].focus();
            }
        } else if (/^\d$/.test(e.key)) {
            e.preventDefault();
            handleInputChange(index, e.key);
            focusNextInput(index);
        }
    };
    useEffect(() => {
        otpInputs.current[0].focus();
    }, []);


    return (
        <Fragment>
            <Helmet>
                <title>Verify Password | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/verify-password" />
            </Helmet>

            <div className='page flex center' style={{ height: '100vh', backgroundColor: 'var(--authCode)' }}>
                <div className="authBox flexcol center" style={{ gap: '30px' }}>
                    <h1 className="heading">Enter the OTP sent to your email</h1>

                    <div className="flex center g20">
                        {otpDigits.map((digit, index) => (
                            <input key={index} value={digit} maxLength={1} style={{ width: '50px' }}
                                ref={el => (otpInputs.current[index] = el)}
                                onChange={e => handleInputChange(index, e.target.value)}
                                onKeyDown={e => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    <div className='flexcol center g10'>
                        <Link to="/new-password" className='hover'>Back</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword