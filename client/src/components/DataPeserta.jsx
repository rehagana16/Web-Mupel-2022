import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import util from "../service/util";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useLocation } from "react-router-dom";

const currKlasis = util.getCookie("token") != "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";

function DataPeserta() {

    const navigate = useNavigate();

    const form = {
        nama: "",
        kategori: ""
    }

    const [dataArr, setDataArr] = useState(null);
    const [dataTable, setDataTable] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [filter, setFilter] = useState(form);

    const search = useLocation().search;
    const q = new URLSearchParams(search).get('q');
    const rg = new URLSearchParams(search).get('runggun');

    if (pagination) {
        if (q > pagination.length) {
            navigate("/dataPeserta/?q=1");
            window.location.reload();
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/pesertaMupels/?klasis=" + currKlasis)
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
                </tr>
            )
            for (let i = 0; i < temp.length / 5; i++) {
                pages.push(i + 1);
            }
            const pagination = pages.map((page) =>
                < li class="page-item" > <a class="page-link" href={"/dataPeserta?q=" + page}>{page}</a></li >
            )
            let under = (q - 1) * 5 < temp.length ? (q - 1) * 5 : 0;
            let upper = (q * 5 < temp.length) ? q * 5 : temp.length;
            setDataTable(temp.slice(under, upper))
            setPagination(pagination);
        }
    }, [dataArr])

    const onClick = () => {
        navigate("/registration/?klasis=" + jwt_decode(util.getCookie("token"))["klasis"]);
    }

    const next = () => {
        if (q == pagination.length) {
            navigate("/dataPeserta/?q=" + q);
        } else {
            navigate("/dataPeserta/?q=" + (parseInt(q) + 1));
            window.location.reload();
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center full-height-box">
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
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href={q == 1 ? "/dataPeserta/?q=1" : ("/dataPeserta?q=" + (q - 1))} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {pagination}
                            <li class="page-item">
                                <button class="page-link" onClick={next} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={onClick}> Back to Registration</button>
                </div>
            </div>
        </div >

    )
}

export default DataPeserta;