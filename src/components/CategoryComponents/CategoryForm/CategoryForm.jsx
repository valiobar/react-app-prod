import React from 'react'
import {Input, Button, Modal} from 'react-materialize'
import formOnChangeHandler from '../../../helpers/formHandler/handelFormOnChange'
import categoryActions from '../../../actions/CategotyActions'
import categoryStore from '../../../stores/CategoryStore'
import toastr from 'toastr'


class CategoryForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.categoryToUpdate)
        this.state = {
            category: {
                _id: this.props.categoryToUpdate._id || null,
                name: this.props.categoryToUpdate.name || '',
                description: this.props.categoryToUpdate.description || '',
                parent_category: this.props.categoryToUpdate.parent_category || null
            },
            error: {
                name: ''

            }
        }

        this.handleCategoryCreated = this.handleCategoryCreated.bind(this)
        categoryStore.on(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({category: nextProps.categoryToUpdate})
    }

    componentWillMount() {
        console.log(this.props.categories)


    }

    componentWillUnmount() {
        console.log('remve list')
        categoryStore.removeListener(categoryStore.eventTypes.CATEGORY_CREATED, this.handleCategoryCreated)

    }

    clearForm() {
        console.log('claer form')
        this.setState({
            category: {
                name: '',
                description: '',
                parent_category: null
            }
        })
        this.setState({
            errors: {
                name: '',
            }
        })

    }

    handleCategoryCreated(data) {
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

    handleInputChange(event) {
        formOnChangeHandler(event, 'category', this)


    }

    validateModel(model) {
        let isValid = true;
        let errors = {
            name: ''
        }
        if (typeof model.name !== 'string' || model.name.trim().length < 3) {
            isValid = false;
            errors.name = 'Name must be at least 3 symbols';

        }
        return {
            isValid: isValid,
            errors: errors
        }
    }

    createCategory(event) {
        event.preventDefault()
        let isValid = this.validateModel(this.state.category).isValid;
        this.state.error = this.validateModel(this.state.category).errors
        this.setState({error: this.state.error})
        if (isValid) {
            console.log(this.state.category)
            categoryActions.createCategory(this.state.category);
            this.clearForm()
        }

    }

    render() {
        return (
            <Modal
                header='Add Category'
                fixedFooter
                id="saveAndClose"
                actions={
                    <div>
                        <Button modal="close" onClick={this.createCategory.bind(this)} waves='green'>Create</Button>
                        <Button modal="close" onClick={this.clearForm.bind(this)} waves='red'>Cancel</Button>
                    </div>
                }
                trigger={
                    <Button id="modalTrigger" waves='light'>Create Category</Button>
                }>
                <div className="row">
                    <div className="inputContainer col-md-6 ">
                        <Input
                            value={this.state.category.name}
                            onChange={this.handleInputChange.bind(this)}
                            type="text"
                            label="Category name"
                            name='name'/>
                        <span className="error">{this.state.error.name || ''}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="inputContainer col-md-6">
                        <Input
                            value={this.state.category.description}
                            onChange={this.handleInputChange.bind(this)}
                            name='description'
                            label="Category description"/>
                    </div>

                </div>
                <div className="row">
                    <div className="inputContainer col-md-6">
                        <Input value={this.state.category.parent_category || ""}
                               onChange={this.handleInputChange.bind(this)}
                               name='parent_category'
                               type='select'
                               label="Parent Category"
                               placeholder="Select parent category">
                            {this.props.categories.map((categorySelsec) =>
                                <option key={categorySelsec._id} value={categorySelsec._id}>{categorySelsec.name}</option>
                            )}
                        </Input>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default CategoryForm