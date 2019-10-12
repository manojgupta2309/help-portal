import React,{Component} from 'react'
import Header from './header';
import Admin from './admin/admin';
import Workflow from './workflow/workflow';
import Login from './login'


class App extends Component{
    
 

  
  render(){
    console.log(window.location.pathname);
    let container = "";
     if(window.location.pathname==="/admin")
     container=<Admin/>
     else if(window.location.pathname==="/login")
     container=<Login/>
     else if(window.location.pathname==="/")
      container = <Workflow/>

        return <div>
             <Header></Header>
            <br/>
           {container}
            </div>

    }
}


export default App

