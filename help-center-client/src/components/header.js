import React,{Component} from 'react'
import {connect} from 'react-redux'

class Header extends Component{
    constructor(){
        super()
        this.state = {
            appHeading : "Help Center",
            loginStatus:false
        }
    }
   render(){
       let auth="Login";
       if(this.props.isAuth)
        auth = "Logout"


        return  <nav className="navbar navbar-expand-lg navbar-dark bg-dark" align="center">
            <a href="/" className="navbar navbar-brand">{this.state.appHeading}</a>
                <ul className="navbar-nav mr-auto">
                  </ul>
                <ul className="navbar-nav">
                    <li className="nav-item mr-5">
                    <a className="nav-link"  href="/login">{auth}</a>
                    </li>
                   
                </ul>
        </nav>
    
    }
}
function mapStateToProps(state) {
console.log(state)
    return {
        isAuth:state.authReducer.isAuth
    }
}



export default connect(mapStateToProps)(Header)
