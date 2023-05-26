import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import PdfReader from './PdfReader';
import { useDispatch, useSelector } from 'react-redux'
import { LessonType, SelectedFile } from "../../../../redux/reducers/createCourseSlice"
import { Base_Url } from "../../../../utils/baseUrl";
import axios from 'axios'
import { getCourseChaptersApi } from "../../../autherisation/auth";
import { setCourseChapterData, setOverViewDataADC, setCourseId, setEditState, setLessonState } from "../../../../redux/reducers/addCourseState";
import { errorMessage, successfulMessage } from "../../../toastMesaage/ToastMessage";
import Loading from '../../../../utils/loading/loading'


const LessonDetails = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedType, setSelectedType] = useState('Select your option');
  const [lessonName, setLessonName] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [lessonId, setLessonId] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState();
  const [selectedPdfUrl, setSelectedPdfUrl] = useState();
  const [selectedPptUrl, setSelectedPptUrl] = useState();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState();
  const [selectedWebUrl, setSelectedWebUrl] = useState();
  const [selectedPdfBrowse, setSelectedPdfBrowse] = useState();
  const [selectedPptBrowse, setSelectedPptBrowse] = useState();
  const [selectedVideoBrowse, setSelectedVideoBrowse] = useState();
  const [pdfFileName, setPdfFileName] = useState('')
  const [pptFileName, setPptFileName] = useState('')
  const [videoFileName, setVideoFileName] = useState('')

  const file = useSelector((state) => state.createCourse.selectedFile)
  const editState = useSelector((state) => state.addCourseState.editState)
  const courseId = useSelector((state) => state.addCourseState.courseId)
  const chapId = useSelector((state) => state.addCourseState.selectedChapterId)


  // const lessonData = useSelector((state) => state.overViewData?.lessonData?.lessonDetails[0]?.lesson)
  const lessonData = useSelector((state) => state.overViewData?.lessonData)
  const chapterData = useSelector((state) => state.overViewData.chapterData)


  useEffect(() => {
    setSelectedStatus(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.type ? true : false);
    setSelectedType(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.link[0] ? "URL" : "");

    setLessonName(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.lessonName);
    setSelectedOption(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.type);
    // setSelectedUrl(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.link[0])
    setLessonId(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?._id)

  }, [lessonData])


  useEffect(() => {
    if (selectedOption === "PDF" && selectedType === 'URL') {
      setSelectedPdfUrl(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.link[0]);
    }
    else if (selectedOption === "Weblink" && selectedType === 'URL') {
      setSelectedWebUrl(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.link[0]);
    }
    else if (selectedOption === "PPT" && selectedType === 'URL') {
      setSelectedPptUrl(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.link[0]);
    }
    else if (selectedOption === "Video" && selectedType === 'URL') {
      setSelectedVideoUrl(lessonData === "" ? "" : lessonData?.lessonDetails[0]?.lesson[0]?.link[0]);
    }

<<<<<<< HEAD
  }, [lessonData, selectedType])
=======
  }, [lessonData && selectedType])
