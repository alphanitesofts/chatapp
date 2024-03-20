import {
  LOGIN,
  LOGOUT,
  USERID,
  THEME,
  USERPROFILE,
  TOASTMESSAGE
} from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  authenticationToken: '',
  userId: "",
  appTheme:"light"
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        userId: "",
        authenticationToken: ""
      };
    case LOGIN:
      return {
        ...state,
        authenticationToken: action.response,
      }
    case USERID:
      return {
        ...state,
        userId: action.response
      }
    case THEME:
      return {
        ...state,
        appTheme: action.response
      }
    case USERPROFILE:
      return {
        ...state,
        userDetails: action.response
      }
    case TOASTMESSAGE:
      return {
        ...state,
        toastMessage: action.response
      }
    default:
      return state;
  }
}
