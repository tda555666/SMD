import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const refresh = async (setCurrUser, currUser, navigate) => {
  let refreshToken = sessionStorage.getItem("todolist-user-refresh");
  let user = jwtDecode(sessionStorage.getItem("todolist-user"));
  let email = user.email;

  try {
    const result = await axios.post("http://localhost:3055/auth/refresh", {
      email,
      refreshToken,
    });

    let decodedAccessToken = jwtDecode(result.data.accessToken);
    sessionStorage.setItem("todolist-user", result.data.accessToken);
    sessionStorage.setItem("todolist-user-refresh", result.data.refreshToken);

    return result.data;
  } catch (err) {
    const token = sessionStorage.getItem("todolist-user-refresh");

    try {
      await axios.post("http://localhost:3055/auth/logout", {
        token: token,
        id: currUser.id,
      });
      sessionStorage.removeItem("todolist-user");
      sessionStorage.removeItem("todolist-user-refresh");
      setCurrUser({ id: "", email: "", username: "" });
      navigate("/login");

      return { status: true, msg: "Logged out successfully" };
    } catch (logoutErr) {
      console.log(logoutErr.message);
      return { status: false, msg: logoutErr.message };
    }
  }
};