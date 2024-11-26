import React, { useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';


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
        setContactUs(ContactUs)
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
            <div className='footer-flex-4 mt-3'>
                <div>
                    <div className='para-4'>Get in Touch with Us!</div>
                    <div className=' textBig mt'>We can assist with orders, product queries, or anything else you need.</div>
                    <form onSubmit={handleContact}>
                        <div className='footer-flex-3 mt'>
                            <input type='text' placeholder='Name' name='name' value={contactUs.name} onChange={handleContactChange} />
                            <input type='email' placeholder='Email' name='email' value={contactUs.email} onChange={handleContactChange} />
                        </div>
                        <div className='mt'>
                            <textarea className='message-box-text' name='message' value={contactUs.message} placeholder='Message here' onChange={handleContactChange} />
                        </div>
                    </form>
                    <button type='submit'>Submit</button>
                </div>
                <div className='footer-flex-2 mt-3'>
                    <div className=''>
                        <p className='para-2'>Address:</p>
                        <p className='textBig mt'>Corporate add-A-1/197,HASTSAL ROAD ,UTTAM NAGAR
                            DELHI -110059</p>
                            <p className='textBig mt'>Company Name: HERBAL SCIENCE </p>
                    </div>
                    <div className='mt'>
                        <p className='para-2'>Contact:</p>
                        <p className='textBig mt'>Phone: 9599896554</p>
                        <p className='textBig mt'>Email: herbalscience28@gmail.com</p>
                    </div>
                    <div className='mt'>
                        <p className='para-2'>Follow on Social Media:</p>
                        <div className='footer-flex-3 mt'>
                            <FacebookIcon  />
                            <InstagramIcon  />
                            <XIcon  />
                            <YouTubeIcon  />
                        </div>
                    </div>
                    <div className='mt'>
                        <p className='para-2'>Call or Email Us</p>
                        <p className='textBig mt'>You can contact us anytime between 9AM to 6PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs