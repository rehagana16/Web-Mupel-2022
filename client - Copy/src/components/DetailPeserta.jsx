import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Axios } from "../config/axios";

function DetailPeserta() {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('pesertaId');
    console.log(id)

    const navigate = useNavigate();

    const [peserta, setPeserta] = useState(null);

    // useEffect(() => {
    //     document.title = "Detail Peserta";
    // }, []);

    const registrasiUlang = () => {
        Axios.put("/api/pesertaMupels/updateKonfirmasi", {
            pesertaId: peserta.pesertaId,
        }).then(() => {
            navigate("/dataPeserta/?q=1")
        })
        // console.log(peserta);
    }
    console.log("TEST1");
    useEffect(() => {
        console.log("MASUK")
        Axios.get("api/pesertaMupels/?pesertaId=" + id)
            .then((res) => {
                console.log(res.data[0])
                setPeserta(res.data[0]);
            })
            .catch(() => {
                console.log('there is some error')
                setPeserta(null);
            })
    }, [])
    console.log("TEST2");

    return (
        <div className="d-flex justify-content-center align-items-center full-height-box">
            <img style={{ width: "15%" }} src="/logomupel.png" className="top-right-image"></img>
            <div style={{ width: "50%" }} className="container">
                <div className="row">
                    <div style={{ textAlign: "center" }} className="col-sm">
                        <img src={peserta != null && peserta.foto} alt="foto peserta" width="80%" />
                    </div>
                    <div className="d-flex flex-column justify-content-center col-sm">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div>Nama</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.nama}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>Runggun</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.runggun}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>Id Peserta</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.pesertaId}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>Jenis Kelamin</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.jenisKelamin}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>Status</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.status}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>No Telp</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.noTelp}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>Kamar</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.kamar}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>Registrasi ulang</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta !== null && peserta.isConfirmed ? "Sudah" : "Belum"}</div>
                                </div>
                            </div>
                            {peserta !== null && <span><button disabled={peserta.isConfirmed} className="btn btn-primary" onClick={registrasiUlang}> Registrasi Ulang </button></span>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailPeserta;