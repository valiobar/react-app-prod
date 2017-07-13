import React from 'react'
import categoryActions from '../../../actions/CategotyActions'
import categoryStore from '../../../stores/CategoryStore'
import style from './AdminPanel.css'
import CategoryForm from '../../CategoryComponents/CategoryForm'
import CategoryList from '../../CategoryComponents/CategoryList'
import $ from 'jquery'
import CreateProduct from '../../ProductsComponents/CrateProduct'
import ProductList from '../../ProductsComponents/ProductList'
import productActions from '../../../actions/ProductActions'
import productStore from '../../../stores/ProductStore'

class AdminPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            componentToRender: '',
            categoryToUpdate: {},
            productToUpdate: {},


        }
        this.handleCategoryCreated = this.handleCategoryCreated.bind(this)
        categoryStore.on(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)

        this.onCategorySelect = this.onCategorySelect.bind(this)

        this.handleCategoriesFetcked = this.handleCategoriesFetcked.bind(this)
        categoryStore.on(categoryStore.eventTypes.ALL_CATEGORIES_FETCHED, this.handleCategoriesFetcked)

        this.handleProductCreated = this.handleProductCreated.bind(this)
        productStore.on(productStore.eventTypes.PRODUCT_CREATED, this.handleProductCreated)



    }

    componentWillUnmount() {
        categoryStore.removeListener(categoryStore.eventTypes.ALL_CATEGORIES_FETCHED, this.handleCategoriesFetcked)
        categoryStore.removeListener(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)
        productStore.removeListener(productStore.eventTypes.PRODUCT_CREATED, this.handleProductCreated)

    }
    componentWillMount() {
        categoryActions.gatAll()
    }


    handleProductCreated(data) {

        if(data.data) {

            if (data.data.category) {
                let categoryId = data.data.category
                let allCategories = this.state.categories;
                allCategories.filter(cat => {
                    return cat._id == categoryId
                })[0].products.push(data.data._id)
            }
        }
    }

    handleCategoriesFetcked(data) {
        this.setState({categories: data.data})
        console.log(JSON.stringify(this.state))
    }

    handleCategoryCreated(data) {
        console.log(data.data)
        let categoriesUpdated = this.state.categories;
        categoriesUpdated.push(data.data)
        this.setState({categories: categoriesUpdated}, () => console.log(this.state.categories))

    }





    onCategorySelect(item) {
        $('#modalTrigger').click()
        this.setState({categoryToUpdate: item}, () => $('#modalTrigger').click())

    }

    selectComponent(event) {
        this.setState({componentToRender: event.target.getAttribute('name')},
            ()=>console.log(this.state.componentToRender))

    }


    render() {
        return (
            <div>


                <div className="adminContainer row">
                    <div className="adminSidePanel col-md-2">
                        <div name="CategoryList" onClick={this.selectComponent.bind(this)}
                             className="adminSidePanelItem">
                            <p name="CategoryList">Categories</p>
                        </div>
                        <div onClick={this.selectComponent.bind(this)} className="adminSidePanelItem">
                            <p name="CreateProduct">Products</p>
                        </div>
                        <div className="adminSidePanelItem">
                            <p>Orders</p>
                        </div>
                    </div>
                    <div className="adminComponents col-md-9">
                        {this.state.componentToRender == "CategoryList" && (
                            <div>

                                <CategoryForm categoryToUpdate={this.state.categoryToUpdate}
                                              categories={this.state.categories}/>
                                <CategoryList onCategorySelect={this.onCategorySelect}
                                              categories={this.state.categories}/>
                            </div>
                        )}
                        {this.state.componentToRender == "CreateProduct" && (
                            <div>
                                <CreateProduct productToUpdate={this.state.productToUpdate}
                                               categories={this.state.categories}/>
                                <ProductList listType="thumb" />

                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminPanel