import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


class WorkflowList extends Component {
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
        let workflows="";
        if(this.props.workflows.length>0){
            workflows= this.props.workflows.map((workflow)=>{
                    return(
                        <tr key={workflow._id}>
                             <th>{workflow.workflow}</th>
                            <td>{workflow.workflowType}</td>
                            <td>{workflow.modifiedOn}</td>
                            <td>{workflow.createdOn}</td>
                        </tr>
                    )
            })
        }else{
            workflows = "Loding Workflows..."
        }
        return <div>
            <h4>Workflow List</h4>
            <table className="table table-bordered">
        <thead>
            <tr>
            <th >Workflow</th>
            <th >Workflow Type</th>
            <th >Modified Date</th>
            <th >Created Date</th>
            </tr>
        </thead>
        <tbody>
            {workflows}
          
        </tbody>
        </table>
        
        </div>

    }

   

}
function mapStateToProps(state) {

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


export default connect(mapStateToProps,mapDispatchToProps)(WorkflowList)