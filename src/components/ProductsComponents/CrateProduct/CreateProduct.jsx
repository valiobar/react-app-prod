import React from 'react'
import styles from './CrateProduct.css'
import {Input, Button, Modal} from 'react-materialize'
import Image from '../../../helpers/Image'
import $ from 'jquery'
import productActions from '../../../actions/ProductActions'
import productStore from '../../../stores/ProductStore'
import productValidator from '../../../helpers/validators/productFormValidator'
import formOnChangeHandler from '../../../helpers/formHandler/handelFormOnChange'
import toastr from 'toastr'
class CrateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                _id: this.props.productToUpdate._id || null,
                name: this.props.productToUpdate.name || '',
                description: this.props.productToUpdate.description || '',
                category: this.props.productToUpdate.category || null,
                price: this.props.productToUpdate.price || null,
                images: this.props.productToUpdate.images || []
            },
            error: {
                name: '',
                price: ''
            }
        }
        console.log('create producty ')
        this.handleProductCreated = this.handleProductCreated.bind(this)
        productStore.on(productStore.eventTypes.PRODUCT_CREATED, this.handleProductCreated)
        this.handleImageUpload = this.handleImageUpload.bind(this)
        productStore.on(productStore.eventTypes.IMAGE_UPLOADED, this.handleImageUpload)
    }

    componentWillUnmount() {
        console.log('remve list')
        productStore.removeListener(productStore.eventTypes.PRODUCT_CREATED, this.handleProductCreated)
    }

    handleImageUpload(data) {

        let product = this.state.product;
        product.images.push(data.secure_url)
        this.setState({product: product})
    }

    handleProductCreated(data) {
        if (!data.success) {
            if (data.errors) {
                this.setState({error: data.errors})
                return
            }
            toastr.error(data.message)
            return
        }
        toastr.success(data.message)
        this.clearForm()
    }

    uploadImage() {
        productActions.uploadImage($('#image').prop('files')[0]);
        // productActions.createProduct($('#image').val());
    }

    handleInputChange(event) {
        formOnChangeHandler(event, 'product', this)


    }

    createProduct() {
        console.log("Product form crated")
        let validationResult = productValidator(this.state.product)
        this.setState({error: validationResult.errors})
        if (validationResult.isValid) {
            productActions.createProduct(this.state.product)
            $('#closeProductModal').click()
        }

    }

    clearForm() {
        console.log('claer form')
        this.setState({
            product: {
                name: '',
                description: '',
                category: null,
                price: 0,
                images: []
            }
        })
        this.setState({
            errors: {
                name: '',
                price: ''
            }
        })
    }

    render() {

        let renderImage = [];
        let imagesCount = this.state.product.images.length
        if (imagesCount > 0) {
            renderImage.push(<Image imageType="card" src={this.state.product.images[0]}/>)
            if (this.state.product.images.length > 1) {
                this.state.product.images.slice(1).map(img => {
                    renderImage.push(<div className="col-md-4"><Image imageType="thumb" src={img}/></div>)
                })

            }

        }


        return (
            <Modal
                header='Product'
                fixedFooter
                id="productModal"
                actions={
                    <div>
                        <Button onClick={this.createProduct.bind(this)} waves='green'>Create</Button>
                        <Button id="closeProductModal" modal="close" onClick={this.clearForm.bind(this)} waves='red'>Cancel</Button>
                    </div>
                }
                trigger={
                    <Button id="modalTrigger" waves='light'>Create Product</Button>
                }>
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="inputContainer ">
                            <Input
                                value={this.state.product.name}
                                onChange={this.handleInputChange.bind(this)}
                                type="text"
                                label="Product name"
                                name='name'/>
                            <span className="error">{this.state.error.name || ''}</span>
                        </div>

                        <div className="row">
                            <div className="inputContainer">
                                <Input
                                    value={this.state.product.description}
                                    onChange={this.handleInputChange.bind(this)}
                                    name='description'
                                    label="Product description"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="inputContainer ">
                                <Input value={this.state.product.category || ""}
                                       onChange={this.handleInputChange.bind(this)}
                                       name='category'
                                       type='select'
                                       label="Category"
                                       placeholder="Select category">
                                    {this.props.categories.map((category) =>
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )}
                                </Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="inputContainer col-md-6">
                                <Input
                                    value={this.state.product.price}
                                    onChange={this.handleInputChange.bind(this)}
                                    name='price'
                                    type='number'
                                    label="Product price"/>$
                                <span className="error">{this.state.error.price || ''}</span>
                            </div>
                            <input id="image" type="file" name="file"/>
                            <Button onClick={this.uploadImage.bind(this) } waves='green'>Upload</Button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {renderImage}


                    </div>
                </div>

            </Modal>
        )
    }
}
export default CrateProduct