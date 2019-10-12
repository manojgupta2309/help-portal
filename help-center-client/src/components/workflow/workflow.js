import React,{Component} from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import {connect} from 'react-redux'
import  WorkflowDetail  from './workflowdetail';
import RelevantWorkflow from './relevantWorkflow';
import axios from 'axios'

class Workflow extends Component{
    
    constructor(){
        super()
        this.apiUrl = "http://localhost:3500/api/workflow/"

    }
    componentDidMount(){
        axios.get(this.apiUrl).then(
            (resp)=>{
                console.log("resp data",resp)
                this.props.getWorkflows(resp.data)
            },(err)=>{
                console.log("Error",err)
            }
        )
    }   
  render(){
        let sideMenu ="";
        if(this.props.workflows.length>0){
            sideMenu = this.props.workflows.map((workflow)=>{
                    return <li  key={workflow._id}> <Link className="nav-link" to={`/workflowDetail/${workflow._id}`}>{workflow.workflow}</Link></li>
                    
                })
        }else{
            sideMenu="Workflow Loading.."
        }
        
        return  <div className="row">
                <div className="col-md-3">
                <ul>
                    {sideMenu}
                </ul>
                </div>
                <div className="col-md-9">
                <Switch>
                <Route exact path='/'  render={() => <h2>Help Center</h2>} />
                <Route path='/workflowDetail/:id' component={WorkflowDetail} />
                <Route path='/relevantWorkflow/:workflowType' component={RelevantWorkflow} />
                </Switch>
                </div>
                </div>
             

    }
}
function mapStateToProps(state) {
console.log(state)
    return {
        workflows:state.workflowReducer
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getWorkflows:(data)=>{
            dispatch({
                type:"Get_Workflows",payload:data
            })
        }
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Workflow)

