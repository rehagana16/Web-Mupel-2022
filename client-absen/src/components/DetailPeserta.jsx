import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Axios } from "../config/axios";

function DetailPeserta() {

    const search = useLocation().search;
    const pesertaId = new URLSearchParams(search).get('pesertaId');

    const [peserta, setPeserta] = useState(null);
    const [absen, setAbsen] = useState(null);
    const [bidang, setBidang] = useState("BELUM");

    // useEffect(() => {
    //     document.title = "Detail Peserta";
    // }, []);
    useEffect(() => {
        Axios.get("api/pesertaMupels/?pesertaId=" + pesertaId)
            .then((res) => {
                //console.log(res.data[0])
                setPeserta(res.data[0]);
            })
            .catch(() => {
                console.log('there is some error')
                setPeserta(null);
            })
    }, [])

    useEffect(() => {
        console.log(pesertaId)
        Axios.get("api/absen/dataAbsen/?pesertaId=" + pesertaId)
            .then((res) => {
                console.log(res)
                setAbsen(res);
            })
            .catch(() => {
                console.log('there is some error')
                setAbsen(null);
            })
    }, [])

    function absenMakan(e) {
        console.log(e.target.name)
        Axios.put("api/absen/update/?nama=" + e.target.name + "&" + "pesertaId=" + pesertaId, {
            "bidang": bidang,
        })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onChange = (e) => {

        console.log(bidang)
        if (e.target.name === "filterKomisi") {
            setBidang(e.target.value);
        }
        console.log(bidang)
    }

    return (
        <div className="d-flex justify-content-center full-height-box" style={{ width: "100%", marginTop: "2rem" }}>
            <img style={{ width: "15%" }} src="/logomupel.png" className="top-right-image"></img>
            <div style={{ width: "100%", paddingLeft: "0" }} className="container">
                <div style={{ height: "100%" }} className="row">
                    <div style={{ marginBottom: "2rem" }} className="d-flex flex-column col-sm-3 align-items-center justify-content-center">
                        <img src={peserta != null && peserta.foto} alt="foto peserta" width="80%" style={{ marginBottom: "2rem", border: "1px solid black" }} />
                        <div className="container" style={{ width: "80%" }}>
                            <div className="row">
                                <div className="col-4">
                                    <div>Nama</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.nama}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>Runggun</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.runggun}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>Id Peserta</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.pesertaId}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>Jenis Kelamin</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.jenisKelamin}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>Status</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.status}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>No Telp</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.noTelp}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>Kamar</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta === null ? "ERROR" : peserta.kamar}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div>Registrasi ulang</div>
                                </div>
                                <div className="col">
                                    <div> : {peserta !== null && peserta.isConfirmed ? "Sudah" : "Belum"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column col-sm align-items-center justify-content-center">
                        <div className="d-flex flex-column" style={{ textAlign: "center", marginTop: "2rem" }}>
                            <h3>Absen Makan</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <table className="table" style={{ width: "90%" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Makan Malam Jumat</th>
                                            <td>{absen !== null && absen.data.jumatMalam ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" style={{ fontSize: "small" }} onClick={absenMakan} className="btn btn-primary" name="jumatMalam"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sarapan Sabtu</th>
                                            <td>{absen !== null && absen.data.sabtuPagi ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" style={{ fontSize: "small" }} onClick={absenMakan} className="btn btn-primary" name="sabtuPagi"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Makan Siang Sabtu</th>
                                            <td>{absen !== null && absen.data.sabtuSiang ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" style={{ fontSize: "small" }} onClick={absenMakan} className="btn btn-primary" name="sabtuSiang"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Makan Malam Sabtu</th>
                                            <td>{absen !== null && absen.data.sabtuMalam ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" style={{ fontSize: "small" }} onClick={absenMakan} className="btn btn-primary" name="sabtuMalam"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sarapan Minggu</th>
                                            <td>{absen !== null && absen.data.mingguPagi ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" style={{ fontSize: "small" }} onClick={absenMakan} className="btn btn-primary" name="mingguPagi"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Makan Siang Minggu</th>
                                            <td>{absen !== null && absen.data.mingguSiang ? "Sudah" : "Belum"}</td>
                                            <td><button style={{ fontSize: "small" }} onClick={absenMakan} className="btn btn-primary" name="mingguSiang"> Absen </button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h3>Absen Persidangan</h3>
                            <div className="d-flex align-items-center justify-content-center"   >
                                <table className="table" style={{ width: "90%" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Persidangan 1</th>
                                            <td>{absen !== null && absen.data.paripurna12 ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" name="paripurna12" onClick={absenMakan} style={{ fontSize: "small" }} className="btn btn-primary"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Persidangan 2</th>
                                            <td>{absen !== null && absen.data.paripurna3 ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" name="paripurna3" onClick={absenMakan} style={{ fontSize: "small" }} className="btn btn-primary"> Absen </button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sidang Komisi</th>
                                            <td>{absen !== null && absen.data.sidangKomisi !== "BELUM" ? "Sudah(" + absen.data.sidangKomisi + ")" : "Belum"}</td>

                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Persidangan 3</th>
                                            <td>{absen !== null && absen.data.paripurna4 ? "Sudah" : "Belum"}</td>
                                            <td><button disabled="true" name="paripurna4" onClick={absenMakan} style={{ fontSize: "small" }} className="btn btn-primary"> Absen </button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h5>Absen Sidang Komisi</h5>
                            <div className="d-flex align-items-center justify-content-center"   >
                                <select className="form-control" onChange={onChange} value={bidang} name="filterKomisi" style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
                                    <option>BELUM</option>
                                    <option>Komisi Umum</option>
                                    <option>Komisi Pembinaan</option>
                                    <option>Komisi Konsolidasi</option>
                                    <option>KomisiPartisipasi</option>
                                    <option>Komisi Keuangan</option>
                                    <option>Komisi P3RT</option>
                                    <option>Panitia Khusus</option>
                                    <option>Komisi Kesan dan Pesan</option>
                                </select>
                                <button disabled="true" name="sidangKomisi" onClick={absenMakan} style={{ fontSize: "small" }} className="btn btn-primary"> Absen </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailPeserta;