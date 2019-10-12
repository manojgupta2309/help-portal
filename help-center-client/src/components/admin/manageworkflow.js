import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


class ManageWorkflow extends Component {
    constructor(){
        super()
        this.apiUrl = "http://localhost:3500/api/workflow/"
        this.state = {
            workflow: "",
            workflowType:"",
            description: ""
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

    handleAdd=()=>{
        let newWorkflow = {
           "workflow": this.state.workflow,
            "workflowType": this.state.workflowType,
            "description": this.state.description
        }
       console.log("workflow",newWorkflow)
        axios.post(this.apiUrl,newWorkflow,{
            headers: {'username':sessionStorage.getItem("username")}
          }).then(
            (resp)=>{
                console.log("resp post",resp)
                this.props.addWorkflow(resp.data)
                this.setState({
                    workflow: "",
                    workflowType:"",
                    description: ""
                  })
            },(err)=>{
                console.log("Add error",err)
            }
            )

    }
    handleDelete=(id)=>{
       
        axios.delete(this.apiUrl+id,{
            headers: {'username':sessionStorage.getItem("username")}
          }).then(
            (resp)=>{
                console.log("resp delete",resp)
                this.props.deleteWorkflow(id)
            },(err)=>{
                console.log("Add error",err)
            }
            )

    }
  
    render(){
        let output ="";
        if(this.props.mgWorkflows.length>0){
                output = this.props.mgWorkflows.map((workflow)=>{
                    return <tr key={workflow._id}>
                        <td>{workflow.workflow}</td>
                        <td>{workflow.workflowType}</td>
                        <td>{workflow.description}</td>
                        <td>
                        <button className="btn btn-danger mr-1" onClick={()=>this.handleDelete(workflow._id)}>Delete</button>
                        </td>
                    </tr>
                })
        }else{
            output=<tr><td colSpan="3">Workflows Loading..</td></tr>
        }
        return <div>
            <h4>Mange Workflows</h4>
            <form className="form-group">
                <div className="row">
                <div className="col-md-6">
                <label>Workflow</label>
                <input type="text" className="form-control"  name="workflow"  value={this.state.workflow}
                onChange={this.handleInputChange}  />
               </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                <label>Workflow Type</label>
                <select className="form-control" name="workflowType"   value={this.state.workflowType}
                onChange={this.handleInputChange} >
                <option defaultValue>Select Domain</option>
                <option value="Technology">Technology</option>
                <option value="Bussiness">Business</option>
                <option value="Customer">Customer</option>
                <option value="Products">Products</option> 
                </select>
                 </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                <label>Description</label>
                <textarea type="text" className="form-control" name="description"value={this.state.description}
                onChange={this.handleInputChange}  ></textarea>
                </div>
               </div>
                <div className="form-group mt-2" >
                <button type="button"  className="btn btn-success mr-1" onClick={this.handleAdd} >Add</button>
                </div>
                
            </form>
            <table className= "table table-bordered ">
                <thead>
                    <tr>
                        <th>Workflow</th><th>Workflow Type</th><th>Description</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {output}
                </tbody>
            </table>
        
        </div>
    }

   

}
function mapStateToProps(state) {

    return {
        mgWorkflows:state.workflowReducer
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getWorkflows:(data)=>{
            dispatch({
                type:"Get_Workflows",payload:data
            })
        },
       addWorkflow:(newWorkflow)=>{
        dispatch({
            type:"Add_Workflow",payload:newWorkflow
        })
       },
       deleteWorkflow:(id)=>{
        dispatch({
            type:"Delete_Workflow",payload:id
        })
       },
       updateWorkflow:(modifiedWorkflow)=>{
        dispatch({
            type:"Update_Workflow",payload:modifiedWorkflow
        })
       }  
       
    }
    
}


export default connect(mapStateToProps,mapDispatchToProps)(ManageWorkflow)