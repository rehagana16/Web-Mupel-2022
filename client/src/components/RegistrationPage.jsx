import React, { useState } from "react";
import { useForm } from "react-hook-form";
import data from "../data/data";

const form = {
    nama: "",
    runggun: "",
    bidang: "",
    jenisKelamin: "",
    jabatan: "",
    status: "",
    foto: ""

}

function RegistrationPage() {

    const { handleSubmit } = useForm();

    const rungguns = data.runggun;
    const listRunggun = rungguns.map((runggun) =>
        <option>{runggun}</option>
    )
    const bidangs = data.bidang;
    const listBidang = bidangs.map((bidang) =>
        <option>{bidang}</option>
    )
    const jabatans = data.jabatan;
    const listJabatan = jabatans.map((jabatan) =>
        <option>{jabatan}</option>
    )

    const [formState, setFormState] = useState(form);

    function onChanged(event) {
        const currState = formState;
        if (event.target.name === "nama") {
            currState.nama = event.target.value;
        } else if (event.target.name === "runggun") {
            currState.runggun = event.target.value;
        } else if (event.target.name === "bidang") {
            currState.bidang = event.target.value;
        } else if (event.target.name === "gender") {
            currState.jenisKelamin = event.target.value;
        } else if (event.target.name === "jabatan") {
            currState.jabatan = event.target.value;
        } else if (event.target.name === "status") {
            currState.status = event.target.value;
        }
        setFormState(currState);
        console.log(formState);
    }

    return (
        <div className="d-flex justify-content-center align-items-center full-height-box">
            <div className="d-flex flex-column">
                <div className="inputForm">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div class="form-group marginbtm10">
                            <label className="labelRegistration" for="inputNama">Nama</label>
                            <input className="inputRegistration" onChange={onChanged} name="nama" type="text"
                                class="form-control" id="inputNama" placeholder="Masukkan nama lengkap" />
                            <small class="form-text text-muted">Wajib diisi</small>
                        </div>
                        <div class="form-group marginbtm10">
                            <label className="labelRegistration" for="selectRunggun">Runggun</label>
                            <select className="inputRegistration" onChange={onChanged} name="runggun" class="form-control" id="selectRunggun">
                                {listRunggun}
                            </select>
                            <small class="form-text text-muted">Wajib diisi</small>
                        </div>
                        <input type="hidden" name="foto" value="Test Foto" />
                        <div class="form-group marginbtm10">
                            <label className="labelRegistration" for="selectBidang">Bidang</label>
                            <select className="inputRegistration" onChange={onChanged} name="bidang" class="form-control" id="selectBidang">
                                {listBidang}
                            </select>
                            <small class="form-text text-muted">Wajib diisi</small>
                        </div>
                        <label className="labelRegistration" >Jenis Kelamin</label>
                        <div class="form-group marginbtm10">
                            <div class="form-check form-check-inline">
                                <input onChange={onChanged} class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Laki-laki" />
                                <label for="inlineRadio1">Laki-laki</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input onChange={onChanged} class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Perempuan" />
                                <label for="inlineRadio2">Perempuan</label>
                            </div>
                        </div>
                        <div class="form-group marginbtm10">
                            <label className="labelRegistration" for="selectJabatan">Jabatan</label>
                            <select onChange={onChanged} class="form-control" id="selectJabatan" name="jabatan">
                                {listJabatan}
                            </select>
                            <small class="form-text text-muted">Wajib diisi</small>
                        </div>
                        <label className="labelRegistration" >Status</label>
                        <div class="form-group marginbtm10">
                            <div class="form-check form-check-inline">
                                <input onChange={onChanged} class="form-check-input" type="radio" name="status" id="inlineRadio1" value="Peninjau" />
                                <label for="inlineRadio1">Peninjau</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input onChange={onChanged} class="form-check-input" type="radio" name="status" id="inlineRadio2" value="Peserta" />
                                <label for="inlineRadio2">Peserta</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default RegistrationPage;