//auth actions...
import {
  LOGOUT,
  LOGIN,
  USERID,
  THEME,
  USERPROFILE,
  TOASTMESSAGE,
} from './types';

export const logoutUser = () => ({
  type: LOGOUT
})
export const loginInResponse = (response) => ({
  type: LOGIN,
  response,
})
export const userIdResponse = (response) => ({
  type: USERID,
  response
})
export const changeTheme = (response) => ({
  type: THEME,
  response
})
export const setUser = (response) => ({
  type: USERPROFILE,
  response
})
export const setToastMessage = (response) => ({
  type: TOASTMESSAGE,
  response
})