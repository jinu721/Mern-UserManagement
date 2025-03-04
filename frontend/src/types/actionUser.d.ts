import { UserActionTypes } from "../redux/constants/actionTypes";
import { UserIF } from "./user";

export interface RegisterRequestAction {
  type: UserActionTypes.REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
  type: UserActionTypes.REGISTER_SUCCESS;
  payload: UserIF;
}

export interface RegisterFailAction {
  type: UserActionTypes.REGISTER_FAIL;
  payload: string;
}

export interface LoginRequestAction {
  type: UserActionTypes.LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: UserActionTypes.LOGIN_SUCCESS;
  payload: UserIF; 
}

export interface LoginFailAction {
  type: UserActionTypes.LOGIN_FAIL;
  payload: string;
}

export interface LogoutAction {
  type: UserActionTypes.LOGOUT;
}

export interface LoadUserAction {
  type: UserActionTypes.LOAD_USER;
  payload: UserIF; 
}

export interface UpdateProfileAction {
  type: UserActionTypes.UPDATE_PROFILE;
  payload: UserIF;
}

export type UserActions =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LoadUserAction
  | UpdateProfileAction;
