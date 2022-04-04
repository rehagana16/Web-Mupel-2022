import React from "react";

function Pengumuman() {
    return (
        <div className="d-flex justify-content-center align-items-center full-height-box">
            <div className="d-flex flex-column one-third-width">
                <p>Id Peserta : </p>

                <div>
                    Selamat! Data anda telah kami simpan.
                    Mohon tetap patuhi protokol kesehatan.
                    Jaga kesehatan kamu, dan sampai jumpa di
                    "MUPEL PERMATA GBKP 2022."
                    Tuhan Yesus Memberkati
                </div>
                <span>
                    <button type="submit" className="btn btn-primary">Cek Data</button>
                </span>
            </div>
        </div>
    )
}

export default Pengumuman;