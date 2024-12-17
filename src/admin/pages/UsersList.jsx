import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../assets/schemas';


const UsersList = () => {

    const navigate = useNavigate();

    const seeOrders = (id) => {
        navigate(`/dashboard/user-list/user-orders/${id}`);
    }
    const seeReviews = (id) => {
        navigate(`/dashboard/user-list/user-reviews/${id}`);
    }
    const seeQuestions = (id) => {
        navigate(`/dashboard/user-list/user-questions/${id}`);
    }

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
                <div className="userRow">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">full name</div>
                    <div className="email fw-600">email</div>
                    <div className="seeBtns fw-600">action</div>
                </div>
                {users && users.length > 0 && users.map((user, index) => (
                    <div className="userRow" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">{`${user.firstname} ${user.lastname}`}</div>
                        <div className="email">{user.email}</div>
                        <div className="seeBtns">
                            <button onClick={() => seeOrders(user.userId)}>Orders</button>
                            <button onClick={() => seeReviews(user.userId)}>Reviews</button>
                            <button onClick={() => seeQuestions(user.userId)}>Questions</button>
                        </div>
                    </div>
                ))}
            </article>
        </Fragment>
    )
}

export default UsersList