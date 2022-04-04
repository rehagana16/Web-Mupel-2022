import axios from "axios";

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getUtusanCode = (value) => {
    if (value.utusan === "Utusan Klasis") {
        return "K";
    } return "R";
}

const getStatusCode = (value) => {
    if (value.status === "Peserta") {
        return "PS"
    } return "PN"
}

const getJenisKelaminCode = (value) => {
    if (value.jenisKelamin === "lakilaki") {
        return "L"
    } return "P"
}

const getNumberPeserta = (value) => {
    const res = axios.get("http://localhost:8080/api/jumlahPeserta/" + value.klasis);
    return res;
}

const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const util = {
    getCookie,
    getUtusanCode,
    getStatusCode,
    getJenisKelaminCode,
    getNumberPeserta,
    pad,
}

export default util;