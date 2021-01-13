import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  GET_ADMIN_PROFILE,
  PROFILE_LOADING
} from "../actions/actionTypes";
const init = {
  profile: null,
  profiles: null,
  profile_admin: null,
  loading: false
};

const profileReducer = (state = init, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_ADMIN_PROFILE:
      return {
        ...state,
        profile_admin: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};

export default profileReducer;
