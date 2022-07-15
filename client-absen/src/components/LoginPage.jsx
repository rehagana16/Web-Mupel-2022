import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthService from "../service/auth.service"
import util from "../service/util";
import jwt_decode from "jwt-decode"

if (util.getCookie("token") != "") {
    console.log("TEST")
    document.cookie = "token=";
}

function LoginPage() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        pesertaId: "",
        password: ""
    })

    useEffect(() => {
        document.title = "Login";
    }, [])

    function onChange(event) {
        if (event.target.name === "pesertaId") {
            setData({
                pesertaId: event.target.value,
                password: data.password
            })
        } else {
            setData({
                pesertaId: data.pesertaId,
                password: event.target.value
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(data.pesertaId, data.password).then(
            (res) => {
                console.log(jwt_decode(res.data).pesertaId);
                const pesertaId = jwt_decode(res.data).pesertaId
                navigate("/detailPeserta/?pesertaId=" + pesertaId);
                window.location.reload();
            }
        ).catch((err) => {
            alert(err.message)
        })
    }
    return (
        <div className="d-flex justify-content-center align-items-center full-height-box">
            <img style={{ width: "15%" }} src="/logomupel.png" className="top-right-image"></img>
            <div className="d-flex flex-column align-items-center login-box">
                <div className="d-flex justify-content-center marginbtm10"><img src="/logopermata.png" className="logopermata" alt="gambar logo permata" /></div>
                <div className="inputForm">
                    <form onSubmit={handleLogin}>
                        <div className="form-group marginbtm10">
                            <input onChange={onChange} type="text" name="pesertaId" class="form-control" id="usernameinput" placeholder="Id Peserta" value={data.pesertaId} />
                            {data.pesertaId === "" && <p className="warning">Id Peserta Tidak Boleh Kosong</p>}
                        </div>
                        <div className="form-group marginbtm10">
                            <input onChange={onChange} type="password" name="password" class="form-control" id="passwordinput" placeholder="Password" value={data.password} />
                            {data.password === "" && <p className="warning">Password tidak boleh kosong</p>}
                        </div>
                        <div className="d-flex justify-content-end">
                            {(data.username === "" || data.password === "") ? <input type="submit" class="btn btn-primary dark-blue" disabled /> : <input type="submit" class="btn btn-primary dark-blue" />}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default LoginPage;