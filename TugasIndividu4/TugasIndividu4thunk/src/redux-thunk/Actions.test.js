import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  fetchIPRequest,
  fetchIPSuccess,
  fetchIPFailure,
  fetchIP,
} from "./Actions";

const mockStore = configureMockStore([thunk]);

describe("Actions", () => {
  let mockAxios;
  beforeEach(() => {
    // membuat mock adapter sebelum dilakukan pengujain untuk axios
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    // mengatur menjadi state awal axios ketika salah satu pengujian selesai
    mockAxios.restore();
  });
  it("Membuat aksi untuk permintaan pengambilan IP", () => {
    const expectedAction = { type: "FETCH_IP_REQUEST" };
    expect(fetchIPRequest()).toEqual(expectedAction);
  });

  it("Membuat aksi untuk pengambilan IP berhasil", () => {
    const data = { ip: "127.0.0.1" };
    const expectedAction = {
      type: "FETCH_IP_SUCCESS",
      payload: data,
    };
    expect(fetchIPSuccess(data)).toEqual(expectedAction);
  });

  it("Membuat aksi untuk pengambilan IP gagal", () => {
    const error = "Error fetching IP";
    const expectedAction = {
      type: "FETCH_IP_FAILURE",
      payload: error,
    };
    expect(fetchIPFailure(error)).toEqual(expectedAction);
  });

  it("Melakukan pengiriman aksi fetch IP ketika pengambilan IP berhasi", async () => {
    const data = { ip: "127.0.0.1" };
    const mock = mockAxios.onGet("http://ip-api.com/json/").reply(200, data);
    const expectedActions = [
      { type: "FETCH_IP_REQUEST" },
      { type: "FETCH_IP_SUCCESS", payload: data },
    ];
    const store = mockStore();
    await store.dispatch(fetchIP());
    expect(store.getActions()).toEqual(expectedActions);
    mock.restore();
  });

  it("Melakukan pengiriman aksi fetch IP ketika pengambilan IP gagal", async () => {
    const error = "Request failed with status code 404";
    const response = { status: "fail", message: error };
    mockAxios.onGet("http://ip-api.com/json/1.1.1.1").replyOnce(404, response);
    const expectedActions = [
      { type: "FETCH_IP_REQUEST" },
      { type: "FETCH_IP_FAILURE", payload: error },
    ];
    const store = mockStore();
    await store.dispatch(fetchIP());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
