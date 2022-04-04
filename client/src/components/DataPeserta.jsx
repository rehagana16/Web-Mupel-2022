import React from "react";

const currKlasis = util.getCookie("token") != "" ? jwt_decode(util.getCookie("token"))["klasis"] : "";

function DataPeserta() {
    return (
        <h1>DataPeserta</h1>
    )
}

export default DataPeserta;