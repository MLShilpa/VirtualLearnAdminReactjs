import React from 'react';
import './DummyFileRight.css';
import { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useDispatch, useSelector } from 'react-redux'
import { SelectedFile } from "../../../../redux/reducers/createCourseSlice"

const PdfReader = () => {
    const selectedOption = useSelector((state) => state.createCourse.lessonType)
    const selectedFile = useSelector((state) => state.createCourse.selectedFile)
    const dispatch = useDispatch();

    const handleFile = (event) => {
        const fileType = event.target.files[0].type;
        // only allow the selected file type for each option
        if (
            (selectedOption === 'pdf' && fileType === 'application/pdf') ||
            (selectedOption === 'ppt' && fileType === 'application/vnd.ms-powerpoint') ||
            (selectedOption === 'video' && fileType.startsWith('video/'))
        ) {
            dispatch(SelectedFile(event.target.files[0]));
        } else {
            alert(`Please select a ${selectedOption.toUpperCase()} file.`);
        }
    };

    return (
        <>
            {(() => {
                switch (selectedOption) {
                    case 'PDF':
                        return (
                            <div className="PDFcontainer">
                                <label className='upload-title'>Upload PDF</label>
                                <br></br>

                                <input type="file" accept=".pdf" className="form-control" onChange={handleFile} />
                            </div>
                        )
                    case 'PPT':
                        return (

                            <div className="PDFcontainer">
                                <label className='upload-title'>Upload PPT</label>
                                <br></br>
                                <input type="file" accept=".ppt,.pptx" className="form-control" onChange={handleFile} />
                            </div>
                        )
                    case 'Video':
                        return (
                            <div className="PDFcontainer">
                                <label className='upload-title'>Upload Video</label>
                                <br></br>
                                <input type="file" accept="video/*" className="form-control" onChange={handleFile} />
                            </div>
                        )
                    case 'PDF URL':
                        return (
                            <div className="PDFcontainer">
                                <label className='upload-title'>Enter PDF URL</label>
                                <br></br>
                                <input className="form-control" id='pdfUrl'></input>
                            </div>
                        )
                    case 'Video URL':
                        return (
                            <div className="PDFcontainer">
                                <label className='upload-title'>Enter video URL</label>
                                <br></br>
                                <input className="form-control" id='videoUrl'></input>
                            </div>
                        )
                    case 'Weblink':
                        return (
                            <div className="PDFcontainer">
                                <label className='upload-title'>Enter Weblink</label>
                                <br></br>
                                <input className="form-control" id='weblink'></input>
                            </div>
                        )
                    default:
                        return null
                }
            })()}
        </>
    );
};

export default PdfReader;

