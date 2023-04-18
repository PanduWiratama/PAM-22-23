import {
  fetchIpDataRequest,
  fetchIpDataSuccess,
  fetchIpDataFailure,
} from "./redux-saga/ipData/actions";
import axios from "axios";

export const fetchIpData = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchIpDataRequest());
      const response = await axios.get("http://ip-api.com/json/");
      dispatch(fetchIpDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchIpDataFailure(error.message));
    }
  };
};
