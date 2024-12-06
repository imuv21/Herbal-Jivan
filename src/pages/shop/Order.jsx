import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { orders } from '../../assets/schemas';


const Order = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 2;
    const total_results = orders?.length;
    const total_pages = Math.ceil(total_results / pageSize);

    //pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= total_pages) {
            setCurrentPage(newPage);
        }
    };
    const paginatedItems = orders.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );



    return (
        <Fragment>
            <Helmet>
                <title>Orders - Embrace Wellness, Naturally</title>
                <meta name="description" content="Discover the power of nature with Herbal Jivan. Your trusted source for herbal remedies, wellness products, and holistic health solutions crafted with care and authenticity. Embrace a healthier, natural lifestyle today." />
                <link rel="canonical" href="https://herbaljivan.netlify.app/orders" />
            </Helmet>
            <section className='page flexcol center'>

                <section className='orderCont'>

                    <article className='flex center wh'><h1 className='heading'>Your Orders</h1></article>

                    <article className='cartProducts'>
                        {paginatedItems && paginatedItems.length > 0 && paginatedItems.map((item, index) => (
                            <article key={index} className='orderproCont'>
                                <div className="orderview">
                                    <p className="text">Order ID : {item.orderId}</p>

                                    <div className="orderBtns">
                                        <button className='cancel'>Cancel</button>
                                        <button className='view'>View</button>
                                    </div>
                                </div>
                                <div className="flexcol g5 start-center wh">
                                    <p className="text">Time & Date : {item.time} - {item.date}</p>
                                    <p className="text">Total Items : {item.products?.length}</p>
                                    <p className="text">Total Price : Rs. {Number(item.totalPrice).toFixed(2)}₹</p>
                                    <p className="text">Status : {item.orderStatus}</p>
                                </div>
                                <div className="orderProducts">
                                    {
                                        item.products && item.products.length > 0 && item.products.map((pro, inx) => (
                                            <div className='opItem' key={pro.productId}>
                                                <img src={pro.image} alt={pro.name} />
                                                <div className="opDetail">
                                                    <p className="textSmol">{pro.name?.length > 10 ? `${pro.name?.substring(0, 10)}...` : pro.name}</p>
                                                    <p className="textSmol">Rs. {Number(pro.salePrice).toFixed(2)}₹</p>
                                                    <p className="textSmol">Quantity : {pro.quantity}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </article>
                        ))}
                    </article>

                </section>

                {total_results > pageSize && (
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                        <span>{`Page ${currentPage} of ${total_pages}`}</span>
                        <button disabled={currentPage === total_pages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                )}
            </section>
        </Fragment>
    );
};

export default Order;