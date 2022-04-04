import axios from "axios"
const API_URL = "http://localhost:8080/api/account/"
const login = (username, password) => {
    return axios.post(API_URL + "login",{
        username: username,
        password: password
    })
    .then((response) => {
        document.cookie = "token= " + response.data;
        return response
    })
}

const AuthService = {
    login
  }
export default AuthService;