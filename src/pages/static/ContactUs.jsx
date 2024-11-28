import React, { useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';


const ContactUs = () => {
    
    const [contactUs, setContactUs] = useState({
        name: '',
        email: '',
        message: ''
    })
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactUs((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleContact = (e) => {
        e.preventDefault()
        console.log('Contact us form is submitted', contactUs)
        setContactUs({
            name: '',
            email: '',
            message: ''
        })
    }

    return (
        <div className='page'>

            <p className='contact-us-title mt-3'>Contact</p>
            <div className='contact-us-wrapper mt-3'>
                <div className='contact-us-input-con'>
                    <div className='para-4 col-pri'>Get in Touch with Us!</div>
                    <div className=' text mt'>We can assist with orders, product queries, or anything else you need.</div>
                    <form onSubmit={handleContact} className='mt-2'>
                        <div className='footer-flex-3 mt'>
                            <input type='text' placeholder='Name' name='name' value={contactUs.name} onChange={handleContactChange} />
                            <input type='email' placeholder='Email' name='email' value={contactUs.email} onChange={handleContactChange} />
                        </div>
                        <div className='mt-2'>
                            <textarea className='message-box-text' name='message' value={contactUs.message} placeholder='Message here' onChange={handleContactChange} />
                        </div>
                        <button type='submit' className='mt-2'>Submit</button>
                    </form>
                </div>
                <div className='flexcol g15 mt-3'>
                    <div className=''>
                        <h3 className='contactustext'>Address</h3>
                        <p className='textBig mt'>Corporate add-A-1/197,HASTSAL ROAD ,UTTAM NAGAR
                            DELHI -110059</p>
                        <p className='textBig mt'>Company Name:  <span className='textBig fw-600'>HERBAL SCIENCE</span>  </p>
                    </div>
                    <div className='mt'>
                        <h3 className='contactustext'>Contact</h3>
                        <p className='textBig mt flex flex center-start g10'><LocalPhoneIcon />: 9599896554</p>
                        <p className='textBig mt flex center-start g10'><EmailIcon /> : herbalscience28@gmail.com</p>
                    </div>
                    <div className='mt'>
                        <h3 className='contactustext'>Follow on Social Media</h3>
                        <div className='icon-con-wrapper'>
                            <div className='icon-con facebook'>
                                <FacebookIcon />
                            </div>
                            <div className='icon-con instagram'>
                                <InstagramIcon />
                            </div>
                            <div className='icon-con x'>
                                <XIcon />
                            </div>
                            <div className='icon-con youtube'>
                                <YouTubeIcon />
                            </div>
                        </div>
                    </div>
                    <div className='mt'>
                        <h3 className='contactustext'>Call or Email Us</h3>
                        <p className='textBig mt'> You can contact us anytime between <span className='textBig fw-500'> 9AM to 6PM </span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs