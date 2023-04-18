import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_IP_DATA_REQUEST,
  FETCH_IP_DATA_SUCCESS,
  FETCH_IP_DATA_FAILURE,
} from "./types";
import { fetchIpData } from "../../api";

function* fetchIpDataSaga() {
  try {
    yield put({ type: FETCH_IP_DATA_REQUEST });
    const response = yield call(fetchIpData); // panggil API fetch IP data
    yield put({ type: FETCH_IP_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_IP_DATA_FAILURE, payload: error.message });
  }
}

export function* watchFetchIpData() {
  yield takeLatest(FETCH_IP_DATA_REQUEST, fetchIpDataSaga);
}
