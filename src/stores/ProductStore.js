import {EventEmitter} from 'events';
import dispatcher from '../dispatcher'
import ProductActions from '../actions/ProductActions'
import productData from '../data/ProductData'


class ProductStore extends EventEmitter {
    eventTypes = {
        PRODUCT_CREATED: 'product_created',
        IMAGE_UPLOADED: 'image_uploaded',
        PRODUCTS_FETCHED:'products_fetched'
    };


    createProduct(product) {
        console.log(JSON.stringify(product));
        productData.createProduct(product)
            .then((data) => {
                console.log(data)
                this.emit(this.eventTypes.PRODUCT_CREATED, data)
            })
            .catch(error => console.log(error))
    }

    uploadImage(image) {

        productData.uploadImage(image)
            .then((data) => {
                console.log(data)
                this.emit(this.eventTypes.IMAGE_UPLOADED, data)
            })
            .catch(error => console.log(error))
    }

    fetchProducts(page){
        productData.fetchProducts(page)
            .then((data) => {
                console.log(data)
                this.emit(this.eventTypes.PRODUCTS_FETCHED, data)
            })
            .catch(error => console.log(error))

    }


    handleAction(action) {
        console.log('reg store' + action.type);
        switch (action.type) {
            case ProductActions.types.CREATE_PRODUCT: {
                this.createProduct(action.product);
                break;
            }
            case ProductActions.types.UPLOAD_IMAGE: {
                this.uploadImage(action.image);
                break;
            }
            case ProductActions.types.FETCH_PRODUCTS: {
                this.fetchProducts(action.page);
                break;
            }
            default:
                break
        }

    }


}


let productStore = new ProductStore();

dispatcher.register(productStore.handleAction.bind(productStore));

export default productStore