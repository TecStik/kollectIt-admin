import React from 'react';
import './CsvfileUpload.css'


export default function CsvfileUpload() {
    return (
        <div>
            <div className="file-upload">
                <button className="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Excel</button>

                <div className="image-upload-wrap">
                    <form id="vts_form" enctype="multipart/form-data" method="post">
                        <input className="file-upload-input" name="input-file" type='file' onchange="readURL(this);" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </form>
                    <div className="drag-text">
                        <h3>Drag your excel or click<strong> ADD EXCEL</strong></h3>
                    </div>
                </div>
                <div className="file-upload-content">
                    <img className="file-upload-image" src="/assets/img/demo/excelIcon.png" alt="excel icon" />
                    <div className="image-title-wrap">
                        <button type="button" onclick="removeUpload()" className="remove-image">Remove <span className="image-title">Uploaded Excel</span></button>
                        <button type="button" class="upload-image">Upload <span className="image-title">Uploaded Excel</span></button>
                    </div>
                </div>
            </div>

        </div>
    )
}
