const initialState = {
  fetching: false,
  updating:false,
  error: null,
  discussions: [],
  department: null,
  audios: [],
};

export const branchReducer = (state = initialState, action) => {
  switch(action.type) {
    case "start_fetching_discussions":
    case "start_fetching_department":
    case "start_fetching_audios":
      return {
        ...state,
        fetching: true,
        error: null,
      }

    case "fetching_discussions_success":
        return {
          ...state,
          fetching: false,
          discussions: action.payload,
        };
    
    case "fetching_department_success":
        return {
          ...state,
          fetching: false,
          department: action.department,
          audios: action.audios,
          discussions: action.discussions,
        };

    case "fetching_audios_success":
        return {
          ...state,
          fetching: false,
          audios: action.payload,
        };

    case "fetching_discussions_failure":
    case "fetching_department_failure":
    case "fetching_audios_failure":
      return {
        ...state,
        fetching: false,
        error: action.error,
      }

    case "start_creating_discussion":
    case "start_delete_discussion":
    case "start_creating_opinion":
    case "start_delete_opinion":
    case "start_toggle_opinion":
      return {
        ...state,
        updating: true,
        error: null,
      }

      case "creating_discussion_failure":
      case "delete_discussion_failure":
      case "creating_opinion_failure":
      case "delete_opinion_failure":
      case "toggle_opinion_failure":
        return {
          ...state,
          updating: false,
          error: action.error,
        }

      case "creating_discussion_success":
      case "delete_discussion_success":
      case "creating_opinion_success":
      case "delete_opinion_success":
      case "toggle_opinion_success":
        return {
          ...state,
          updating: false,
          discussions: action.payload,
        }

    default:
      return state;
  }
};