import axios from "axios";
import CryptoJS from "crypto-js";
import { ref } from "vue";
import { toast } from "vue3-toastify";
export default function myMixin() {
  const user_info = ref([]);
  const access_token = ref();

  //Get user information & token
  if (localStorage.getItem("UserInfo") && localStorage.getItem("accessToken")) {
    let token = CryptoJS.AES.decrypt(
      localStorage.getItem("accessToken"),
      import.meta.env.VITE_SECRET_KEY
    );
    token = token.toString(CryptoJS.enc.Utf8);

    let userinfo = CryptoJS.AES.decrypt(
      localStorage.getItem("UserInfo"),
      import.meta.env.VITE_SECRET_KEY
    );
    userinfo = JSON.parse(userinfo.toString(CryptoJS.enc.Utf8));

    user_info.value = userinfo;
    access_token.value = token;
  }

  function myTestMixinFunction(id) {
    console.log("call", user_info.value);
  }

  async function PostApi(url, input = {}, message = false) {
    if (user_info.value && access_token.value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token.value;

      const data = await axios.post(url, input).then((response) => {
        let data = response.data;
        if (message) {
          toast(response.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_RIGHT,
            type: "info",
            closeButton: false,
            hideProgressBar: true,
          });
        }
        return data || true;
      });

      return data;
    }
  }

  async function GetApi(url, input = {}, message = false) {
    if (user_info.value && access_token.value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token.value;

      const data = await axios.get(url, input).then((response) => {
        let data = response.data;
        if (message) {
          toast(response.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_RIGHT,
            type: "success",
            closeButton: false,
            hideProgressBar: true,
          });
        }
        return data || true;
      });

      return data;
    }
  }

  return {
    myTestMixinFunction,
    PostApi,
    GetApi,
  };
}
