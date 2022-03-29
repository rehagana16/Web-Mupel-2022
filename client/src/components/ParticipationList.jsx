import React, { useState, useEffect } from "react";
import axios from 'axios';

const ParticipationList = () => {
    const [error, setError] = useState(null);
    const [peserta, setPeserta] = useState([]);

    const listPeserta = peserta.map((orang, index) =>
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{orang.nama}</td>
            <td>{orang.runggun}</td>
            <td>{orang.jabatan}</td>
            <td>{orang.bidang}</td>
            <td>{orang.status}</td>
            <td>{orang.jenisKelamin}</td>
        </tr>
    )

    useEffect(() => {
        fetch("http://localhost:8080/api/pesertaMupels/")
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setPeserta(data);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])



    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center full-height-box">
                <div className="d-flex flex-column">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Runggun</th>
                                <th scope="col">Jabatan</th>
                                <th scope="col">Bidang</th>
                                <th scope="col">Status</th>
                                <th scope="col">Jenis Kelamin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPeserta}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex flex-column">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }


}

export default ParticipationList;

    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/pesertaMupels/")
    //         .then(req => req.json)
    //         .then(
    //             (req) => {
    //                 console.log(req);
    //                 setPeserta(req);
    //             },
    //             (error) => {
    //                 setError(error);
    //             }
    //         )
    // }, [])


    //return (
    //         <div className="d-flex flex-column justify-content-center align-items-center full-height-box">
    //             <div className="d-flex flex-column">
    //                 <table class="table table-sm">
    //                     <thead>
    //                         <tr>
    //                             <th scope="col">#</th>
    //                             <th scope="col">Nama</th>
    //                             <th scope="col">Runggun</th>
    //                             <th scope="col">Jabatan</th>
    //                             <th scope="col">Bidang</th>
    //                             <th scope="col">Status</th>
    //                             <th scope="col">Jenis Kelamin</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <th scope="row">1</th>
    //                             <td>Mark</td>
    //                             <td>Otto</td>
    //                             <td>@mdo</td>
    //                             <td>test</td>
    //                             <td>test</td>
    //                             <td>test</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </div>
    //             <div className="d-flex flex-column">
    //                 <nav aria-label="Page navigation example">
    //                     <ul class="pagination">
    //                         <li class="page-item">
    //                             <a class="page-link" href="#" aria-label="Previous">
    //                                 <span aria-hidden="true">&laquo;</span>
    //                             </a>
    //                         </li>
    //                         <li class="page-item"><a class="page-link" href="#">1</a></li>
    //                         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //                         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //                         <li class="page-item">
    //                             <a class="page-link" href="#" aria-label="Next">
    //                                 <span aria-hidden="true">&raquo;</span>
    //                             </a>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //             </div>
    //         </div>
    //     )