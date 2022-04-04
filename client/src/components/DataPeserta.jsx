import { React, useState, useEffect } from "react";
import util from "../service/util";
import jwt_decode from "jwt-decode"
import axios from "axios";
import data from "../data/data";

const currKlasis = util.getCookie("token") != "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";
console.log(currKlasis);

function DataPeserta() {

    const [dataArr, setDataArr] = useState(null);
    const [dataTable, setDataTable] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/api/pesertaMupels/?klasis=" + currKlasis)
            .then((res) => {
                setDataArr(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log("TEST")
    }, [])
    useEffect(() => {
        if (dataArr) {
            const temp = dataArr.map((data) =>
                <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.nama}</td>
                    <td>{data.pesertaId}</td>
                    <td>{data.runggun}</td>
                    <td>{data.utusan}</td>
                    <td>{data.status}</td>
                    <td>{data.jenisKelamin}</td>
                    <td><a href={data.foto}>{data.foto}</a></td>
                </tr>
            )
            setDataTable(temp)
            console.log(dataTable)
        }
    }, [dataArr])

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
            </div>
        </div >

    )
}

export default DataPeserta;