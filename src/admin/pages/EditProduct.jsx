import React, { useState, Fragment, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../../assets/schemas';
import { fetchProductDetails } from '../../slices/productSlice';
import DOMPurify from 'dompurify';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const EditProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pDetails, pdLoading, pdError } = useSelector((state) => state.product);
    const MAX_IMAGES = 5;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState({
        name: pDetails?.name || "",
        categoryPath: pDetails?.selectedSupOption || "",
        originalPrice: pDetails?.originalPrice || 0,
        salePrice: pDetails?.salePrice || 0,
        stock: pDetails?.stock || 0,
        info: pDetails?.info || "",
    });

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);


    //image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Invalid file type. Only images are allowed.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                toast(<div className='flex center g5'><NewReleasesIcon /> </div>, {
                    duration: 3000,
                    position: 'top-center',
                    style: { color: 'red' },
                });
                toast(<div className='flex center g5'> < NewReleasesIcon /> File size exceeds 10 MB.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });

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
            toast(<div className='flex center g5'> < NewReleasesIcon /> You can only upload up to {MAX_IMAGES} images.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
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
                name: formData.get('name'),
                originalPrice: parseFloat(formData.get('originalPrice')),
                salePrice: parseFloat(formData.get('salePrice')),
                stock: parseFloat(formData.get('stock')),
                info: formData.get('info'),
            };

            const sanData = {
                name: DOMPurify.sanitize(productData.name),
                originalPrice: productData.originalPrice,
                salePrice: productData.salePrice,
                stock: productData.stock,
                info: DOMPurify.sanitize(productData.info),
                images: reviewImages,
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

    const handleDeleteImageTwo = async (imageId) => {

    }

    const back = () => {
        navigate('/dashboard/product-list');
    }

    const images = pDetails?.image?.map((img) => img.imageUrl) || [];


    return (
        <Fragment>
            <div className="backSection">
                <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Edit Product</h1>
            </div>

            <form onSubmit={productSubmit} className='productForm'>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Product Name</p>
                    <input type="text" name='name' value={formValues.name} onChange={handleInputChange} placeholder='Enter product name' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Select Category</p>
                    <select name="categoryPath" value={formValues.categoryPath} onChange={handleInputChange} required>
                        <option value="">Select category</option>
                        {
                            categories && categories.length > 0 && categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Original Price</p>
                    <input type="number" name='originalPrice' value={formValues.originalPrice} onChange={handleInputChange} placeholder='Enter original price (₹)' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Sale Price</p>
                    <input type="number" name='salePrice' value={formValues.salePrice} onChange={handleInputChange} placeholder='Enter sale price (₹)' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Product Stock</p>
                    <input type="number" name='stock' value={formValues.stock} onChange={handleInputChange} placeholder='Enter product stock' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Product Information</p>
                    <textarea name="info" value={formValues.info} onChange={handleInputChange} placeholder='Enter product information' required />
                </div>

                <div className="preview-container">
                    {images && images.map((image, index) => (
                        <div className="preview-box" key={index}>
                            <img src={image} alt={`Preview ${index}`} className="preview-image" />
                            <span className="delete-icon"><DeleteForeverIcon onClick={() => handleDeleteImageTwo(image.imageId)} /></span>
                        </div>
                    ))}
                </div>

                <label htmlFor="file-upload" className="upload-label">
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

                <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </form>

        </Fragment>
    )
}

export default EditProduct