const initialState = {
  updating: true,
  error: null,
  featured: [],
  carousel: []
};

export const featuredReducer = (state = initialState, action) => {
  switch(action.type) {
    case "start_updating_data":
      return {
        ...state,
        updatind: true,
        error: null,
      }

    case "updating_data_success":
        return {
          ...state,
          updating: false,
          error: null,
          featured: action.featured,
          carousel: action.carousel,
        };

    case "updating_data_failure":
      return {
        ...state,
        updating: false,
        error: action.error,
      }

    default:
      return state;
  }
};