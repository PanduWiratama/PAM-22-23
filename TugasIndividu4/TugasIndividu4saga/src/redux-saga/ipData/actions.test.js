import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import saga from "redux-saga";
import {
  fetchIpDataRequest,
  fetchIpDataSuccess,
  fetchIpDataFailure,
} from "./actions";
import { fetchIpData } from "../../api";

const mockStore = configureMockStore([saga]);

describe("actions", () => {
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
    const expectedAction = { type: "FETCH_IP_DATA_REQUEST" };
    expect(fetchIpDataRequest()).toEqual(expectedAction);
  });

  it("Membuat aksi untuk pengambilan IP berhasil", () => {
    const IpData = { ip: "127.0.0.1" };
    const expectedAction = {
      type: "FETCH_IP_DATA_SUCCESS",
      payload: IpData,
    };
    expect(fetchIpDataSuccess(IpData)).toEqual(expectedAction);
  });

  it("Membuat aksi untuk pengambilan IP gagal", () => {
    const error = "Error fetching IP";
    const expectedAction = {
      type: "FETCH_IP_DATA_FAILURE",
      payload: error,
    };
    expect(fetchIpDataFailure(error)).toEqual(expectedAction);
  });

  it("Melakukan pengiriman aksi fetch IP ketika pengambilan IP berhasi", async () => {
    const ipData = { ip: "127.0.0.1" };
    const mock = mockAxios.onGet("http://ip-api.com/json/").reply(200, ipData);
    const store = mockStore();
    await store.dispatch(fetchIpData());
    expect(store.getActions());
    mock.restore();
  });

  it("Melakukan pengiriman aksi fetch IP ketika pengambilan IP gagal", async () => {
    const error = "Request failed with status code 404";
    const response = { status: "fail", message: error };
    mockAxios.onGet("http://ip-api.com/json/1.1.1.1").replyOnce(404, response);
    const store = mockStore();
    await store.dispatch(fetchIpData());
    expect(store.getActions());
  });
});
