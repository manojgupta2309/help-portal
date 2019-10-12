import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import {BrowserRouter} from 'react-router-dom'
import {createStore , combineReducers} from 'redux'
import {Provider} from 'react-redux'

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import {workflowReducer,logReducer,authReducer} from './reducers/rootReducer'

const appStore  = createStore(combineReducers({workflowReducer,logReducer,authReducer})) 
ReactDOM.render(
    <Provider store={appStore}>
    <BrowserRouter>
    <App/></BrowserRouter>
    </Provider>,document.getElementById("root"))




