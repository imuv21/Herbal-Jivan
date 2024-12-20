import React, { useState, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { adminList } from '../../assets/schemas';
import DOMPurify from 'dompurify';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const AddAdmin = () => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAdmins, setFilteredAdmins] = useState([]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredAdmins([]);
        } else {
            const filtered = adminList.filter((admin) =>
                admin.adminName.toLowerCase().includes(query) ||
                admin.adminEmail.toLowerCase().includes(query)
            );
            setFilteredAdmins(filtered);
        }
    };

    const makeAdmin = (admin) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const sanitizedAdminName = DOMPurify.sanitize(admin.adminName);
            console.log(`Admin ${sanitizedAdminName} is now an active admin.`);
            toast(<div className='flex center g5'> < VerifiedIcon /> {sanitizedAdminName} is now an admin!</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

        } catch (error) {
            console.error('Error making admin:', error);
            toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setSearchQuery('');
            setFilteredAdmins([]);
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

            <div className="flexcol g10 start-center wh">
                <p className="textBig fw-600">Search Admin</p>
                <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search admin by name or email..." />
            </div>

            <div className="flexcol g10 start-center wh">
                {filteredAdmins.map((admin) => (
                    <div key={admin.adminName} className="wannabeAdmin">
                        <button onClick={() => makeAdmin(admin)} disabled={isSubmitting}>{isSubmitting ? `Making...` : `Make Admin`}</button>
                        <div className="flexcol g5 start-center wh">
                            <p className='text'>{admin.adminName?.length > 25 ? `${admin.adminName.substring(0, 25)}...` : admin.adminName}</p>
                            <p className='text fw-600'>{admin.adminEmail?.length > 25 ? `${admin.adminEmail.substring(0, 25)}...` : admin.adminEmail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default AddAdmin