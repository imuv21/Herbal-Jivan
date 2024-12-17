import React, { useState, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const AddAdmin = () => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const productSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (reviewImages.length < 2) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> You have to upload at least 2 images.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target);
            const productData = {
                adminName: formData.get('adminName'),
                adminPassword: formData.get('adminPassword'),
            };
            const sanData = {
                adminName: DOMPurify.sanitize(productData.adminName),
                adminPassword: DOMPurify.sanitize(productData.adminPassword),
            };
            console.log("Submitted Product Data:", sanData);
            toast(<div className='flex center g5'> < VerifiedIcon /> Product submitted successfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setReviewImages([]);
            setPreviewImages([]);
            e.target.reset();
            setIsSubmitting(false);
        }
    };

    const back = () => {
        navigate('/dashboard/role-management');
    }


    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Add New Admin</h1>
            </div>

            <form onSubmit={productSubmit} className='productForm'>

                <div className="flexcol g10 start-center wh">
                    <p className="text">Admin Name</p>
                    <input type="text" name='adminName' placeholder='Enter admin name' required />
                </div>
                <div className="flexcol g10 start-center wh relative passwordAdmin">
                    <p className="text">Admin Password</p>
                    <input type={passwordVisible ? "text" : "password"} className='wh' name='adminPassword' autoComplete="new-password" placeholder='Enter admin password...' required />
                    <span onClick={togglePasswordVisibility}>
                        {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </span>
                </div>

                <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </form>

        </Fragment>
    )
}

export default AddAdmin