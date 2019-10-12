import React,{Component} from 'react'
import axios from 'axios'

class Login extends Component{
    constructor(){
        super()
        sessionStorage.removeItem("username")
        this.apiUrl = "http://localhost:3500/api/auth/login/"
        this.state = {
            username: "",
            password:"",
            navigate: false
          };
          
          this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
   
    handleLogin=()=>{
        
        let user = {
           username: this.state.username,
            password: this.state.password
        }
        //console.log("login",user)
        axios.post(this.apiUrl,user).then(
            (resp)=>{
                console.log("resp post",resp)
                if(resp.data.auth){
                    sessionStorage.setItem("username",resp.data.username)
                    //this.setState({ navigate: true })
                    window.location.href = "/admin"
                }
             },(err)=>{
                console.log("Add error",err)
            }
            )

    }
    render(){
       
        return<div className="form">
        <div className="col-md-4">
            <h3>Admin Login</h3>
                <div className="form-group">
                <label >username</label>
                    <input type="text"  name="username" className="form-control"  value={this.state.username}
                    onChange={this.handleInputChange} />
                </div>

                <div className="form-group">
                <label>password</label>
                    <input type="password"   name="password" className="form-control"  value={this.state.password}
                    onChange={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={this.handleLogin}>Login</button>
                    <span className="text-danger">{ this.state.error }</span>
                </div>

            </div>
        </div>
   
     }
}

export default Login