import React,{Component} from 'react'
import {  Link } from 'react-router-dom';
import {connect} from 'react-redux'

class WorkflowDetail extends Component{
    
    render(){
        //console.log("workflow detail",this.props.workflow)
        return <div>
               <h3>{this.props.workflow.workflow}</h3> 
               <h5>{this.props.workflow.workflowType}</h5>
               <p>{this.props.workflow.description}</p>

                <br/>
                <br/>
                <br/>
                <Link  to={`/relevantWorkflow/${this.props.workflow.workflowType}`}>Relevant Workflow</Link>
            </div>
        
    }
}
function mapStateToProps(state,ownProps) {
    let id = ownProps.match.params.id;
    return {
        workflow:state.workflowReducer.find((w)=>w._id===id)
    }
}
export default connect(mapStateToProps)(WorkflowDetail)