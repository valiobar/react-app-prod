import dispatcher from '../dispatcher'
import categoryStore from '../stores/CategoryStore'


const categoryActions = {
    types: {
        CREATE_CATEGORY: 'CREATE_CATEGORY',
        GET_ALL_CATEGORY: 'GET_ALL_CATEGORY',
    },
    createCategory(category){
        console.log(category)
        dispatcher.dispatch({
            type: 'CREATE_CATEGORY',
            category
        })
    },
    gatAll(){
        console.log('action get all')
        dispatcher.dispatch({
            type: this.types.GET_ALL_CATEGORY,

        })
    }
}
export default categoryActions