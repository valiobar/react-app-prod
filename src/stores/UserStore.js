import {EventEmitter} from 'events';
import dispatcher from '../dispatcher'
import UserAction from '../actions/UserActions'
import userData from '../data/UserData'


class UserStore extends EventEmitter {
    evetTypes = {
        USER_REGISTERD: 'user_registered',
        USER_LOGED: 'USER_LOGED',
        ITEM_ADDED_TO_BASKET: 'item_added_to_basket',
        USER_FETCHED: 'user_fetched'
    };

    loginUser(credentials) {
        console.log('store')
        console.log(credentials)
        userData.login(credentials)
            .then(data=> {
                console.log(data)
                this.emit(this.evetTypes.USER_LOGED, data)
            })
    }

    registerUser(user) {
        console.log('reg store');
        userData.registerUser(user)
            .then((data)=> {

                this.emit(this.evetTypes.USER_REGISTERD, data)
            })
            .catch(error=>console.log(error))
    }

    addToBasket(data) {

        userData.addToBasket(data)
            .then((data)=> {
                this.emit(this.evetTypes.ITEM_ADDED_TO_BASKET, data)
            })
            .catch(error=>console.log(error))
    }

    getUser(userId) {
        userData.getUser(userId)
            .then(data=> {
                this.emit(this.evetTypes.USER_FETCHED, data)
            })
            .catch(error=>console.log(error))
    }

    handleAction(action) {
        console.log('reg store' + action);
        switch (action.type) {
            case UserAction.types.REGISTER_USER: {
                this.registerUser(action.user);
                break;
            }
            case UserAction.types.LOGIN_USER: {
                this.loginUser(action.credentials);
                break;
            }
            case UserAction.types.ADD_TO_BASKET: {
                this.addToBasket(action.data)
                break;
            }
            case UserAction.types.GET_USER: {
                this.getUser(action.userId)
                break;
            }
            default:
                break
        }

    }


}


let userStore = new UserStore();

dispatcher.register(userStore.handleAction.bind(userStore));

export default userStore