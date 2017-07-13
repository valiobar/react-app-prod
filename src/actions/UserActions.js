import dispatcher from '../dispatcher'
import userstore from '../stores/UserStore'


const userActions = {
    types: {
        REGISTER_USER: 'REGISTER_USER',
        LOGIN_USER:'LOGIN_USER',
        ADD_TO_BASKET:'ADD_TO_BASKET',
        GET_USER:'GET_USER'
    },

    getUser(userId){
        dispatcher.dispatch({
            type: 'GET_USER',
            userId
        })
    },
    register(user){
        console.log(userstore)
        dispatcher.dispatch({
            type: 'REGISTER_USER',
            user
        })
    },
    login(credentials){
        console.log(credentials)
        dispatcher.dispatch({
            type: 'LOGIN_USER',
            credentials
        })
    },
    addToUserBasket(data){
        console.log(data)
        dispatcher.dispatch({
            type: 'ADD_TO_BASKET',
            data
        })
    }
}
export default userActions