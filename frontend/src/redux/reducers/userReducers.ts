import { UserActions } from "../../types/actionUser";
import { UserIF } from "../../types/user";
import { UserActionTypes } from "../constants/actionTypes";

export interface StateIF {
    loader:boolean;
    user:UserIF | null;
    error:string | null;
}

const initalState:StateIF = {
    loader:false,
    user:JSON.parse(localStorage.getItem("userInfo") as string) || null,
    error:null
};

export const userReducer = (state:StateIF=initalState,action:UserActions)=>{
    switch(action.type){
        case UserActionTypes.REGISTER_REQUEST:
        case UserActionTypes.LOGIN_REQUEST:
        case UserActionTypes.USER_UPDATE_REQUEST:
            return {...state,loader:true};
        case UserActionTypes.REGISTER_SUCCESS:
        case UserActionTypes.LOGIN_SUCCESS:
        case UserActionTypes.USER_UPDATE_SUCCESS:
            return {...state,loader:false,user:action.payload,error:null};
        case UserActionTypes.REGISTER_FAIL:
        case UserActionTypes.LOGIN_FAIL:
        case UserActionTypes.USER_UPDATE_FAIL:
            return {...state,loader:false,error:action.payload};
        case UserActionTypes.LOGOUT:
            return {...state,user:null};
        default :
            return state;
    }
};


