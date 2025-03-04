import { UserIF } from "../../types/user";
import { AdminActionTypes } from "../constants/actionTypes";

type AdminState = {
    users: UserIF[];
    loading: boolean;
    error: string | null;
};

const initialState: AdminState = {
    users: [],
    loading: false,
    error: null,
};

export const adminReducer = (state = initialState, action: any): AdminState => {
    switch (action.type) {
        case AdminActionTypes.ADMIN_GET_USERS_REQUEST:
        case AdminActionTypes.ADMIN_CREATE_USER_REQUEST:
        case AdminActionTypes.ADMIN_UPDATE_USER_REQUEST:
        case AdminActionTypes.ADMIN_DELETE_USER_REQUEST:
            return { ...state, loading: true };
        
        case AdminActionTypes.ADMIN_GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: null };
        
        case AdminActionTypes.ADMIN_CREATE_USER_SUCCESS:
            return { ...state, loading: false, users: [...state.users, action.payload], error: null };
        
        case AdminActionTypes.ADMIN_UPDATE_USER_SUCCESS:
            return { ...state, loading: false, users: state.users.map(user => user.id === action.payload.id ? action.payload : user), error: null };
        
        case AdminActionTypes.ADMIN_DELETE_USER_SUCCESS:
            return { ...state, loading: false, users: state.users.filter(user => user.id !== action.payload), error: null };
        
        case AdminActionTypes.ADMIN_GET_USERS_FAIL:
        case AdminActionTypes.ADMIN_CREATE_USER_FAIL:
        case AdminActionTypes.ADMIN_UPDATE_USER_FAIL:
        case AdminActionTypes.ADMIN_DELETE_USER_FAIL:
            return { ...state, loading: false, error: action.payload };
        
        default:
            return state;
    }
};
