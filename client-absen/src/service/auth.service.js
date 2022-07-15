import { Axios } from "../config/axios"
const API_URL = "/api/absen/"
const login = (pesertaId, password) => {
    return Axios.post(API_URL + "login",{
        pesertaId: pesertaId,
        password: password
    })
    .then((response) => {
        document.cookie = "token=" + response.data+";path=/detailPeserta";
        return response
    })
}

const AuthService = {
    login
  }
export default AuthService;