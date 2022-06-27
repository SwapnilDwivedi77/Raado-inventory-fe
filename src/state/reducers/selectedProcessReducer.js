import { SET_SELECTED_PROCESS } from "../../constants/action";

const INITIAL_STATE = {
    value : {}
}

export const selectedProcessReducer  = (process = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SELECTED_PROCESS:
            return {...process,value:action.payload}
       
        default:
            return process;
    }
}

