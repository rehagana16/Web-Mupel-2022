import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import util from "../service/util";
import jwt_decode from "jwt-decode"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Axios } from "../config/axios";

const currKlasis = util.getCookie("token") !== "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";

function DataPeserta() {

    const navigate = useNavigate();

    const [dataArr, setDataArr] = useState(null);
    const [dataTable, setDataTable] = useState(null);
    const [pagination, setPagination] = useState(null);

    const search = useLocation().search;
    const q = new URLSearchParams(search).get('q');
    const rg = new URLSearchParams(search).get('runggun');


    if (pagination) {
        if (q > pagination.length) {
            navigate("/dataPeserta/?q=1");
            window.location.reload();
        }
    }

    const deleteId = (data, e) => {
        e.preventDefault();
        console.log(data.pesertaId.slice(3, 6));
        Axios.get("/api/jumlahPeserta/" + data.klasis)
            .then((res) => {
                Axios.put("/api/JumlahPeserta", {
                    klasis: res.data.klasis,
                    jumlahPeserta: res.data.jumlahPeserta - 1,
                })
                    .then(() => {
                        Axios.delete("/api/pesertaMupels/" + data.id)
                            .then(() => {
                                Axios.get("/api/pesertaId")
                                    .then((res) => {
                                        let temp = res.data;
                                        temp[currKlasis].push(data.pesertaId.slice(3, 6));
                                        temp[currKlasis] = temp[currKlasis].sort();
                                        Axios.post("/api/pesertaId", {
                                            "data": temp
                                        })
                                            .then(() => {
                                                navigate("/dataPeserta/?q=" + q)
                                                window.location.reload();
                                            })
                                    })
                            })
                    })
            })

    }

    // useEffect(() => {
    //     Axios.get("/api/pesertaId")
    //         .then((res) => {
    //             console.log(res.data[currKlasis]);
    //         })
    // })

    useEffect(() => {
        document.title = "Data Peserta";
    }, [])

    useEffect(() => {
        Axios.get("api/pesertaMupels/?klasis=" + currKlasis)
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
    }, [])
    useEffect(() => {
        if (dataArr) {
            let pages = [];
            const temp = dataArr.map((data, index) =>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{data.nama}</td>
                    <td>{data.pesertaId}</td>
                    <td>{data.runggun}</td>
                    <td>{data.utusan}</td>
                    <td>{data.status}</td>
                    <td>{data.jenisKelamin}</td>
                    <td><a href={data.foto}>{data.foto}</a></td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => deleteId(data, e)} style={{ border: "0px" }}><FontAwesomeIcon style={{ color: "red" }} icon="fa-solid fa-trash" /></button></td>
                </tr>
            )
            for (let i = 0; i < temp.length / 5; i++) {
                pages.push(i + 1);
            }
            const pagination = pages.map((page) =>
                < li className="page-item" > <a className="page-link" href={"/dataPeserta?q=" + page}>{page}</a></li >
            )
            let under = (q - 1) * 5 < temp.length ? (q - 1) * 5 : 0;
            let upper = (q * 5 < temp.length) ? q * 5 : temp.length;
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
        <div className={currKlasis == "Admin" ? "d-flex justify-content-center align-items-center" : "d-flex justify-content-center align-items-center full-height-box"}>
            <img style={{ width: "15%" }} src="/logomupel.png" className="top-right-image"></img>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Id Peserta</th>
                                <th scope="col">Runggun</th>
                                <th scope="col">Utusan</th>
                                <th scope="col">Status</th>
                                <th scope="col">Jenis Kelamin</th>
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
            </div>
        </div >

    )
}

export default DataPeserta;