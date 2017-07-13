import dispatcher from '../dispatcher'
import categoryStore from '../stores/CategoryStore'


const categoryActions = {
    types: {
        UPLOAD_IMAGE: 'UPLOAD_IMAGE',
        FETCH_PRODUCTS:'FETCH_PRODUCTS',
        CREATE_PRODUCT: 'CREATE_PRODUCT',
    },
    createProduct(product){
        console.log(product)
        dispatcher.dispatch({
            type: this.types.CREATE_PRODUCT,
            product
        })
    },

    fetchProducts(page){
        dispatcher.dispatch({
            type: this.types.FETCH_PRODUCTS,
             page
        })
    },
    uploadImage(image){

        dispatcher.dispatch({
            type: this.types.UPLOAD_IMAGE,
            image
        })
    }

  /*  gatAll(){
        console.log('action get all')
        dispatcher.dispatch({
            type: this.types.GET_ALL_CATEGORY,

        })
    }*/
}
export default categoryActions