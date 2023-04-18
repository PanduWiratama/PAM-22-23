import {
  FETCH_IP_DATA_REQUEST,
  FETCH_IP_DATA_SUCCESS,
  FETCH_IP_DATA_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const ipDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IP_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case FETCH_IP_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_IP_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};

export default ipDataReducer;
