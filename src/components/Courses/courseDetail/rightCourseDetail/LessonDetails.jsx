import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import PdfReader from './PdfReader';
import { useDispatch, useSelector } from 'react-redux'
import { LessonType, SelectedFile } from "../../../../redux/reducers/createCourseSlice"
import { Base_Url } from "../../../../utils/baseUrl";
import axios from 'axios'

const LessonDetails = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [lessonName, setLessonName] = useState("");

  const file = useSelector((state) => state.createCourse.selectedFile)

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("save")

    const formData = new FormData();
    formData.append('_id', '645a28fa61c22c1dbaaec6a5');
    formData.append('lessonName', lessonName);
    formData.append('link', file);
    formData.append('type', event.target.videoCategory.value);

    try {
      const response = await axios.patch(`${Base_Url}/api/v1/add_lessons`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }

      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-container">
      <div className="DummyFileRight-date-recentcourse">
        <div className="DummyFileRight-upload-container">
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <div className="upload-container">
              <div id="form" className="upload-formController">
                <div className="upload-videoCategory">
                  <div>
                    {' '}
                    <div className="upload-title">Lesson&nbsp;Title</div>

                    <input
                      type="text"
                      name="videoTitle"
                      placeholder="Video Title"
                      className="upload-inputField title richText-container"
                      required
                      autoComplete="off"
                      value={lessonName}
                      onChange={(e) => {
                        setLessonName(e.target.value)
                      }}
                    />

                  </div>

                  <div className="upload-videoSubCategory">
                    <div className="upload-dropDown">
                      <div className="upload-title">Lesson&nbsp;Type</div>

                      <div className="upload-videoTitle">
                        <select
                          // value={vCategory}
                          name="videoCategory"
                          className="upload-select"
                          onChange={(e) => {
                            dispatch(LessonType(e.target.value))
                            setSelectedOption(e.target.value);
                            setSelectedFile(null);
                          }}
                        >
                          <option>Select your option</option>
                          <option value="PDF" className='QandA-option'>PDF</option>
                          <option value="PPT" className='QandA-option'>PPT</option>
                          <option value="Video" className='QandA-option'>Video</option>
                          <option value="PDF URL" className='QandA-option'>PDF URL</option>
                          <option value="Video URL" className='QandA-option'>Video URL</option>
                          <option value="Weblink" className='QandA-option'>Weblink</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {selectedOption === 'PDF' && (
                    <div className="PDFcontainer">
                      <label className='upload-title'>Upload PDF</label>
                      <br></br>

                      <input type="file" accept=".pdf" className="form-control" onChange={handleFile} />
                    </div>
                  )}
                  {selectedOption === 'PPT' && (

                    <div className="PDFcontainer">
                      <label className='upload-title'>Upload PPT</label>
                      <br></br>
                      <input type="file" accept=".ppt,.pptx" className="form-control" onChange={handleFile} />
                    </div>
                  )}
                  {selectedOption === 'Video' && (
                    <div className="PDFcontainer">
                      <label className='upload-title'>Upload Video</label>
                      <br></br>
                      <input type="file" accept="video/*" className="form-control" onChange={handleFile} />
                    </div>
                  )}
                  {selectedOption === 'PDF URL' && (
                    <div className="PDFcontainer">
                      <label className='upload-title'>Enter PDF URL</label>
                      <br></br>
                      <input className="form-control" id='pdfUrl'></input>
                    </div>
                  )}
                  {selectedOption === 'Video URL' && (
                    <div className="PDFcontainer">
                      <label className='upload-title'>Enter video URL</label>
                      <br></br>
                      <input className="form-control" id='videoUrl'></input>
                    </div>
                  )}
                  {selectedOption === 'Weblink' && (
                    <div className="PDFcontainer">
                      <label className='upload-title'>Enter Weblink</label>
                      <br></br>
                      <input className="form-control" id='weblink'></input>
                    </div>
                  )}

                </div>

                <div
                  className="Upload-buttonPublish"
                  style={{ marginTop: '10px' }}
                ></div>
              </div >


              <div className="DummyFileRight-Save-buttonPublish">
                <button className="QandA-ButtonEdit" id="edit">
                  Edit
                </button>
                <button type="submit" className="QandA-Button" id="save">
                  Save
                </button>
              </div>

            </div >
          </form>
        </div>
      </div>
    </div>

  );
};

export default LessonDetails;
