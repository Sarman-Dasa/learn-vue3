/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */

import CryptoJS from "crypto-js";
export const isUserLoggedIn = () =>
  !!(localStorage.getItem("UserInfo") && localStorage.getItem("accessToken"));
export function getUserInfo() {
  let UserInfo = null;
  let token = null;

  if (localStorage.getItem("UserInfo") && localStorage.getItem("accessToken")) {
    token = CryptoJS.AES.decrypt(
      localStorage.getItem("accessToken"),
      import.meta.env.VITE_SECRET_KEY
    );
    token = token.toString(CryptoJS.enc.Utf8);

    UserInfo = CryptoJS.AES.decrypt(
      localStorage.getItem("UserInfo"),
      import.meta.env.VITE_SECRET_KEY
    );
    UserInfo = JSON.parse(UserInfo.toString(CryptoJS.enc.Utf8));
    return { userinfo: UserInfo, token: token };
  }
}
