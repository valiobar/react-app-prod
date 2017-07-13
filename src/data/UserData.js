
import apiCalls from '../helpers/apiCalls/apiCalls'

class UserData {
     baseUrl = 'http://localhost:5000/api/users/register'

    static login(credentials){
        return apiCalls.post(credentials,'users/login')
    }

    static registerUser(user){
        return apiCalls.post(user,'users/register')

    }

   static getUser(userId){
        console.log('USER DATAT '+userId)
        return apiCalls.get('user/profile/'+userId,true)
    }

    static addToBasket(data){
        return apiCalls.post(data,'user/cart',true)
    }


}
export default UserData