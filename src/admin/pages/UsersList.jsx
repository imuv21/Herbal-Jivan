import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../slices/userSlice';


const UsersList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { users, currentPage, totalPages, userLoading, userError } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUsers({ page: currentPage }));
    }, [dispatch, currentPage]);

    const seeOrders = (id) => {
        navigate(`/dashboard/user-list/user-orders/${id}`);
    }
    const seeReviews = (id) => {
        navigate(`/dashboard/user-list/user-reviews/${id}`);
    }
    const seeQuestions = (id) => {
        navigate(`/dashboard/user-list/user-questions/${id}`);
    }

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            dispatch(getUsers({ page: currentPage + 1 }));
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            dispatch(getUsers({ page: currentPage - 1 }));
        }
    };

    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Users List</h1>
                <select name="sort">
                    <option value="atoz">Alphabetically A to Z</option>
                    <option value="ztoa">Alphabetically Z to A</option>
                </select>
            </article>

            <article className='usersList'>
                {userLoading ? (
                    <p>Loading...</p>
                ) : userError ? (
                    <p>Error: {userError}</p>
                ) : (
                    <Fragment>
                        <div className="userRow">
                            <div className="index fw-600">Index</div>
                            <div className="email fw-600">Full Name</div>
                            <div className="email fw-600">Email</div>
                            <div className="seeBtns fw-600">Action</div>
                        </div>

                        {users && users.length > 0 && users.map((user, index) => (
                            <div className="userRow" key={user.userId}>
                                <div className="index">{(currentPage * 10) + index + 1}</div>
                                <div className="email">{`${user.firstname} ${user.lastname}`}</div>
                                <div className="email">{user.email}</div>
                                <div className="seeBtns">
                                    <button onClick={() => seeOrders(user.userId)}>Orders</button>
                                    <button onClick={() => seeReviews(user.userId)}>Reviews</button>
                                    <button onClick={() => seeQuestions(user.userId)}>Questions</button>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                )}
            </article>

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>Previous</button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>Next</button>
            </div>
        </Fragment>
    )
}

export default UsersList