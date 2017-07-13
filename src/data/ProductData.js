
import apiCalls from '../helpers/apiCalls/apiCalls'

class ProductData {
     baseUrl = 'http://localhost:5000/api/users/register'

    static uploadImage(image){
        console.log(image)
        return apiCalls.uploadImage(image)
    }

 static createProduct(product){
        console.log(JSON.stringify(product))
        return apiCalls.post(product,'admin/product/create',true)
 }
    static fetchProducts(page){
     console.log('Data '+ page)
        return apiCalls.get('product/all?page='+page)
    }

}
export default ProductData