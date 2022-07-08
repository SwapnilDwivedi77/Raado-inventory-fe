import { SAVE_LOGIN_INFO,USER_LOGOUT,FETCH_USER_PERMISSION_SUCCESS } from "../../constants/action";

const INITIAL_STATE = {
    userData : {},
    isLoggedin : false,
    userPermissions : [],
    refresh : false,
}

export const userLogin  = (user =INITIAL_STATE , action) => {
    switch (action.type) {
        case SAVE_LOGIN_INFO:
            return {
                ...user,
                userData : action.payload,
                userPermissions : action.payload.permissions,
                 isLoggedin : true
                }
        case USER_LOGOUT:
            return {...user,isLoggedin : false}
        case FETCH_USER_PERMISSION_SUCCESS :
            return {
                ...user,
                userPermissions  :action.payload.permissions
            }
        default:
            return user;
    }
}

