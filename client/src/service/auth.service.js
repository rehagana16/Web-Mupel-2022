import { Axios } from "../config/axios"
const API_URL = "/api/account/"
const login = (username, password) => {
    return Axios.post(API_URL + "login",{
        username: username,
        password: password
    })
    .then((response) => {
        document.cookie = "token=" + response.data;
        return response
    })
}

const AuthService = {
    login
  }
export default AuthService;