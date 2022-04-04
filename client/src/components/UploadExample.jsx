import React, { useState } from "react";
import axios from "axios"

function Upload() {
    const [fileInputState, stateFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        console.log("FILE");
        console.log(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }
    const handleSubmitFile = (e) => {
        console.log("SUBMITTING....")
        e.preventDefault();
        if (!previewSource) return;
        console.log("TEST")
        uploadImage(previewSource);
    }
    const uploadImage = (base64EncodedImage) => {
        axios.post("http://localhost:8080/api/pesertaMupels/upload",
            {
                data: base64EncodedImage,
            })
    }
    return (
        <div>
            <h1> Upload </h1>
            <form onSubmit={handleSubmitFile}>
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                previewSource && (
                    <img src={previewSource} alt="chosen"
                        style={{ height: '300px' }} />
                )
            }
        </div >
    )
}

export default Upload;