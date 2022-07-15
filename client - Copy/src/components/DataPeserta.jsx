import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import util from "../service/util";
import jwt_decode from "jwt-decode"
import { Axios } from "../config/axios";

const currKlasis = util.getCookie("token") !== "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";

function DataPeserta() {

    const navigate = useNavigate();

    const [dataArr, setDataArr] = useState(null);
    const [dataTable, setDataTable] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [pencarian, setPencarian] = useState({
        peserta1: "",
        filter1: "klasis",
        peserta2: "",
        filter2: "runggun"
    });

    const search = useLocation().search;
    const q = new URLSearchParams(search).get('q');
    const rg = new URLSearchParams(search).get('runggun');


    if (pagination) {
        if (q > pagination.length) {
            navigate("/dataPeserta/?q=1");
            window.location.reload();
        }
    }

    // useEffect(() => {
    //     Axios.get("/api/pesertaId")
    //         .then((res) => {
    //             console.log(res.data[currKlasis]);
    //         })
    // })

    const detailId = (data, e) => {
        console.log(data);
        navigate("/detailPeserta/?pesertaId=" + data.pesertaId)
    }

    const onChange = (e) => {
        if (e.target.name === "peserta1") {
            setPencarian({
                peserta1: e.target.value,
                filter1: pencarian.filter1,
                peserta2: pencarian.peserta2,
                filter2: pencarian.filter2
            })
        } else if (e.target.name === "peserta2") {
            setPencarian({
                peserta1: pencarian.peserta1,
                filter1: pencarian.filter1,
                peserta2: e.target.value,
                filter2: pencarian.filter2
            })
        }
        let api = "/api/pesertaMupels/?" + pencarian.filter1 + "=" + pencarian.peserta1 + "&" + pencarian.filter2 + "=" + pencarian.peserta2;
        Axios.get(api)
            .then((res) => {
                if (rg) {
                    let test = [];
                    res.data.map((data) => {
                        if (data.runggun.toLowerCase().search(rg.toLowerCase()) >= 0) {
                            test.push(data);
                        }
                    });
                    console.log(test);
                    setDataArr(test);

                }
                else {
                    console.log(res.data[0].runggun);
                    setDataArr(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        document.title = "Data Peserta";
    }, [])

    useEffect(() => {
        let api = "api/pesertaMupels/?klasis=" + currKlasis
        if (currKlasis === 'Admin') {
            api = "api/pesertaMupels/"
        }
        Axios.get(api)
            .then((res) => {
                console.log(res);
                if (rg) {
                    let test = [];
                    res.data.map((data) => {
                        if (data.runggun.toLowerCase().search(rg.toLowerCase()) >= 0) {
                            test.push(data);
                        }
                    });
                    console.log(test);
                    setDataArr(test);

                }
                else {
                    setDataArr(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        if (dataArr) {
            console.log(dataArr)
            let pages = [];
            const temp = dataArr.map((data, index) =>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{data.nama}</td>
                    <td>{data.pesertaId}</td>
                    <td>{data.klasis}</td>
                    <td>{data.runggun}</td>
                    <td>{data.utusan}</td>
                    <td>{data.status}</td>
                    <td>{data.jenisKelamin}</td>
                    <td>{data.isConfirmed ? "Sudah" : "Belum"}</td>
                    <td><a href={data.foto}>{data.foto}</a></td>
                    {currKlasis === "Admin" ? <td style={{ textAlign: "center" }}>
                        <button className="btn btn-primary" onClick={(e) => detailId(data, e)}>
                            Registrasi
                        </button>
                    </td> : ""}
                </tr>
            )
            let limit = 5;
            if (currKlasis === "Admin") {
                limit = 50;
            }
            for (let i = 0; i < temp.length / limit; i++) {
                pages.push(i + 1);
            }
            const pagination = pages.map((page) =>
                < li className="page-item" > <a className="page-link" href={"/dataPeserta?q=" + page}>{page}</a></li >
            )
            let under = (q - 1) * limit < temp.length ? (q - 1) * limit : 0;
            let upper = (q * limit < temp.length) ? q * limit : temp.length;
            setDataTable(temp.slice(under, upper))
            setPagination(pagination);
        }
    }, [dataArr])

    // const onClick = () => {
    //     navigate("/registration/?klasis=" + jwt_decode(util.getCookie("token"))["klasis"]);
    // }

    const next = () => {
        if (q == pagination.length) {
            navigate("/dataPeserta/?q=" + q);
        } else {
            navigate("/dataPeserta/?q=" + (parseInt(q) + 1));
            window.location.reload();
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ margin: "2rem" }}>
            <img style={{ width: "15%" }} src="/logomupel.png" className="top-right-image"></img>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div style={{ width: "75%", textAlign: "center" }}>
                    {currKlasis === 'Admin' && <form>
                        <input name="peserta1" onChange={onChange} className="form-control" value={pencarian.peserta1} type="text" placeholder="Ketik disini.."></input>
                        <select name="filter1" onChange={onChange} className="form-control" style={{ width: "fit-content" }} value={pencarian.filter1}>
                            <option>klasis</option>
                        </select>
                        <input name="peserta2" onChange={onChange} className="form-control" value={pencarian.peserta2} type="text" placeholder="Ketik disini.."></input>
                        <select name="filter2" onChange={onChange} className="form-control" style={{ width: "fit-content" }} value={pencarian.filter2}>
                            <option>runggun</option>
                        </select>
                    </form>}

                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Id Peserta</th>
                                <th scope="col">Klasis</th>
                                <th scope="col">Runggun</th>
                                <th scope="col">Utusan</th>
                                <th scope="col">Status</th>
                                <th scope="col">Jenis Kelamin</th>
                                <th scope="col">Registrasi Ulang</th>
                                <th scope="col">Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href={q == 1 ? "/dataPeserta/?q=1" : ("/dataPeserta?q=" + (q - 1))} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {pagination}
                            <li className="page-item">
                                <button className="page-link" onClick={next} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={onClick}> Kembali ke registrasi </button>
                </div> */}
            </div>
        </div >

    )
}

export default DataPeserta;