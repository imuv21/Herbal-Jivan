import React, { Fragment } from 'react';
import { users } from '../../assets/schemas';


const UsersList = () => {

    const seeOrders = (id) => {

    }
    const seeReviews = (id) => {
        
    }
    const seeQuestions = (id) => {
        
    }

    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">User List</h1>
                <select name="sort">
                    <option value="featured">Featured</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="atoz">Alphabetically A to Z</option>
                    <option value="ztoa">Alphabetically Z to A</option>
                    <option value="atoz">Price High to Low</option>
                    <option value="atoz">Price Low to High</option>
                </select>
            </article>

            <article className='usersList'>
                <div className="userRow">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">full name</div>
                    <div className="email fw-600">email</div>
                    <div className="seeBtns fw-600">Actions</div>
                </div>
                {users && users.length > 0 && users.map((user, index) => (
                    <div className="userRow" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">{`${user.firstname} ${user.lastname}`}</div>
                        <div className="email">{user.email}</div>
                        <div className="seeBtns">
                            <button onClick={seeOrders(user.userId)}>Orders</button>
                            <button onClick={seeReviews(user.userId)}>Reviews</button>
                            <button onClick={seeQuestions(user.userId)}>Questions</button>
                        </div>
                    </div>
                ))}
            </article>
        </Fragment>
    )
}

export default UsersList