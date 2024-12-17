import React, { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ProductCard from '../components/ProductCard';
import { products } from '../../assets/schemas';
import defaulImg from '../../assets/images/defaultImage.jpg';


const Featured = () => {

    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClickFooter = (event) => {
        event.preventDefault();
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
    };

    const [formValues, setFormValues] = useState({
        productName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const userData = {
                productName: DOMPurify.sanitize(formValues.productName),
            };
            'const response = await dispatch(updateProfile(userData)).unwrap();'
            if ('response.status' === "success") {
                toast(<div className='flex center g5'> < VerifiedIcon /> {'response.message'}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {'response.message'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitted(false);
        }
    };

    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Featured Products</h1>
                <button onClick={handleClickFooter}>Add Featured Products</button>
            </article>
            <div className="adminGrid">
                {products && products.length > 0 && products.map((pro, index) => (
                    <Fragment key={index}>
                        <ProductCard name={pro.name} id={pro.productId} image={pro.image ? pro.image : defaulImg} ratings={pro.ratings} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                    </Fragment>
                ))}
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{ gap: '10px' }} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Add Featured Products</h2>
                            <div className="pageBox5 flexcol center">
                                <input type="text" name="productName" placeholder="Enter product name..." onChange={handleInputChange} required />
                            </div>
                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Updating...' : 'Update'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Featured