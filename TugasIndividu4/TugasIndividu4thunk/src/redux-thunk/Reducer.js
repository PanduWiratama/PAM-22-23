const initialState = {
  data: null,
  loading: false,
  error: null,
};

const ipReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_IP_REQUEST":
      return { ...state, loading: true };
    case "FETCH_IP_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_IP_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ipReducer;
