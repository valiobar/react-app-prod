import dispatcher from '../dispatcher'
import categoryStore from '../stores/CategoryStore'


const categoryActions = {
    types: {
        ORDER_CREATE: 'ORDER_CREATE',

    },
    createOrder(userId){

        dispatcher.dispatch({
            type: this.types.ORDER_CREATE,
            userId
        })
    },


}
export default categoryActions