import {
  FETCH_IP_DATA_REQUEST,
  FETCH_IP_DATA_SUCCESS,
  FETCH_IP_DATA_FAILURE,
} from "./types";

export const fetchIpDataRequest = () => {
  return {
    type: FETCH_IP_DATA_REQUEST,
  };
};

export const fetchIpDataSuccess = (ipData) => {
  return {
    type: FETCH_IP_DATA_SUCCESS,
    payload: ipData,
  };
};

export const fetchIpDataFailure = (error) => {
  return {
    type: FETCH_IP_DATA_FAILURE,
    payload: error,
  };
};
