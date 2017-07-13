import React from 'react'
import {Collapsible, CollapsibleItem, Button} from 'react-materialize'
import styles from './CategoryList.css'

class CategoryList extends React.Component {

    renderlist = []

    constructor(props) {
        super(props)
        this.state={
            addedCategory:''
        }

        this.renderCategory = this.renderCategory.bind(this)
    }
updataCat(item){
    this.setState({addedCategory:item.name})
}

    renderCategory(category, indentation) {
        this.renderlist.push((
            <CollapsibleItem header={category.name} key={category._id} style={{marginLeft: 15 * indentation + 'px'}}>
                <ItemComponent update={this.updataCat.bind(this)} item={category} onClickButton={this.props.onCategorySelect}></ItemComponent>
            </CollapsibleItem>))

        if (category.subCategories) {
            indentation++;
            let subCat = []
            category.subCategories.map(catId => {
                subCat = this.props.categories.filter(cat => {
                    return cat._id == catId
                })
                subCat.map(sub => this.renderCategory(sub, indentation))
            })
        }

    }

    renderCategories() {
        this.props.categories.filter(cat => {
            return cat.parent_category == null
        }).map(cat => this.renderCategory(cat, 0))
    }

    componentWillMount() {
      //  this.renderCategories()


    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.categories)
        this.renderCategories()
    }


    render() {
        this.renderCategories()

        return (
            <Collapsible popout>
                {this.renderlist}
            </Collapsible>

        )
    }
}


const ItemComponent = (props) => {
    let item = props.item;
    let productsCount = item.products.length
    let buttonTriger = props.onClickButton;
    let upadet= this.props.update

    return (
        <div>
            <h6>{item.name}</h6> <span>Product : {productsCount}</span>
            <Button modal="confirm" onClick={
                () =>{ buttonTriger(item)
                    upadet(item)
                }
            }
                    waves='green'>Edit</Button>
        </div>
    );
}
export default CategoryList