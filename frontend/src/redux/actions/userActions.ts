import { UserActionTypes } from "../constants/actionTypes";
import { axiosInstance } from "../../services/apiServices";
import { Dispatch } from "redux";
import { data } from "react-router-dom";


export const registerUser = (formData:{username:string,email:string,password:string})=> async (dispatch:Dispatch)=>{
    try{
        dispatch({type:UserActionTypes.REGISTER_REQUEST});
        const response = await axiosInstance.post('/users/register',{
            username:formData.username,
            email:formData.email,
            password:formData.password
        });
        if(response.status === 200){
            console.log(response)
            dispatch({type:UserActionTypes.REGISTER_SUCCESS,payload:response.data.user.user});
            localStorage.setItem('userInfo',JSON.stringify(response.data.user.user));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            return true;
        }
        return false;
    }catch(err){
        if(err instanceof Error){
            dispatch({type:UserActionTypes.REGISTER_FAIL,payload:err.message});
        }else{
            dispatch({type:UserActionTypes.REGISTER_FAIL,payload:'An Unexpected Error Occured'});
        }
    }
};
export const loginUser = (formData:{email:string,password:string})=> async (dispatch:Dispatch)=>{
    try{
        dispatch({type:UserActionTypes.LOGIN_REQUEST});
        const response = await axiosInstance.post('/users/login',{
            email:formData.email,
            password:formData.password
        });
        console.log(response.data.user)
        if(response.status === 200){
            dispatch({type:UserActionTypes.LOGIN_SUCCESS,payload:response.data.user});
            localStorage.setItem('userInfo',JSON.stringify(response.data.user));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            return true;
        }else{
            console.log('Failed',response.data.data)
            dispatch({type:UserActionTypes.LOGIN_SUCCESS,payload:response.data.message});
        }
        return false;
    }catch(err : any){
        console.log(err)
        if(err instanceof Error){
            dispatch({type:UserActionTypes.LOGIN_FAIL,payload:'Invalid credentials'});
        }else{
            dispatch({type:UserActionTypes.LOGIN_FAIL,payload:'An Unexpected Error Occured'});
        }
    }
};

export const updateUser = (formData: { id: string; username: string; email: string; avatar: File }) => 
  async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UserActionTypes.USER_UPDATE_REQUEST });

    console.log('Avatar File:', formData.avatar);


    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    const { data } = await axiosInstance.post(`/users/update/profile/${formData.id}`, formDataToSend, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
    localStorage.setItem('userInfo',JSON.stringify(data.user));
    dispatch({ type: UserActionTypes.USER_UPDATE_SUCCESS, payload: data.user });
    return true;
  } catch (error) {
    console.log(error)
    dispatch({
      type:UserActionTypes.USER_UPDATE_FAIL,
      payload: error.response?.data?.message || "Profile update failed",
    });
    return false;
  }
};


export const logoutUser = ()=> (dispatch:Dispatch)=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    dispatch({type:UserActionTypes.LOGOUT});
}