>>>>>>> 0ff38a14b700277ce3181d6d1d98deca22fa330e

  // useEffect(() => {


  // }, [lessonData]);

  const handleFile = (event) => {
    // const fileType = event.target.files[0].type;
    // // only allow the selected file type for each option
    // if (
    //   (selectedOption === 'pdf' && fileType === 'application/pdf') ||
    //   (selectedOption === 'ppt' && fileType === 'application/vnd.ms-powerpoint') ||
    //   (selectedOption === 'video' && fileType.startsWith('video/'))
    // ) {
    //   dispatch(SelectedFile(event.target.files[0]));
    // } else {
    //   alert(`Please select a ${selectedOption.toUpperCase()} file.`);
    // }
  };

  //cloudinary upload
  const uploadVideoPreview = (e) => {
    setLoading(true)
    setLoadingMessage('Preview photo is being uploaded to cloud...')
    const link = e.target.files[0]
    const data = new FormData();
    data.append('file', link);
    data.append('upload_preset', 'thsmgpyt'); // Replace with your upload preset name
    data.append('cloud_name', 'deiz877la');

    fetch(
      "https://api.cloudinary.com/v1_1/deiz877la/video/upload", {
      method: "post",
      body: data
    }).then((res) =>
      res.json()
    )
      .then((data) => {
        console.log("data", data);
        data?.url && setSelectedVideoBrowse(data?.url);
        data?.url && setVideoFileName(data?.original_filename + "." + data?.format);
        setLoading(false)
        setLoadingMessage('')

      }).catch((err) => {
        console.log("err", err)
        setLoading(false)
        setLoadingMessage('')
      })

  }


  //cloudinary upload
  const uploadFile = (e) => {
    setLoading(true)
    setLoadingMessage('Preview photo is being uploaded to cloud...')
    const link = e.target.files[0]
    const data = new FormData();
    data.append('file', link);
    data.append('upload_preset', 'thsmgpyt'); // Replace with your upload preset name
    data.append('cloud_name', 'deiz877la');

    fetch(
      "https://api.cloudinary.com/v1_1/deiz877la/upload", {
      method: "post",
      body: data
    }).then((res) =>
      res.json()
    )
      .then((data) => {
        console.log("data", data);
        if (selectedOption === "PDF") {
          data?.url && setSelectedPdfBrowse(data?.url);
          data?.url && setPdfFileName(data?.original_filename + "." + data?.format);
        } else if (selectedOption === "PPT") {
          data?.url && setSelectedPptBrowse(data?.url);
          data?.url && setPptFileName(data?.original_filename + "." + data?.url.substring(data?.url.lastIndexOf(".") + 1));

        }
        setLoading(false)
        setLoadingMessage('')

      }).catch((err) => {
        console.log("err", err)
        setLoading(false)
        setLoadingMessage('')
      })

  }

  useEffect(() => {
    if (selectedOption === "PDF" && selectedType === 'Browse') {
      setSelectedUrl(selectedPdfBrowse);
    } else if (selectedOption === "PDF" && selectedType === 'URL') {
      setSelectedUrl(selectedPdfUrl);
    }
    else if (selectedOption === "Weblink" && selectedType === 'URL') {
      setSelectedUrl(selectedWebUrl);
    }
    else if (selectedOption === "PPT" && selectedType === 'Browse') {
      setSelectedUrl(selectedPptBrowse);
    }
    else if (selectedOption === "PPT" && selectedType === 'URL') {
      setSelectedUrl(selectedPptUrl);
    }
    else if (selectedOption === "Video" && selectedType === 'URL') {
      setSelectedUrl(selectedVideoUrl);
    }
    else if (selectedOption === "Video" && selectedType === 'Browse') {
      setSelectedUrl(selectedVideoBrowse);
    }
  }, [selectedType, selectedPdfUrl, selectedPptUrl, selectedVideoUrl, selectedWebUrl, selectedPdfBrowse, selectedPptBrowse, selectedVideoBrowse, selectedOption]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('_id', chapId);
    formData.append('lessonName', lessonName);
    formData.append('link', selectedUrl);
    formData.append('type', selectedOption);
    console.log(chapId)
    try {
      const fetchedData = await axios(
        `${Base_Url}/api/v1/add_lessons`,
        {
          method: "patch",
          data: formData,
          headers: {
            Accept: "*/*",
            "Content-Type": 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      console.log("res", fetchedData);
      getChaptersListApiCall();
      successfulMessage('Lesson added Successfully');
      dispatch(setLessonState(false));
      return fetchedData;
    }

    catch (error) {
      errorMessage('Something went wrong')
      console.error(error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('lessonId', lessonId);
    formData.append('lessonName', lessonName);
    formData.append('link', selectedUrl);
    formData.append('type', selectedOption);

    try {
      const fetchedData = await axios(
        `${Base_Url}/api/v1/edit_lesson`,
        {
          method: "patch",
          data: formData,
          headers: {
            Accept: "*/*",
            "Content-Type": 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      console.log("res", fetchedData);
      getChaptersListApiCall();
      successfulMessage('Lesson edited Successfully');
      dispatch(setLessonState(false));
      return fetchedData;
    }

    catch (error) {
      errorMessage('Something went wrong')
      console.error(error);
    }
  };

  const getChaptersListApiCall = async () => {
    const response = await getCourseChaptersApi(courseId);
    if (response) {
      if (response && response.overview) {
        dispatch(setOverViewDataADC(response.overview));
      }
      if (response && response.courseChapters) {
        dispatch(setCourseChapterData(response.courseChapters));
      }
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

                  <div>
                    <div className="upload-dropDown">
                      <div className="upload-title">Lesson&nbsp;Type</div>

                      <div className="upload-videoTitle">
                        <select
                          required
                          value={selectedOption}
                          name="videoCategory"
                          className="upload-select"
                          onChange={(e) => {
                            dispatch(LessonType(e.target.value))
                            setSelectedOption(e.target.value);
                            setSelectedFile(null);
                            setSelectedStatus(true);
                          }}
                        >
                          <option>Select your option</option>
                          <option value="PDF" className='QandA-option'>PDF</option>
                          <option value="PPT" className='QandA-option'>PPT</option>
                          <option value="Video" className='QandA-option'>Video</option>
                          <option value="Weblink" className='QandA-option'>Weblink</option>
                        </select>
                      </div>

                      {selectedStatus && (
                        selectedOption === "Weblink" ? (
                          <>
                            <div>
                              <div className="PDFcontainer">
                                <label className='upload-title'>Enter {selectedOption} URL</label>
                                <br></br>
                                <input className="form-control" id={`{selectedOption}Url`} value={selectedWebUrl} onChange={(e) => { setSelectedWebUrl(e.target.value) }}></input>
                              </div>
                            </div>
                          </>
                        )
                          : (
                            <>
                              <div>
                                <div className="upload-title">Enter the type of {selectedOption}</div>
                                <select
                                  name="videoType"
                                  className="upload-select"
                                  value={selectedType}
                                  onChange={(e) => {
                                    setSelectedType(e.target.value)
                                    // setVideoLink("")
                                  }}
                                >
                                  <option>Select your option</option>
                                  <option value="Browse"> Browse from the device</option>
                                  <option value="URL"> Give an URL</option>
                                </select>

                                {selectedOption === 'PDF' &&
                                  selectedType === 'URL' && (
                                    <>
                                      <label className='upload-title'>Enter {selectedOption} URL</label>
                                      <input className="upload-inputField" id={`{selectedOption}Url`}
                                        value={selectedPdfUrl}
                                        onChange={(e) => { setSelectedPdfUrl(e.target.value) }}
                                      />
                                    </>
                                  )
                                }

                                {selectedOption === 'PPT' &&
                                  selectedType === 'URL' && (
                                    <>
                                      <label className='upload-title'>Enter {selectedOption} URL</label>
                                      <input className="upload-inputField" id={`{selectedOption}Url`}
                                        value={selectedPptUrl}
                                        onChange={(e) => { setSelectedPptUrl(e.target.value) }}
                                      />
                                    </>
                                  )
                                }


                                {selectedOption === 'Video' &&
                                  selectedType === 'URL' && (
                                    <>
                                      <label className='upload-title'>Enter {selectedOption} URL</label>
                                      <input className="upload-inputField" id={`{selectedOption}Url`}
                                        value={selectedVideoUrl}
                                        onChange={(e) => { setSelectedVideoUrl(e.target.value) }}
                                      />
                                    </>
                                  )
                                }

                                {selectedOption === 'PDF' &&
                                  selectedType === 'Browse' && (
                                    <>
                                      <label className='upload-title'>Enter {selectedOption} URL</label>
                                      <br></br>
                                      <div className='browse'>
                                        <input type="file"
                                          accept={".pdf"}
                                          className="uploadUrl" onChange={(e) => { handleFile(); uploadFile(e) }} />
                                        <div>{pdfFileName}</div>
                                      </div>
                                    </>
                                  )
                                }


                                {selectedOption === 'PPT' &&
                                  selectedType === 'Browse' && (
                                    <>
                                      <label className='upload-title'>Enter {selectedOption} URL</label>
                                      <br></br>
                                      <div className='browse'>
                                        <input type="file"
                                          accept={".ppt,.pptx"}
                                          className="uploadUrl" onChange={(e) => { handleFile(); uploadFile(e) }} />
                                        <div>{pptFileName}</div>
                                      </div>
                                    </>
                                  )
                                }


                                {selectedOption === 'Video' &&
                                  selectedType === 'Browse' && (
                                    <>
                                      <label className='upload-title'>Enter {selectedOption} URL</label>
                                      <br></br>
                                      <div className='browse'>
                                        <input type="file"
                                          accept={"video/*"}
                                          className="uploadUrl" onChange={(e) => { handleFile(); uploadVideoPreview(e) }} />
                                        <div>{videoFileName}</div>
                                      </div>
                                    </>
                                  )
                                }

                              </div>

                            </>
                          )
                      )}

                    </div >
                  </div>




                </div>

                <div
                  className="Upload-buttonPublish"
                  style={{ marginTop: '10px' }}
                ></div>
              </div >


              <div className="DummyFileRight-Save-buttonPublish">
                <button className="QandA-ButtonEdit" id="edit" disabled={editState === "edit" ? false : true} onClick={(e) => { handleEdit(e) }}>
                  Edit
                </button>
                <button type="submit" className="QandA-Button" id="save" disabled={editState === "edit" ? true : false}>
                  Save
                </button>
              </div>

            </div >
          </form>
        </div>
      </div >

      {loading && <Loading />}
    </div >
  );
};

export default LessonDetails;

