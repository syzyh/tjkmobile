const initialState = {
  fetching: false,
  error: null,
  discussion: null,
};

export const discussionReducer = (state = initialState, action) => {
  switch(action.type) {
    case "start_fetching_discussion":
    case "start_updating_discussion":
      return {
        ...state,
        fetching: true,
        error: null,
      }

    case "fetching_discussion_success":
    case "updating_discussion_success":
      return {
        ...state,
        fetching: false,
        discussion: action.payload,
      };

    case "fetching_discussion_failure":
    case "updating_discussion_failure":
      return {
        ...state,
        fetching: false,
        error: action.error,
      }

    default:
      return state;
  }
};