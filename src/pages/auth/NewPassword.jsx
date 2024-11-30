import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { loginUser, clearErrors } from '../../slices/authSlice';
import DOMPurify from 'dompurify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const NewPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logError, logGenErrors } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({password: '', confirmPassword: ''});

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

  const getFieldError = (field) => Array.isArray(logError) ? logError.find(error => error.path === field) : null;
  const passwordError = getFieldError('password');
  const confirmPasswordError = getFieldError('confirmPassword');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (confirmPasswordError || passwordError || logGenErrors) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Please fix the errors in the form.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      return;
    }
    setIsSubmitting(true);

    try {
      const sanitizedFormValues = {
        confirmPasswordError: DOMPurify.sanitize(formValues.confirmPasswordError),
        password: DOMPurify.sanitize(formValues.password),
      };
      const response = await dispatch(loginUser(sanitizedFormValues)).unwrap();
      if (response.status === "success") {
        toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        navigate('/login');
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Error logging in...</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
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

          <div className="wh relative password">
            <input type={passwordVisible ? "text" : "password"} className='wh' name='password' autoComplete="new-password" placeholder='Enter new password...' value={formValues.password} onChange={handleChange} />
            <span onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          {passwordError && <p className="error">{passwordError.msg}</p>}

          <div className="wh relative password">
            <input type={conPasswordVisible ? "text" : "password"} className='wh' name='confirmPassword' autoComplete="off" placeholder='Confirm your password...' value={formValues.confirmPassword} onChange={handleChange} />
            <span onClick={toggleConPasswordVisibility}>
              {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          {passwordError && <p className="error">{passwordError.msg}</p>}

          <button type='submit' style={{ border: 'none', width: '100%'}} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
          {logError?.length > 0 && <p className="error flex center">Please correct the above errors.</p>}
          {logGenErrors && <p className="error flex center">{logGenErrors}</p>}
          <div className="minBox flexcol center">
            <p className="text"><Link className='text hover' to='/login'>Back to login</Link></p>
          </div>
        </form>
      </div>
    </Fragment>
  )
};

export default NewPassword;