import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { forgotPassword, clearErrors, setEmailData } from '../../slices/authSlice';
import DOMPurify from 'dompurify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const NewPassword = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fopaError } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({ username: '', password: '', confirmPassword: '' });

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
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    dispatch(clearErrors());
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formValues.password !== formValues.confirmPassword) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Passwords do not match.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      return;
    }
    setIsSubmitting(true);

    try {
      const sanitizedFormValues = {
        username: DOMPurify.sanitize(formValues.username),
        password: DOMPurify.sanitize(formValues.password),
      };
      const response = await dispatch(forgotPassword(sanitizedFormValues)).unwrap();
      if (response.status === true) {

        dispatch(setEmailData({ email: sanitizedFormValues.username }));

        toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        navigate('/verify-password');
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon /> {response.data || response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <Fragment>
      <Helmet>
        <title>New Password | Herbal Jivan - Embrace Wellness, Naturally</title>
        <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
        <link rel="canonical" href="https://herbaljivan.netlify.app/new-password" />
      </Helmet>
      <div className='page flex center' style={{ height: '100vh', backgroundColor: 'var(--authCode)' }}>
        <form className="authBox flexcol center" onSubmit={handleLogin}>
          <h1 className="heading">Create New Password</h1>

          <input type="email" name='username' autoComplete='email' placeholder='Enter your email...' value={formValues.username} onChange={handleChange} required />

          <div className="wh relative password">
            <input type={passwordVisible ? "text" : "password"} className='wh' name='password' autoComplete="new-password" placeholder='Enter new password...' value={formValues.password} onChange={handleChange} required />
            <span onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          <div className="wh relative password">
            <input type={conPasswordVisible ? "text" : "password"} className='wh' name='confirmPassword' autoComplete="off" placeholder='Confirm your password...' value={formValues.confirmPassword} onChange={handleChange} required />
            <span onClick={toggleConPasswordVisibility}>
              {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          <button type='submit' style={{ border: 'none', width: '100%' }} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
          <div className="minBox flexcol center">
            <p className="text"><Link className='text hover' to='/login'>Back to login</Link></p>
          </div>
        </form>
      </div>
    </Fragment>
  )
};

export default NewPassword;