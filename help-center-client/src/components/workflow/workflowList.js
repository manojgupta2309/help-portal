import React,{Component} from 'react'
import {connect} from 'react-redux'

class WorkflowList extends Component {

    constructor(){ 
        super()
    }

    render(){

        let output="";
        if(this.props.workflows.length>0){
           output= this.props.workflows.map((workflow)=>{
                    return(
                        <div>
                            <h1>{workflow.workflow}</h1>
                            <h5>{workflow.workflowType}</h5>
                            <p>{workflow.description}</p>
                        </div>
                    )
            })
        }else{
            output = "No Workflow Found"
        }
        return <div>
            <h4>Workflow List</h4>
            <div className="card-deck">
                {output}
            </div>
            </div>
        }
  

}

function mapStateToProps(state){
    return {
        workflows : state.workflowReducer 
    }
}
function mapDispatchToProps(dispatch){
    
    return {
        
        addToWorkflow : (workflow)=>{
           // console.log("product",product)
            let workflowItem = {
                name:workflow.name,
                "workflowType":workflow.workflowType,
                "description":workflow.description
            }
            dispatch({type:"Add_Workflow", payload:workflowItem})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkflowList) 