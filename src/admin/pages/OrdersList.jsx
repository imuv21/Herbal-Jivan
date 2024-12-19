import React, { Fragment } from 'react';
import { ordersList } from '../../assets/schemas';


const OrdersList = () => {


    return (
        <Fragment>
            <article className="sortCat">
                <h1 className="heading">Orders List</h1>
                <select name="sort">
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </article>

            <article className='usersList'>
                <div className="userRow">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">order ID</div>
                    <div className="email fw-600">email</div>
                    <div className="datePriceNum fw-600">total products</div>
                    <div className="datePriceNum fw-600">total price</div>
                    <div className="datePriceNum fw-600">date</div>
                    <div className="datePriceNum fw-600">status</div>
                </div>

                {ordersList && ordersList.length > 0 && ordersList.map((order, index) => (
                    <div className="userRow" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">{order.orderId?.length > 20 ? `${order.orderId.substring(0, 20)}...` : order.orderId}</div>
                        <div className="email">{order.email?.length > 20 ? `${order.email.substring(0, 20)}...` : order.email}</div>
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

export default OrdersList