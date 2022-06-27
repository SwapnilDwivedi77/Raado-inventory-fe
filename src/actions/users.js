import { SAVE_LOGIN_INFO,USER_LOGOUT } from "../constants/action";

export const saveLoginDetails = (login) => ({ type: SAVE_LOGIN_INFO, payload : login});

export const logoutUser = () => ({type: USER_LOGOUT})