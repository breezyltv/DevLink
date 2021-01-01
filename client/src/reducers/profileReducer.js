import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE
} from "../actions/actionTypes";
const init = {
  profile: null,
  profiles: null
};

const profileReducer = (state = init, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
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
