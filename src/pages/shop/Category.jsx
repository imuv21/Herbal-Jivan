import React, { useState, Suspense } from 'react'
import { products } from '../../assets/schemas'
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader/Loader';
import ProductCardList from '../../components/ProductCardList';

const Category = () => {

    const layoutName = {
        list: 'list',
        grid: 'grid'
    }

    const [layout, setLayout] = useState(layoutName.grid)

    const sort = ['Featured', 'Best selling', 'Alphabetically, A-Z', 'Alphabetically, Z-A', 'Price, high to low']



    return (
        <section className='page flexcol'>
            <div className='category-filter-con'>
                <div>
                    <select name="" id="" className="form-select">
                        {
                            sort?.map((e ,i) => {
                                return (
                                    <option key={i} value={e}>{e}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='flex g10 center' >
                    <div onClick={() => setLayout(layoutName.grid)} className={`${layout == layoutName.grid && "active"}  layout-btn`}>
                        <ViewWeekIcon />
                    </div>

                    <div onClick={() => setLayout(layoutName.list)} className={`${layout == layoutName.list && "active"}  layout-btn`}>
                        <ViewStreamIcon />
                    </div>
                </div>
            </div>


            {
                layout == layoutName.list
                    ?
                    (Array.isArray(products) && products?.map((pro) => (
                        <div className='mt-4' key={pro.productId}>
                            <Suspense fallback={<Loader />}>
                                <div className=''>
                                    <ProductCardList name={pro.name} id={pro.productId} image={pro.image ? pro.image : defaulImg} ratings={pro.ratings} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                                </div>
                            </Suspense>
                        </div>
                    )))
                    :
                    (<div className='search-con'>
                        {Array.isArray(products) && products?.map((pro) => (
                            <div key={pro.productId}>
                                <Suspense fallback={<Loader />}>
                                    <ProductCard name={pro.name} id={pro.productId} image={pro.image ? pro.image : defaulImg} ratings={pro.ratings} originalPrice={pro.originalPrice} salePrice={pro.salePrice} />
                                </Suspense>
                            </div>
                        ))}
                    </div>)
            }

        </section >
    )
}

export default Category