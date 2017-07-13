import {EventEmitter} from 'events';
import dispatcher from '../dispatcher'
import CategotyActions from '../actions/CategotyActions'
import CategoryData from '../data/CategoryData'


class CategoryStore extends EventEmitter {
    eventTypes = {
        CATEGORY_CREATED: 'category_created',
        ALL_CATEGORIES_FETCHED:'all_categories_fetched'
    };


    createCategory(category) {
        console.log(JSON.stringify(category));
        CategoryData.createCategory(category)
            .then((data)=>{
            console.log(data)
                this.emit(this.eventTypes.CATEGORY_CREATED, data)})
            .catch(error=>console.log(error))
    }

    getAll(){
        console.log('store get all')
        CategoryData.getAll()
            .then((data)=>{
                console.log(data)
                this.emit(this.eventTypes.ALL_CATEGORIES_FETCHED, data)})
            .catch(error=>console.log(error))
    }

    handleAction(action) {
        console.log('reg store' + action);
        switch (action.type) {
            case CategotyActions.types.CREATE_CATEGORY: {
                this.createCategory(action.category);
                break;}
            case CategotyActions.types.GET_ALL_CATEGORY: {
                    this.getAll();
                    break;
            }
            default:
                break
        }

    }


}


let categoryStore = new CategoryStore();

dispatcher.register(categoryStore.handleAction.bind(categoryStore));

export default categoryStore