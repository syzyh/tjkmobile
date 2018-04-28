const initialState = {
  fetching: false,
  error: null,
  audio: null,
  opinions: [],
};

export const audioReducer = (state = initialState, action) => {
  switch(action.type) {
    case "start_fetching_audio":
    case "start_create_audioOpinion":
    case "start_delete_audioOpinion":
      return {
        ...state,
        fetching: true,
        error: null,
      }

    case "fetching_audio_success":
      return {
        ...state,
        fetching: false,
        audio: action.audio,
        opinions: action.opinions,
      };

    case "create_audioOpinion_success":
    case "delete_audioOpinion_success":
      return {
        ...state,
        fetching: false,
        opinions: action.payload,
      };

    case "fetching_audio_failure":
    case "create_audioOpinion_failure":
    case "delete_audioOpinion_failure":
      return {
        ...state,
        fetching: false,
        error: action.error,
      }

    default:
      return state;
  }
};