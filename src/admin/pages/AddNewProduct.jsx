import React, { useState, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/productSlice';
import { categories } from '../../assets/schemas';
import DOMPurify from 'dompurify';
import UploadIcon from "@mui/icons-material/Upload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const AddNewProduct = () => {

    const dispatch = useDispatch();
    const MAX_IMAGES = 5;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const [reviewImages, setReviewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                toast(<div className='flex center g5'> < NewReleasesIcon /> Invalid file type. Only images are allowed.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
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

    const productSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (reviewImages.length < 2) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> You have to upload at least 2 images.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append(
                "productData",
                JSON.stringify({
                    name: DOMPurify.sanitize(e.target.name.value),
                    categoryPath: DOMPurify.sanitize(e.target.categoryPath.value),
                    originalPrice: parseFloat(e.target.originalPrice.value),
                    salePrice: parseFloat(e.target.salePrice.value),
                    info: DOMPurify.sanitize(e.target.info.value),
                })
            );
            reviewImages.forEach((image) => formData.append("productImage", image));
            const result = await dispatch(addProduct(formData)).unwrap();

            console.log("Submitted Product Data:", formData);
            toast(<div className='flex center g5'> < VerifiedIcon /> {result.message || "Product added successfully!"}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

        } catch (error) {
            console.log(error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message || "Something went wrong!"}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setReviewImages([]);
            setPreviewImages([]);
            e.target.reset();
            setIsSubmitting(false);
        }
    };


    return (
        <Fragment>
            <article className='flex center-start wh'><h1 className="heading">Add New Product</h1></article>
            <form onSubmit={productSubmit} className='productForm'>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Product Name</p>
                    <input type="text" name='name' placeholder='Enter product name' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Select Category</p>
                    <select name="categoryPath" required>
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
                    <input type="number" name='originalPrice' placeholder='Enter original price (₹)' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Sale Price</p>
                    <input type="number" name='salePrice' placeholder='Enter sale price (₹)' required />
                </div>
                <div className="flexcol g10 start-center wh">
                    <p className="text">Product Information</p>
                    <textarea name="info" placeholder='Enter product information' required />
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

export default AddNewProduct





{/* <div className="flexcol g10 start-center wh">
                    <p className="text">Product Stock</p>
                    <input type="number" name='stock' placeholder='Enter product stock' required />
                </div> */}
                // stock: parseFloat(formData.get('stock')),
                // stock: productData.stock,