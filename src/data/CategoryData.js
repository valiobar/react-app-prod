
import apiCalls from '../helpers/apiCalls/apiCalls'

class CategoryData {
     baseUrl = 'http://localhost:5000/api/users/register'

    static createCategory(category,){
        console.log(category)
        return apiCalls.post(category,'admin/category/create',true)
    }

    static getAll(){
        console.log('category data get all')
        return apiCalls.get('admin/category/all',true)
    }



}
export default CategoryData