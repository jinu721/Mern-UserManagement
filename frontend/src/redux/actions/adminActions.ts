import { AdminActionTypes } from "../constants/actionTypes";
import { axiosInstance } from "../../services/apiServices";
import { Dispatch } from "redux";
import { UserIF } from "../../types/user";

export const fetchUsers = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: AdminActionTypes.ADMIN_GET_USERS_REQUEST });
        const response = await axiosInstance.get('admin/users');
        dispatch({ 
            type: AdminActionTypes.ADMIN_GET_USERS_SUCCESS, 
            payload: response.data.users
        });
    } catch (err: any) {
        dispatch({ 
            type: AdminActionTypes.ADMIN_GET_USERS_FAIL, 
            payload: 'Failed to Fetch Users' 
        });
    }
};

export const addUser = (userData: any) => async (dispatch: Dispatch) => {
    try {
        console.log(userData)
        dispatch({ type: AdminActionTypes.ADMIN_CREATE_USER_REQUEST });
        const response = await axiosInstance.post('admin/users', userData);
        dispatch({ 
            type: AdminActionTypes.ADMIN_CREATE_USER_SUCCESS, 
            payload: response.data.user
        });
    } catch (err: any) {
        dispatch({ 
            type: AdminActionTypes.ADMIN_CREATE_USER_FAIL, 
            payload: 'Failed to Create User' 
        });
    }
};

export const updateUser = (userData: UserIF) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: AdminActionTypes.ADMIN_UPDATE_USER_REQUEST });
        const response = await axiosInstance.put(`admin/users/${userData.id}`, userData);
        dispatch({ 
            type: AdminActionTypes.ADMIN_UPDATE_USER_SUCCESS, 
            payload: response.data.user
        });
        return true;
    } catch (err: any) {
        dispatch({ 
            type: AdminActionTypes.ADMIN_UPDATE_USER_FAIL, 
            payload: 'User already Exist' 
        });
        return false;
    }
};

export const deleteUser = (userId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: AdminActionTypes.ADMIN_DELETE_USER_REQUEST });
        await axiosInstance.delete(`admin/users/${userId}`);
        dispatch({ 
            type: AdminActionTypes.ADMIN_DELETE_USER_SUCCESS, 
            payload: userId 
        });
    } catch (err: any) {
        dispatch({ 
            type: AdminActionTypes.ADMIN_DELETE_USER_FAIL, 
            payload: 'Failed to Delete User' 
        });
    }
};