import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersList } from '../../assets/schemas';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const UserOrder = () => {

    const navigate = useNavigate();

    const back = () => {
        navigate('/dashboard/user-list');
    }

    return (
        <Fragment>
            <article className="sortCat">
                <div className="backSection">
                    <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Orders List</h1>
                </div>
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
                    <div className="email fw-600">order ID</div>
                    <div className="email fw-600">Address</div>
                    <div className="datePriceNum fw-600">total products</div>
                    <div className="datePriceNum fw-600">total price</div>
                    <div className="datePriceNum fw-600">date</div>
                    <div className="datePriceNum fw-600">status</div>
                </div>

                {ordersList && ordersList.length > 0 && ordersList.map((order, index) => (
                    <div className="userRow" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">{order.orderId}</div>
                        <div className="email">{order.email}</div>
                        <div className="datePriceNum">{order.numberOfProducts}</div>
                        <div className="datePriceNum">Rs. {Number(order.totalPrice).toFixed(2)}</div>
                        <div className="datePriceNum">{order.date}</div>
                        <div className="datePriceNum">
                            <select name="status" value={order.orderStatus} onChange={(e) => { const newStatus = e.target.value; }}>
                                <option value="Placed">Placed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </article>
        </Fragment>
    )
}

export default UserOrder