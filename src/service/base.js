import axios from "axios";
const ERR_OK = 0;
const baseURL = "/";
axios.baseURL = baseURL;

export function get(url, params) {
  return axios
    .get(url, { params })
    .then((res) => {
      const severData = res.data;
      if (severData.code === ERR_OK) {
        return severData.result;
      }
      // if (severData.code === ERR_OK) {
      //   ...其他情况的处理
      // }
    })
    .catch((e) => {
      console.log("error", e);
    });
}
