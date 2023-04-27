import React from 'react';
import './DummyFileRight.css';
import { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfReader = () => {
    // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // pdf file onChange state
    const [pdfFile, setPdfFile] = useState(null);
    // pdf file error state
    const [pdfError, setPdfError] = useState('');
    // handle file onChange event
    const allowedFiles = ['application/pdf'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        // console.log(selectedFile.type);
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfError('');
                    setPdfFile(e.target.result);
                }
            }
            else {
                setPdfError('Not a valid pdf: Please select only PDF');
                setPdfFile('');
            }
        }
        else {
            console.log('please select a PDF');
        }
    }

    return (
        <div className="PDFcontainer">
            <label className='upload-title'>Upload PDF</label>
            <br></br>
            <input type='file' className="form-control"
                onChange={handleFile}></input>
            {pdfError && <span className='text-danger'>{pdfError}</span>}

            <div className='upload-title'>View PDF</div>
            <div className="viewerContainer">
                {pdfFile && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                        {console.log(pdfFile)}
                        <Viewer fileUrl={pdfFile}
                            plugins={[defaultLayoutPluginInstance]}></Viewer>
                    </Worker>
                )}
                {!pdfFile && <>No file is selected yet</>}
            </div>
        </div>
    );
};

export default PdfReader;

