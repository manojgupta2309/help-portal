import React,{Component} from 'react'
import { Route, Link,Switch } from 'react-router-dom';
import ManageWorkflow from './manageworkflow';
import Log from './log'
import WorkflowList from './workflowList'

class Admin extends Component{
    constructor(){
        super()
        this.state={
            username:sessionStorage.getItem("username")
        }
    }
   render(){
       return <div className="row">
                <div className="col-md-3">
                <ul>
                    <li> <Link className="nav-link" to="/admin/manageWorkflow">Manage Workflow</Link></li>
                    <li> <Link className="nav-link" to="/admin/logs">Logs</Link></li>
                    <li> <Link className="nav-link" to="/admin/workflowList">Workflow List</Link></li>
                </ul>
                </div>
                <div className="col-md-9">
               <Switch>
                <Route exact path='/admin'  render={() => <h2>Welcome {this.state.username}</h2>} />
                <Route path='/admin/manageWorkflow' component={ManageWorkflow} />
                <Route path='/admin/logs' component={Log} />
                <Route path='/admin/workflowList' component={WorkflowList} />
                </Switch>
                </div>
                </div>
              

    }
}


export default Admin

