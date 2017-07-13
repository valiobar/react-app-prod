
import apiCalls from '../helpers/apiCalls/apiCalls'

class OrderData {




 static createOrder(userId){
        console.log('ORDER DAta'+ userId)
        return apiCalls.post({userId},'user/order',true)
 }


}
export default OrderData