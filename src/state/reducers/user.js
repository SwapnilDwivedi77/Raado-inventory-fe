import { SAVE_LOGIN_INFO,USER_LOGOUT } from "../../constants/action";

const INITIAL_STATE = {
    userData : {},
    isLoggedin : false,
    refresh : false,
}

export const userLogin  = (user =INITIAL_STATE , action) => {
    switch (action.type) {
        case SAVE_LOGIN_INFO:
            return {
                ...user,
                userData : action.payload,
                 isLoggedin : true
                }
        case USER_LOGOUT:
            return {...user,isLoggedin : false}
        default:
            return user;
    }
}

