import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


class Log extends Component {
    constructor(){
        super()
        this.apiUrl = "http://localhost:3500/api/logs/"

    }
    componentDidMount(){
        axios.get(this.apiUrl,{
            headers: {'username':sessionStorage.getItem("username")}
          }).then(
            (resp)=>{
                console.log("resp data",resp)
                this.props.getLogs(resp.data)
            },(err)=>{
                console.log("Error",err)
            }
        )
    }    
    handleDelete=(id)=>{
       
        axios.delete(this.apiUrl+id,{
            headers: {'username':sessionStorage.getItem("username")}
          }).then(
            (resp)=>{
                console.log("resp delete",resp)
                this.props.deleteLog(id)
            },(err)=>{
                console.log("Add error",err)
            }
            )

    }

    render(){
        let logs="";
        if(this.props.logs.length>0){
            console.log(this.props.logs)
            logs= this.props.logs.map((log)=>{
                    return(
                        <tr key={log._id}>
                        <th >{log.username}</th>
                            <td>{log.action}</td>
                            <td>{log.workflow}</td>
                            <td>{log.createdOn}</td>
                            <td>
                             <button className="btn btn-danger mr-1" onClick={()=>this.handleDelete(log._id)}>Delete</button>
                            </td>
                        </tr>
                    )
            })
        }else{
            logs =  "Logs Loading..."
        }
        return <div >
            <h4>Workflow Logs</h4>
            <table className="table table-bordered">
        <thead>
            <tr>
            <th >User Name</th>
            <th >Action</th>
            <th >Workflow</th>
            <th >Created Date</th>
            <th >Action</th>
            </tr>
        </thead>
        <tbody>
            {logs}
        </tbody>
        </table>
        
        </div>
    }

   

}
function mapStateToProps(state) {

    return {
        logs:state.logReducer
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getLogs:(data)=>{
            dispatch({
                type:"Get_Logs",payload:data
            })
        },
        deleteLog:(id)=>{
            dispatch({
                type:"Delete_Log",payload:id
            })
           },
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Log)