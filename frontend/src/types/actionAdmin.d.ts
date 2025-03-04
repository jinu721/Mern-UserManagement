import { AdminActionTypes } from "../redux/constants/actionTypes";
import { UserIF } from "./user";

export interface AdminCreateUserRequestAction {
  type: AdminActionTypes.ADMIN_CREATE_USER_REQUEST;
}

export interface AdminCreateUserSuccessAction {
  type: AdminActionTypes.ADMIN_CREATE_USER_SUCCESS;
  payload: UserIF;
}

export interface AdminCreateUserFailAction {
  type: AdminActionTypes.ADMIN_CREATE_USER_FAIL;
  payload: string;
}

export interface AdminGetUsersRequestAction {
  type: AdminActionTypes.ADMIN_GET_USERS_REQUEST;
}

export interface AdminGetUsersSuccessAction {
  type: AdminActionTypes.ADMIN_GET_USERS_SUCCESS;
  payload: UserIF[];
}

export interface AdminGetUsersFailAction {
  type: AdminActionTypes.ADMIN_GET_USERS_FAIL;
  payload: string;
}

export interface AdminUpdateUserRequestAction {
  type: AdminActionTypes.ADMIN_UPDATE_USER_REQUEST;
}

export interface AdminUpdateUserSuccessAction {
  type: AdminActionTypes.ADMIN_UPDATE_USER_SUCCESS;
  payload: UserIF;
}

export interface AdminUpdateUserFailAction {
  type: AdminActionTypes.ADMIN_UPDATE_USER_FAIL;
  payload: string;
}

export interface AdminDeleteUserRequestAction {
  type: AdminActionTypes.ADMIN_DELETE_USER_REQUEST;
}

export interface AdminDeleteUserSuccessAction {
  type: AdminActionTypes.ADMIN_DELETE_USER_SUCCESS;
  payload: string;
}

export interface AdminDeleteUserFailAction {
  type: AdminActionTypes.ADMIN_DELETE_USER_FAIL;
  payload: string;
}

export type AdminActions =
  | AdminCreateUserRequestAction
  | AdminCreateUserSuccessAction
  | AdminCreateUserFailAction
  | AdminGetUsersRequestAction
  | AdminGetUsersSuccessAction
  | AdminGetUsersFailAction
  | AdminUpdateUserRequestAction
  | AdminUpdateUserSuccessAction
  | AdminUpdateUserFailAction
  | AdminDeleteUserRequestAction
  | AdminDeleteUserSuccessAction
  | AdminDeleteUserFailAction;
