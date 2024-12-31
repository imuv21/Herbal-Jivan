import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getAddress, addAddress, deleteAddress, editAddress } from '../../slices/productSlice';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';



const Profile = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { addresses, getaddRessLoading, getaddRessError } = useSelector((state) => state.product);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isClickedFooterTwo, setIsClickedFooterTwo] = useState(false);
    const [isClickedFooterThree, setIsClickedFooterThree] = useState(false);
    const [editId, setEditId] = useState(null); 
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClickFooterTwo = (event) => {
        event.preventDefault();
        setIsClickedFooterTwo(true);
    };

    useEffect(() => {
        dispatch(getAddress());
    }, [dispatch]);

    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: ''
    });
    const handleClickFooter = (event, profile) => {
        event.preventDefault();
        setFormValues({
            firstname: profile.firstname,
            lastname: profile.lastname,
            email: profile.email
        });
        setIsClickedFooter(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const profileSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const userData = {
                firstname: DOMPurify.sanitize(formValues.firstname),
                lastname: DOMPurify.sanitize(formValues.lastname)
            };
            console.log(userData);
            const response = await dispatch(addAddress(userData)).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Profile updated successfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setFormValues({
                firstname: '',
                lastname: ''
            });
            setIsSubmitted(false);
        }
    };

    const [addressValues, setAddressValues] = useState({
        address: '',
        landmark: '',
        city: '',
        pincode: '',
        phoneNumber: '',
        isDefault: false
    });
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setIsClickedFooterTwo(false);
        setIsClickedFooterThree(false);
        setAddressValues({
            address: '',
            landmark: '',
            city: '',
            pincode: '',
            phoneNumber: '',
            isDefault: false
        });
    };
    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressValues({
            ...addressValues, [name]: type === 'checkbox' ? checked : value,
        });
    };
    const addAddressSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const userData = {
                address: DOMPurify.sanitize(addressValues.address),
                landmark: DOMPurify.sanitize(addressValues.landmark),
                city: DOMPurify.sanitize(addressValues.city),
                pincode: DOMPurify.sanitize(addressValues.pincode),
                phoneNumber: DOMPurify.sanitize(addressValues.phoneNumber),
                isDefault: addressValues.isDefault
            };
            console.log(userData);
            const response = await dispatch(addAddress(userData)).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Address added successfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooterTwo(false);
                dispatch(getAddress());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error submitting address!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setAddressValues({
                address: '',
                landmark: '',
                city: '',
                pincode: '',
                phoneNumber: '',
                isDefault: false
            });
            setIsSubmitted(false);
        }
    };

    const handleClickFooterThree = (event, address) => {
        event.preventDefault();
        setEditId(address.id); 
        setAddressValues({
            address: address.address,
            landmark: address.landmark,
            city: address.city,
            pincode: address.pincode,
            phoneNumber: address.phoneNumber,
            isDefault: address.isDefault || false
        });
        setIsClickedFooterThree(true);
    };
    const editAddressSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const userData = {
                ...(editId && { id: editId }),
                address: DOMPurify.sanitize(addressValues.address),
                landmark: DOMPurify.sanitize(addressValues.landmark),
                city: DOMPurify.sanitize(addressValues.city),
                pincode: DOMPurify.sanitize(addressValues.pincode),
                phoneNumber: DOMPurify.sanitize(addressValues.phoneNumber),
                isDefault: addressValues.isDefault
            };
            console.log(userData);
            const response = await dispatch(editAddress(userData)).unwrap();
            if (response.status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Address updated successfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooterThree(false);
                dispatch(getAddress());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating address!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setAddressValues({
                address: '',
                landmark: '',
                city: '',
                pincode: '',
                phoneNumber: '',
                isDefault: false
            });
            setEditId(null);
            setIsSubmitted(false);
        }
    };

    const deleteAddressHandle = async (id) => {
        try {
            const { status } = await dispatch(deleteAddress(id)).unwrap();
            if (status) {
                toast(<div className='flex center g5'> < VerifiedIcon /> Address deleted sucessfully!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getAddress());
            }
        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isClickedFooter || isClickedFooterTwo || isClickedFooterThree) {
                setIsClickedFooter(false);
                setIsClickedFooterTwo(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isClickedFooter, isClickedFooterTwo, isClickedFooterThree]);
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
                        <p className="name">{`${user?.firstname} ${user?.lastname}`}</p> <EditIcon style={{ cursor: 'pointer' }} onClick={(e) => handleClickFooter(e, user)} />
                    </div>
                    <div className="flexcol start-center">
                        <p className="text" style={{ color: 'var(--codeThree)' }}>Email</p>
                        <p className="text verify flex center-start g5" >{user?.email}
                            {truef === 1 ? <VerifiedIcon /> : <NewReleasesIcon style={{ color: 'orange' }} />}
                        </p>
                    </div>
                </div>

                <div className="profile">
                    <div className="flex verify center-start g5">
                        <p className="name">Addresses</p>
                        <AddLocationAltIcon style={{ cursor: 'pointer' }} onClick={handleClickFooterTwo} />
                    </div>
                    <div className="addresses">
                        {getaddRessLoading && <p className="text">Loading addresses...</p>}
                        {getaddRessError && <p className="text">Error loading addresses...</p>}
                        {!getaddRessLoading && !getaddRessError && addresses && addresses.length > 0 && addresses.map((address, index) => (
                            <div className="addressCard" key={index}>
                                <div className="flex center-space wh">
                                    <p className="text" style={{ color: '#565656' }}>{ address.isDefault ? `Default Address` : `Address ${index + 1}`}</p>
                                    <div className="addressIcons">
                                        <EditIcon onClick={(e) => handleClickFooterThree(e, address)} />
                                        <DeleteIcon onClick={() => deleteAddressHandle(address.id)} />
                                    </div>
                                </div>
                                <div className="addressDetails">
                                    <div className="addressRow">
                                        <div className="addressHeading">Address:</div>
                                        <p className="textSmol">{address.address}</p>
                                    </div>
                                    <div className="addressRow">
                                        <div className="addressHeading">City:</div>
                                        <p className="textSmol">{address.city}</p>
                                    </div>
                                    <div className="addressRow">
                                        <div className="addressHeading">Landmark:</div>
                                        <p className="textSmol">{address.landmark}</p>
                                    </div>
                                    <div className="addressRow">
                                        <div className="addressHeading">Pincode:</div>
                                        <p className="textSmol">{address.pincode}</p>
                                    </div>
                                    <div className="addressRow">
                                        <div className="addressHeading">Number:</div>
                                        <p className="textSmol">{address.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={profileSubmit}>
                                <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Update Profile</h2>

                                <div className="pageBox5 flexcol center">
                                    <input type="text" name='firstname' autoComplete="given-name" placeholder='Enter your first name...' value={formValues.firstname} onChange={handleInputChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name='lastname' autoComplete="family-name" placeholder='Enter your last name...' value={formValues.lastname} onChange={handleInputChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="email" disabled name='email' className='disabled' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleInputChange} />
                                    <p className="error flex center-start wh">Email used for login can't be changed</p>
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
                            <form className="popup-wrapper" onSubmit={addAddressSubmit}>
                                <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Add Address</h2>

                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="address" autoComplete="street-address" placeholder="Enter your address..." value={addressValues.address} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="landmark" autoComplete="off" placeholder="Enter any landmark (optional)..." value={addressValues.landmark} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="city" autoComplete="address-level2" placeholder="Enter your city..." value={addressValues.city} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="pincode" autoComplete="postal-code" placeholder="Enter your pincode..." value={addressValues.pincode} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flexcol center">
                                    <input type="text" name="phoneNumber" autoComplete="tel" placeholder="Enter your number..." value={addressValues.phoneNumber} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flex center-start" style={{ marginTop: '5px' }}>
                                    <input type="checkbox" name='isDefault' checked={addressValues.isDefault} onChange={handleAddressChange} /> <div className="text">Make it default address</div>
                                </div>

                                <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                    <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Updating...' : 'Update'}</button>
                                    <button type="button" className="applyBtn" onClick={closepopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`popup-btn ${isClickedFooterThree ? 'clicked' : ''}`}>
                    {isClickedFooterThree && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={editAddressSubmit}>
                                <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Edit Address</h2>

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
                                    <input type="text" name="phoneNumber" autoComplete="tel" placeholder="Enter your number..." value={addressValues.phoneNumber} onChange={handleAddressChange} required />
                                </div>
                                <div className="pageBox5 flex center-start" style={{ marginTop: '5px' }}>
                                    <input type="checkbox" name='isDefault' checked={addressValues.isDefault} onChange={handleAddressChange} /> <div className="text">Make it default address</div>
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