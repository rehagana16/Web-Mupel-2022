import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Pengumuman() {

    const search = useLocation().search;

    const id = new URLSearchParams(search).get('id');

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/dataPeserta/?q=1");
        window.location.reload();
    }

    useEffect(() => {
        document.title = "Selamat!";
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center full-height-box">
            <div className="d-flex flex-column logomupel">
                <img src="/logomupel.png"></img>
            </div>
            <div className="d-flex flex-column one-third-width">
                <p className="large-text">Id Peserta : <strong>{id}</strong></p>

                <div className="large-text" style={{ marginBottom: "2rem" }}>
                    Selamat! Data anda telah kami simpan.
                    Mohon tetap patuhi protokol kesehatan.
                    Jaga kesehatan kamu, dan sampai jumpa di
                    <strong> "MUPEL XXII PERMATA GBKP 2022." </strong>
                    Tuhan Yesus Memberkati
                </div>
                <span>
                    <button onClick={onClick} type="submit" className="btn btn-primary">Cek Data</button>
                </span>
            </div>
        </div>
    )
}

export default Pengumuman;