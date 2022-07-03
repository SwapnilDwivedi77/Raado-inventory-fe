import { combineReducers } from 'redux';
import {userLogin} from './reducers/user'
import {selectedProcessReducer} from './reducers/selectedProcessReducer'
import userSignUp from './reducers/userSignUp'
import userLoginCall from './reducers/userLogin'
import activityLogs from './reducers/activityLogs'
import approvalList from './reducers/approvalList'
import postNewRequest from './reducers/postNewRequest'
import allUsers from './reducers/allUser'
import updateUserPermission from './reducers/updatePermission'
import approveTrxn from './reducers/approveTrxn'
import staticResources from './reducers/staticResources'

export default combineReducers({ 
    user:userLogin,
    selectedProcess : selectedProcessReducer,
    userSignUp : userSignUp,
    userLogin : userLoginCall,
    activityLogs : activityLogs,
    approvalList: approvalList,
    postNewRequest : postNewRequest,
    allUsers : allUsers,
    updatePermission  : updateUserPermission,
    approveTrxn:approveTrxn,
    staticResources:staticResources
});