import React, { Fragment, useState } from 'react';
import { adminList } from '../../assets/schemas';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const RoleManagement = () => {

    const navigate = useNavigate();
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClickFooter = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsClickedFooter(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
    };

    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        dispatch(clearErrors());
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);
        try {
            const userData = {
                firstName: DOMPurify.sanitize(formValues.firstName),
                lastName: DOMPurify.sanitize(formValues.lastName),
                interests: DOMPurify.sanitize(formValues.interests),
            };
            const response = await dispatch(updateProfile(userData)).unwrap();
            if (response.status === "success") {
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Error updating profile!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitted(false);
        }
    };

    const gotoadmin = () => {
        navigate('/dashboard/add-new-admin');
    }
    const gotoeditadmin = () => {
        navigate('/dashboard/edit-admin');
    }


    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Role Management</h1>
                <button onClick={gotoadmin}>Add New Admin</button>
            </article>

            <div className="adminGrid">
                {adminList && adminList.length > 0 && adminList.map((admin, index) => (
                    <div className="adminGridItem" key={index}>
                        <p className="text fw-600">{admin.adminName}</p>
                        <p className='text'>{admin.adminPassword.length > 2 ? `${admin.adminPassword.substring(0, 2)}******` : `********`}</p>
                        <EditIcon className='editIcon' onClick={gotoeditadmin} />
                        <DeleteIcon className='deleteIcon' onClick={handleClickFooter} />
                    </div>
                ))}
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{gap: '10px'}} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Are you sure?</h2>

                            <div className="flex wh g10" style={{ marginTop: '15px', justifyContent: 'space-between' }}>
                                <button type='submit' className="applyBtn" disabled={isSubmitted}>{isSubmitted ? 'Deleting...' : 'Yes'}</button>
                                <button type="button" className="applyBtn" onClick={closepopup}>No</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

        </Fragment>
    )
}

export default RoleManagement