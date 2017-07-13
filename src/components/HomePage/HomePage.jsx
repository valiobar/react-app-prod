import React from 'react'
import styles from './HomePage.css'
import auth from '../../common/appRouter/Auth'
import ProductList from '../ProductsComponents/ProductList'
import userStore from '../../stores/UserStore'
import userAction from '../../actions/UserActions'
import toastr from 'toastr'
import orderStore from '../../stores/OrderStore'
import orderAction from '../../actions/OrderActions'
import {Input, Button, Modal} from 'react-materialize'
import $ from 'jquery'
import ShoppingBasket from '../../components/UserComponents/ShoppingBasket'
class HomePage extends React.Component{
  constructor(props){
    super(props)
      this.state={
        showBasket:false
      }



    this.handleItemAddToBasket = this.handleItemAddToBasket.bind(this)
    userStore.on(userStore.evetTypes.ITEM_ADDED_TO_BASKET, this.handleItemAddToBasket)
    this.handleOrderCreated = this.handleOrderCreated.bind(this)
    orderStore.on(orderStore.eventTypes.ORDER_CREATED, this.handleOrderCreated)
  }

  componentWillUnmount() {
    userStore.removeListener(userStore.evetTypes.ITEM_ADDED_TO_BASKET, this.handleItemAddToBasket)
    orderStore.removeListener(orderStore.eventTypes.ORDER_CREATED, this.handleOrderCreated)

  }
  handleOrderCreated(data){
    if (!data.success) {

      toastr.error(data.message)
      return
    }
    this.setState({showBasket:false})
    toastr.success(data.message)

  }



  handleItemAddToBasket(data){
    if (!data.success) {

      toastr.error(data.message)
      return
    }
    toastr.success(data.message)

  }

  checkOut(){
    let userId = auth.getUser().id
    orderAction.createOrder(userId)
  }

  onAddToBasket(productId){
    console.log(auth.getUser())
    let userId = auth.getUser().id
    let itemId =productId
    userAction.addToUserBasket({
      userId:userId,
      item:itemId})


  }
  showBasket(){
    let currensShowBasket = this.state.showBasket
    this.setState({showBasket:!currensShowBasket})
  }
  render(){
    return (
      <div className={styles.container}>
        {this.state.showBasket&&(<div className="basket"><ShoppingBasket onCheckOutClick={this.checkOut.bind(this)}/> </div>)}


        <Button className='white' onClick={this.showBasket.bind(this)}
                waves='green'>Shopping Cart</Button>
      <ProductList checkout={this.checkOut.bind(this)} addToBasket={this.onAddToBasket.bind(this)} listType="card" />

      </div>
    )
  }
}
export default HomePage