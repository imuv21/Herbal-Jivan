import React, { Fragment, useState, useEffect } from 'react';
import { categories } from '../../assets/schemas';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const CategoryList = () => {

    const MAX_IMAGES = 1;
    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isClickedFooterTwo, setIsClickedFooterTwo] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClickFooter = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsClickedFooter(true);
    };
    const handleClickFooterTwo = (event) => {
        event.preventDefault();
        setIsClickedFooterTwo(true);
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        setIsClickedFooterTwo(false);
    };

    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Invalid file type. Only images are allowed.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                return false;
            }
            return true;
        });

        const uniqueFiles = validFiles.filter(
            (file) => !reviewImages.some((img) => img.name === file.name)
        );
        const totalImagesAllowed = Math.max(MAX_IMAGES - reviewImages.length, 0);
        const filesToAdd = uniqueFiles.slice(0, totalImagesAllowed);
        const previews = filesToAdd.map((file) => URL.createObjectURL(file));

        setReviewImages((prev) => [...prev, ...filesToAdd]);
        setPreviewImages((prev) => [...prev, ...previews]);

        if (validFiles.length > filesToAdd.length) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> You can only upload {MAX_IMAGES} image.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };
    const handleDeleteImage = (index) => {
        setPreviewImages((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
        setReviewImages((prev) => prev.filter((_, i) => i !== index));
    };

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


    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Category List</h1>
                <button onClick={handleClickFooterTwo}>Add New Category</button>
            </article>

            <div className="adminGrid">
                {categories && categories.length > 0 && categories.map((cat, index) => (
                    <Link to={`/category?query=${cat.name}`} className="adminGridItem" key={index}>
                        <img src={cat.image} alt={cat.name} />
                        <p className="text">{cat.name}</p>
                        <EditIcon className='editIcon' onClick={handleClickFooter} />
                        <DeleteIcon className='deleteIcon' />
                    </Link>
                ))}
            </div>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        <form className="popup-wrapper" style={{gap: '10px'}} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Edit Category</h2>

                            <div className="pageBox5 flexcol center">
                                <input type="text" name="categoryName" placeholder="Enter category name..." onChange={handleInputChange} required />
                            </div>

                            <div className="pageBox5 flexcol center">
                                <label htmlFor="file-upload" className="upload-label wh">
                                    <UploadIcon />
                                    <span>Upload Images</span>
                                </label>
                                <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                                {previewImages && previewImages.length > 0 &&
                                    <div className="preview-container">
                                        {previewImages.map((image, index) => (
                                            <div className="preview-box" key={index}>
                                                <img src={image} alt={`Preview ${index}`} className="preview-image" />
                                                <span className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImage(index)} /></span>
                                            </div>
                                        ))}
                                    </div>
                                }
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
                        <form className="popup-wrapper" style={{gap: '10px'}} onSubmit={handleSubmit}>
                            <h2 className="headingSmol" style={{ marginBottom: '15px' }}>Add New Category</h2>

                            <div className="pageBox5 flexcol center">
                                <input type="text" name="categoryName" placeholder="Enter category name..." onChange={handleInputChange} required />
                            </div>

                            <div className="pageBox5 flexcol center">
                                <label htmlFor="file-upload" className="upload-label wh">
                                    <UploadIcon />
                                    <span>Upload Images</span>
                                </label>
                                <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                                {previewImages && previewImages.length > 0 &&
                                    <div className="preview-container">
                                        {previewImages.map((image, index) => (
                                            <div className="preview-box" key={index}>
                                                <img src={image} alt={`Preview ${index}`} className="preview-image" />
                                                <span className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImage(index)} /></span>
                                            </div>
                                        ))}
                                    </div>
                                }
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

export default CategoryList