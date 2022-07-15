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
        peserta: "",
        filter: "nama"
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
        navigate("/detailPeserta/?id=" + data.id)
    }

    const onChange = (e) => {
        if (e.target.name === "peserta") {
            setPencarian({
                peserta: e.target.value,
                filter: pencarian.filter
            })
        } else {
            setPencarian({
                peserta: pencarian.peserta,
                filter: e.target.value
            })
        }
        let api = "/api/pesertaMupels/?" + pencarian.filter + "=" + pencarian.peserta;
        console.log(api)
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
                    <form>
                        <input name="peserta" onChange={onChange} className="form-control" value={pencarian.nama} type="text" placeholder="Ketik disini.."></input>
                        <select name="filter" onChange={onChange} className="form-control" style={{ width: "fit-content" }} value={pencarian.filter}>
                            <option>pesertaId</option>
                            <option>nama</option>
                        </select>
                    </form>
                </div>
                <div className="d-flex justify-content-center align-items-center">
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
                {/* <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={onClick}> Kembali ke registrasi </button>
                </div> */}
            </div>
        </div >

    )
}

export default DataPeserta;