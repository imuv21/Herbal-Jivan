import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import CallIcon from '@mui/icons-material/Call';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';



const BulkOrder = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organizationName: '',
        minimumInvestment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const userData = {
                firstName: DOMPurify.sanitize(formValues.firstName),
                lastName: DOMPurify.sanitize(formValues.lastName),
                email: DOMPurify.sanitize(formValues.email),
                phone: DOMPurify.sanitize(formValues.phone),
                organizationName: DOMPurify.sanitize(formValues.organizationName),
                minimumInvestment: DOMPurify.sanitize(formValues.minimumInvestment),
            };
            toast(<div className='flex center g5'> < VerifiedIcon /> Form submitted!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error signing up...</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
        }
    }

    const whatsapp = () => {
       window.open('https://wa.me/+917004453015?text=Hii, I need to order in bulk ');
    }
    const gmail = () => {
        window.open('https://www.gmail.com/');
    };
    
    const gmap = () => {
        window.open('https://www.google.com/maps/place/Plot+no.+A-1/197,+Hastsal,+Uttam+Nagar,+Delhi,+India,+110059');
    };

    return (
        <Fragment>
            <Helmet>
                <title>Bulk Order | Herbal Jivan - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/bulk-order" />
            </Helmet>

            <section className='page flexcol center'>
                <div className="flexcol center wh g15">
                    <article><h1 className='heading'>Keep In Touch!</h1></article>
                    <p className='text' style={{ color: 'var(--codeThree)' }}>Please call us at the number below or submit your gifting enquiry and we will get in touch with you shortly.</p>
                </div>

                <div className="conCont">
                    <div className="canCard">
                        <CallIcon />
                        <p className="text">Feel free to give us a call</p>
                        <p className="text" style={{ color: 'var(--codeThree)' }}>+91-7004453015</p>
                        <button onClick={whatsapp}>Whatsapp</button>
                    </div>
                    <div className="canCard">
                        <EmailIcon />
                        <p className="text">Email Address</p>
                        <p className="text" style={{ color: 'var(--codeThree)' }}>herbalscience28@gmail.com</p>
                        <button onClick={gmail}>Email</button>
                    </div>
                    <div className="canCard">
                        <BusinessIcon />
                        <p className="text">Address</p>
                        <p className="text" style={{ color: 'var(--codeThree)' }}>Plot no. A-1/197,Hastsal, Uttam Nagar, Delhi, India, 110059</p>
                        <button onClick={gmap}>Get Direction</button>
                    </div>
                </div>

                <form className="bulkOrder" onSubmit={handleSubmit}>
                    <article className='flex center-start wh'><h1 className='heading'>Bulk Order Inquiry</h1></article>
                    <div className="flexcol start-center wh g10">
                        <p className="text">We are accepting all bulk Inquiries for our range of products.</p>
                        <p className="text" style={{ color: 'var(--codeThree)' }}>Note : Only fully filled/complete applications will be considered for further processing. Please fill the form with correct personal and business details to get a response from us</p>
                    </div>

                    <div className="inputCont">
                        <div className="inputCol">
                            <p className="text">Your Name</p>
                            <input type="text" name="firstName" autoComplete="given-name" placeholder="Enter your first name..." value={formValues.firstName} onChange={handleChange} required />
                        </div>
                        <div className="inputCol">
                            <p className="text">Last Name</p>
                            <input type="text" name="lastName" autoComplete="family-name" placeholder="Enter your last name..." value={formValues.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="inputCont">
                        <div className="inputCol">
                            <p className="text">Phone</p>
                            <input type="text" name="phone" autoComplete="tel" placeholder="Enter your number" value={formValues.phone} onChange={handleChange} required />
                        </div>
                        <div className="inputCol">
                            <p className="text">Email</p>
                            <input type="email" name="email" autoComplete="email" placeholder="Enter your email" value={formValues.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="inputCont">
                        <div className="inputCol">
                            <p className="text">Organization Name</p>
                            <input type="text" name="organizationName" placeholder="Enter your organization name" value={formValues.organizationName} onChange={handleChange} required />
                        </div>
                        <div className="inputCol">
                            <p className="text">Minimum Investment</p>
                            <input type="text" name="minimumInvestment" placeholder="Enter your minimum investment" value={formValues.minimumInvestment} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </form>
            </section>
        </Fragment>
    )
}

export default BulkOrder