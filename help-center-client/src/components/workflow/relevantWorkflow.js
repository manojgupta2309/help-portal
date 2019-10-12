import React,{Component} from 'react'
import {  Link } from 'react-router-dom';
import {connect} from 'react-redux'

class RelevantWorkflow extends Component{
   
    render(){
        let relevantList ="";
        if(this.props.workflows.length>0){
            relevantList = this.props.workflows.map((workflow)=>{
                    return <li  key={workflow._id}> <Link className="nav-link" to={`/workflowDetail/${workflow._id}`}>{workflow.workflow}</Link></li>
                    
                })
        }else{
            relevantList=<li>No Relevant Workflow Found</li>
        }
        return <div>
              <ul>
              {relevantList}
              </ul>
               
            </div>
        
    }
}
function mapStateToProps(state,ownProps) {
    let workflowType = ownProps.match.params.workflowType;
    console.log(state,workflowType)
    return {
        workflows:state.workflowReducer.filter((w)=>w.workflowType===workflowType)
    }
}
export default connect(mapStateToProps)(RelevantWorkflow)