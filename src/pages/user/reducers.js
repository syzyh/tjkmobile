const initialState = {
  updating: false,
  error: null,
  hasLogin: false,
  user: null,
  myDiscussions: [],
};

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case "start_updating_user":
    case "start_updating_subscription":
    case "start_signout_user":
    case "start_fetching_myDiscussions":
      return {
        ...state,
        updating: true,
        error: null,
      }

    case "updating_user_failure":
    case "fetching_myDiscussions_failure":
    case "updating_subscription_failure":
    case "signout_user_failure":
      return {
        ...state,
        updating: false,
        error: action.error,
      }

    case "updating_user_success":
      return {
        ...state,
        updating: false,
        error: null,
        hasLogin: true,
        user: action.payload,
      };

    case "updating_subscription_success":
      return {
        ...state,
        updating: false,
        user: action.payload,
        error: null,
      }

    case "signout_user_success":
      return {
        ...state,
        updating: false,
        error: null,
        hasLogin: false,
        user: null,
      }

    case "fetching_myDiscussions_success":
    case "updating_myDiscussions_success":
      return {
        ...state,
        updating: false,
        error: null,
        myDiscussions: action.payload
      }
    default:
      return state;
  }
};