export default (productModel)=> {

    let name = productModel.name;
    let price= productModel.price;

    let isValid = true;
    let errors = {
        name:'',
        price:''
    }
    console.log(this.firstName)



    if (typeof name !== 'string' || name.trim().length <3){
        isValid=false;
        errors.name='Product name must be at least 3 symbols';

    }
    console.log(typeof price)
    if (typeof +price !== 'number' || price <0){
        isValid=false;
        errors.price='Price is not valid';

    }

    return {
        isValid:isValid,
        errors:errors
    }
}
