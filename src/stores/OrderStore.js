import {EventEmitter} from 'events';
import dispatcher from '../dispatcher'
import orderActions from '../actions/OrderActions'
import orderData from '../data/OrderData'


class OrderStore extends EventEmitter {
    eventTypes = {
        ORDER_CREATED: 'order_created',

    };


    createOrder(userId) {

        orderData.createOrder(userId)
            .then((data) => {
                console.log(data)
                this.emit(this.eventTypes.ORDER_CREATED, data)
            })
            .catch(error => console.log(error))
    }



    handleAction(action) {
        console.log('reg store' + action.type);
        switch (action.type) {
            case orderActions.types.ORDER_CREATE: {
                this.createOrder(action.userId);
                break;
            }

            default:
                break
        }

    }


}


let orderStore = new OrderStore();

dispatcher.register(orderStore.handleAction.bind(orderStore));

export default orderStore