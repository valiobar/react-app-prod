import React from 'react'
import styles from './ShoppingBasket.css'
import userActions from '../../../actions/UserActions'
import auth from '../../../common/appRouter/Auth'
import userStore from '../../../stores/UserStore'
import {Input, Button, Modal} from 'react-materialize'
class ShoppingBasket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }


        this.handleUserFetched = this.handleUserFetched.bind(this)
        userStore.on(userStore.evetTypes.USER_FETCHED, this.handleUserFetched)
    }

    handleUserFetched(data) {
        this.setState({user: data.data})
        console.log(data)
    }

    componentWillMount() {
        let userId = auth.getUser().id
        userActions.getUser(userId)
    }

    componentWillUnmount() {
        userStore.removeListener(userStore.evetTypes.USER_FETCHED, this.handleUserFetched)


    }

    render() {
        let items = this.state.user.shoppingBasket || []
        let renderItem = []




        return (
            <div className={styles.container}>
                <table >
                    <tr>
                        <th>Items</th>
                        <th>Prices</th>
                    </tr>
                    {items.map(item=>{

                        return  ( <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>)
                    })}


                </table>

                <Button onClick={() =>this.props.onCheckOutClick()}
                        waves='green'>Checkout</Button>
            </div>
        )
    }
}
export default ShoppingBasket