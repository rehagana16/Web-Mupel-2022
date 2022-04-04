//TODO 
//Create global state to know how many people have already 

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import data from "../data/data";
import axios from "axios";
import util from "../service/util";
import jwt_decode from "jwt-decode";

const registerSchema = Yup.object().shape({
    nama: Yup.string()
        .required("Harap isi nama lengkap anda"),
    runggun: Yup.string()
        .required("Harap pilih runggun anda"),
    noTelp: Yup.string()
        .required("Harap masukkan nomor telepon aktif anda")
        .matches(/^(08)(\d{2})(\d{5,9})$/g,
            "Invalid phone number"
        ),
    jenisKelamin: Yup.string()
        .required("Harap pilih jenis kelamin anda"),
    utusan: Yup.string()
        .required("Harap pilih anda mewakili apa"),
    status: Yup.string()
        .required("Harap pilih status anda"),
    foto: Yup.mixed().required("Harap masukkan foto anda"),
})

const currKlasis = util.getCookie("token") != "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";

const form = {
    nama: "",
    runggun: "",
    klasis: currKlasis,
    jenisKelamin: "",
    utusan: "",
    status: "",
    noTelp: "",
    foto: null,
    pesertaId: "xxxxxxxxx",
    isConfirmed: false,
}

function RegistrationPage() {
    const rungguns = data[currKlasis];
    const ListRunggun = rungguns.map((runggun) =>
        <option>{runggun}</option>
    )
    const utusans = data.utusan;
    const ListUtusan = utusans.map((utusan) =>
        <option>{utusan}</option>
    )

    const [dataKlasis, setDataKlasis] = useState('');

    const [previewSource, setPreviewSource] = useState('');

    const getKlasisCode = async (currKlasis) => {
        await axios.get("http://localhost:8080/api/data/klasis").then((res) => {
            setDataKlasis(res.data.dataKlasis[currKlasis]);
        })
    }

    const uploadImage = async (base64EncodedImage) => {
        const res = await axios.post("http://localhost:8080/api/pesertaMupels/upload",
            {
                data: base64EncodedImage,
            })
        return res;
    }

    const handleSubmitFile = () => {
        if (!previewSource) {
            return;
        }
        const res = uploadImage(previewSource);
        return res;
    }

    const previewFile = (value) => {
        getKlasisCode(currKlasis);
        const reader = new FileReader();
        console.log(value);
        reader.readAsDataURL(value);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const onClick = (value) => {
        const utusanCode = util.getUtusanCode(value);
        const statusCode = util.getStatusCode(value);
        const jenisKelaminCode = util.getJenisKelaminCode(value);
        util.getNumberPeserta(value)
            .then((result) => {
                const urutanCode = util.pad(result.data.jumlahPeserta + 1, 3);
                const pesertaId = dataKlasis + utusanCode + urutanCode + statusCode + jenisKelaminCode;
                handleSubmitFile().then((res) => {
                    console.log(res.data["secure_url"]);
                    axios.post("http://localhost:8080/api/pesertaMupels/", {
                        nama: value.nama,
                        runggun: value.runggun,
                        klasis: value.klasis,
                        jenisKelamin: value.jenisKelamin,
                        utusan: value.utusan,
                        status: value.status,
                        noTelp: value.noTelp,
                        pesertaId: pesertaId,
                        foto: res.data["secure_url"],
                        isConfirmed: value.isConfirmed,
                    })
                        .then((response) => {
                            axios.put("http://localhost:8080/api/jumlahPeserta/", {
                                klasis: response.data.klasis,
                                jumlahPeserta: result.data.jumlahPeserta + 1

                            })
                                .then((ress) => {
                                    console.log(ress);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Formik
            initialValues={form}
            validationSchema={registerSchema}
            onSubmit={(values) => {
                onClick(values)
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty, setFieldValue, values } = formik;
                return (
                    <div className="d-flex justify-content-center align-items-center full-height-box">
                        <div className="d-flex flex-column">
                            <div className="inputForm">
                                <Form>
                                    <div className="form-row">
                                        <label className="labelRegistration" htmlFor="nama">Nama</label>
                                        <Field
                                            type="text"
                                            name="nama"
                                            id="nama"
                                            className={
                                                errors.nama && touched.nama ? "input-error" : "form-control"
                                            }
                                        />
                                        <ErrorMessage name="nama" component="nama" className="error" />
                                    </div>
                                    <div className="form-group marginbtm10">
                                        <label className="labelRegistration" htmlFor="utusan">Utusan</label>
                                        <Field
                                            as="Select"
                                            name="utusan"
                                            id="utusan"
                                            className={
                                                errors.utusan && touched.utusan ? "input-error" : "form-control"
                                            }
                                        >
                                            <option value="">---PILIH UTUSAN ANDA---</option>
                                            {ListUtusan}
                                        </Field>
                                        <ErrorMessage name="utusan" component="utusan" className="error" />
                                    </div>
                                    <label className="labelRegistration" >Status</label>
                                    <div className="form-group marginbtm10">
                                        <div className="form-check form-check-inline">
                                            <label>
                                                <Field type="radio" name="status" value="Peninjau" className="form-check-input" disabled={values.utusan == "Utusan Klasis" || values.utusan == "" ? true : false} />
                                                Peninjau
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label>
                                                <Field type="radio" name="status" value="Peserta" className="form-check-input" disabled={values.utusan == "" ? true : false} />
                                                Peserta
                                            </label>
                                        </div>
                                        <ErrorMessage name="status" component="status" className="error" />
                                    </div>
                                    <label className="labelRegistration" >Jenis Kelamin</label>
                                    <div className="form-group marginbtm10">
                                        <div className="form-check form-check-inline">
                                            <label>
                                                <Field type="radio" name="jenisKelamin" value="Laki-laki" className="form-check-input" />
                                                Laki-laki
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label>
                                                <Field type="radio" name="jenisKelamin" value="perempuan" className="form-check-input" />
                                                Perempuan
                                            </label>
                                        </div>
                                        <ErrorMessage name="jenisKelamin" component="jenisKelamin" className="error" />
                                    </div>
                                    <div className="form-group marginbtm10">
                                        <label className="labelRegistration" htmlFor="runggun">Runggun</label>
                                        <Field
                                            as="Select"
                                            name="runggun"
                                            id="runggun"
                                            className={
                                                errors.runggun && touched.runggun ? "input-error" : "form-control"
                                            }
                                        >
                                            <option value="">---PILIH RUNGGUN ANDA---</option>
                                            {ListRunggun}
                                        </Field>
                                        <ErrorMessage name="runggun" component="runggun" className="error" />
                                    </div>
                                    <div className="form-group marginbtm10">
                                        <label className="labelRegistration" htmlFor="noTelp">No.Telepon</label>
                                        <Field
                                            type="text"
                                            name="noTelp"
                                            id="noTelp"
                                            className={
                                                errors.noTelp && touched.noTelp ? "input-error" : "form-control"
                                            }
                                        />
                                        <ErrorMessage name="noTelp" component="noTelp" className="error" />
                                    </div>
                                    <input type="hidden" name="foto" value="Test Foto" />
                                    <div className="form-group marginbtm10">
                                        <label className="labelRegistration" htmlFor="foto">Foto</label>
                                        <input id="foto" name="foto" type="file" onChange={(event) => {
                                            setFieldValue("foto", event.currentTarget.files[0]);
                                            previewFile(event.currentTarget.files[0]);
                                        }} className="form-control" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!(dirty && isValid)}>Submit</button>
                                </Form>
                            </div>
                        </div >
                    </div >
                )
            }}
        </Formik >

    )
}

export default RegistrationPage;