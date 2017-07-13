import React from 'react'
import styles from './ProductList.css'
import ProductTummb from '../ProductTumb'
import productActions from '../../../actions/ProductActions'
import productStore from '../../../stores/ProductStore'
import {Pagination, Preloader} from 'react-materialize'


class ProductList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            currentPage: 1,
            pagesNumber: 10,
            isLoading: true
        }
        this.handleProductFetched = this.handleProductFetched.bind(this)
        productStore.on(productStore.eventTypes.PRODUCTS_FETCHED, this.handleProductFetched)

        this.handleProductCreated = this.handleProductCreated.bind(this)
        productStore.on(productStore.eventTypes.PRODUCT_CREATED, this.handleProductCreated)

    }

    componentWillUnmount() {

        productStore.removeListener(productStore.eventTypes.PRODUCTS_FETCHED, this.handleProductFetched)
    }

    componentWillMount() {
        productActions.fetchProducts(this.state.currentPage)

    }

    handleProductCreated(data) {

        if (data.data) {
            console.log('Product created:')

            console.log(data.data)
            let productsAll = this.state.products
            productsAll.unshift(data.data)
            this.setState({products: productsAll})


        }
    }

    handleProductFetched(data) {
        console.log('Product fetched:')
        console.log(data.data)
        let currentPagesNumber = Math.ceil(data.data.allProductsCount / 4)
        this.setState({products: data.data.pagedProducts, pagesNumber: currentPagesNumber})
        this.setState({isLoading: false})

    }

    addToBasket(producId) {
        console.log(producId)
    }

    fetchData(num) {

        console.log('state: ' + this.state.currentPage + "  event " + num);
        productActions.fetchProducts(num)
    }

    onPageSelect(event) {
        let currentPagepagination = event
        this.setState({isLoading: true})
        this.setState({currentPage: currentPagepagination}, this.fetchData(event))
        console.log('state: ' + this.state.currentPage + "  event " + event);

    }


    render() {
        console.log(this.state.products)
        return (
            <div className={styles.producListContainer}>
                {this.state.isLoading ? (
                    <div >
                        <Preloader size='big'/>
                    </div>
                ) : (
                    <div className="row">
                        {this.state.products.map(prod=><ProductTummb
                            onCheckOutClick={this.props.checkout}
                            onAddToBasketClick={this.props.addToBasket}
                            key={prod._id}
                            productType={this.props.listType}
                            product={prod}/>)}

                    </div>
                )}

                <div className='centeredDiv'>
                    <Pagination items={this.state.pagesNumber} activePage={1} maxButtons={8}
                                onSelect={this.onPageSelect.bind(this)}/>
                </div>
            </div>
        )
    }
}
export default ProductList