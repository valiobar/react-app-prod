import React from 'react'
import Auth from '../appRouter/Auth'
import {Link} from 'react-router-dom'
import userStore from '../../stores/UserStore'

import toastr from 'toastr'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username:""
        }
        this.handelUserLoggedIn = this.handelUserLoggedIn.bind(this)
        userStore.on(userStore.evetTypes.USER_LOGED, this.handelUserLoggedIn)
    }


    handelUserLoggedIn(data) {
        if (data.success) {
            this.setState({username: data.user.firstName})
        }
    }
    componentWillMount(){
        if(Auth.getUser()){
            this.setState({username: Auth.getUser().firstName})
        }
    }

    componentWillUnmount() {
        userStore.removeListener(userStore.evetTypes.USER_LOGED, this.handelUserLoggedIn)
    }
showToastr(){


}

    render() {
        return (
<div>

            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNav" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" ><img src="https://res.cloudinary.com/dqyb8sdlc/image/upload/c_thumb,w_50,h_50/gjgf7uh23z4w7rjyak8x.png" alt=""/></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNav">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>

                    </ul>
                    {Auth.isUserAuthenticated() ? (<ul className="nav navbar-nav navbar-right">

                        <li><Link to="/user/profile">
                            <span className="glyphicon glyphicon-user"></span> {this.state.username}</Link></li>
                        <li><Link to="/user/logout">
                            <span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>

                    </ul>) : (
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/user/register"><span className="glyphicon glyphicon-user"></span>
                                Register</Link></li>
                            <li><Link to="/user/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link>
                            </li>
                        </ul>
                    )}
                    {Auth.isUserAuthenticated()&&Auth.getUser().roles.indexOf('Admin')>-1?(
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/admin/panel">
                                <span className="glyphicon glyphicon-edit"></span> Admin Panel</Link></li>
                        </ul>
                    ):(<ul>
                       </ul>)}


                    </div>
                </div>
            </nav>


</div>


        )
    }
}
export default Header