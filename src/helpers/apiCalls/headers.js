import Auth from '../../common/appRouter/Auth'

export default (isAuth)=>{
   let nonAuthHeader={
        'Accept':'application/json',
            'Content-Type':'application/json'
    };
   let authHeader={
        'Accept':'application/json',
            'Content-Type':'application/json',
            'authorization': 'bearer '+Auth.getToken()
    };

    if(isAuth){
        return authHeader
    } else{
        return nonAuthHeader
    }
}