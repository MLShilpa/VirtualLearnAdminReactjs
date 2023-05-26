import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  storeoverViewVideo,
  storeoverViewPhoto,
  storeoverViewData,
  storelearningOutCome,
  storerequirements,
  storedifficultyLevel,
  storecourseKeyword,
} from '../../../redux/reducers/overViewSlice'
import Loading from '../../../utils/loading/loading'
import './OtherTextArea.css'
import ReactPlayer from "react-player";

const OtherTextArea = (props) => {
  const [cloudinaryVideo, setcloudinaryVideo] = useState('')
  const [photoLink, setPhotoLink] = useState('')
  // const [videoLink, setVideoLink] = useState('')
  const [message, setMessage] = useState('')
  const [progressValue, setProgressValue] = useState(0)
  const [originalFileName, setOriginalFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  // overViewData?.overview?.courseVideo != null ? setVideoType('URL') : setVideoType('Select your option')

  const overViewData = useSelector((state) => state.overViewData.overViewData)
  useEffect(() => {

    overViewData?.overview?.courseVideo && props.setVideoType('URL')
  }, [overViewData])


  const dispatch = useDispatch()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setRequire(require + '\n• ');
    }
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
        data?.url && props.setBrowseUrl(data?.url)
        data?.original_filename && setOriginalFileName(data?.original_filename + "." + data?.format)
        // data?.url && props.setVideoUrl("")
        data?.url && props.setVideoLink(link)
        setLoading(false)
        setLoadingMessage('')

      }).catch((err) => {
        console.log("err", err)
        setLoading(false)
        setLoadingMessage('')
      })

  }

  //cloudinary upload

  function uploadPhoto(e) {
    setLoading(true)
    setLoadingMessage('Preview photo is being uploaded to cloud...')
    const image = e.target.files[0]
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'thsmgpyt'); // Replace with your upload preset name
    data.append('cloud_name', 'deiz877la');

    fetch(
      "https://api.cloudinary.com/v1_1/deiz877la/image/upload", {
      method: "post",
      body: data
    }).then((res) =>
      res.json()
    )
      .then((data) => {
        console.log("data", data);
        data?.url && props.setPhoto(data?.url)
        setLoading(false)
        setLoadingMessage('')

      }).catch((err) => {
        console.log("err", err)
        setLoading(false)
        setLoadingMessage('')
      })
  }



  // console.log('video pic link', photoLink, videoLink)

  const overview = useSelector((state) => state.overViewData)
  const [outcome, setOutcome] = useState(overview.learningOutCome)
  const [require, setRequire] = useState(overview.requirements)
  const [diff, setDiff] = useState(overview.difficultyLevel)

  // const [learningOutCome, setLearningOutCome] = useState(null)
  // const [difficultyLevel, setDifficultyLevel] = useState(null)
  // const [requirements, setRequirements] = useState(null)
  const [photo, setPhoto] = useState(null)

  // console.log('overview', overview)

  useEffect(() => {
    if (overViewData) {
      props.setLearningOutCome(overViewData?.overview?.outcome);
      props.setRequirements(overViewData?.overview?.requirements);
      props.setPhoto(overViewData?.overview?.courseImage);
      props.setDifficultyLevel(overViewData?.overview?.difficulty);
      // props.setPhoto(overViewData?.overview?.courseImage);
      props.setVideoUrl(overViewData?.overview?.courseVideo)

    }
  }, [overViewData]);
  return (
    <>
      <div className="upload-videoCategoryFileds">
        <div>
          {' '}
          <div className="upload-title">Course&nbsp;Outcome</div>
          <div className="DummyFileRight-textarea-tagline">
            <textarea
              value={props.learningOutCome}
              onChange={(e) => {
                dispatch(storelearningOutCome(e.target.value))
                props.setLearningOutCome(e.target.value)
              }}
              name="courseOutcome"
              className="upload-inputField "
              required
              autoComplete="off"
            ></textarea>
          </div>
        </div>
        <div>
          <div className="upload-title">Requirements</div>
          <div className="DummyFileRight-textarea-tagline">
            <textarea
              name="requirements"
              className="upload-inputField "
              required
              autoComplete="off"
              value={props.requirements}
              onChange={(e) => {
                dispatch(storerequirements(e.target.value))
                props.setRequirements(e.target.value)
              }}
            // onKeyDown={handleKeyDown}
            ></textarea>

          </div>
        </div>
      </div>
      {/* <div className="upload-videoCategoryFiles"> */}
      <div>
        {' '}
        <div className="upload-title">Course Thumbnail</div>
        <div className="DummyFileRight-textarea-tagline">
          <input
            type="file"
            onChange={(e) => {
              uploadPhoto(e)
              // props.setImage(e)
              setPhotoLink(e.target.files[0])
              dispatch(storeoverViewPhoto({ imageUpload: e.target.files[0] }))
            }}
            name="imageUpload"
            accept="image/png, image/jpeg"
            placeholder="Video Title"
            className="upload-inputField title"
            autoComplete="off"
          />
        </div>
        <img src={props.photo} className='showImage' />

      </div>
      <div>
        <div className="upload-title">Preview Video</div>
        <select
          name="videoType"
          className="upload-select"
          // value={overViewData?.overview?.courseVideo ? 'URL' : 'select your option'}
          value={props.videoType}
          onChange={(e) => {
            props.setVideoType(e.target.value)
            // setVideoLink("")
          }}
        >
          <option>Select your option</option>
          <option value="Browse"> Browse from the device</option>
          <option value="URL"> Give an URL</option>
        </select>

        {props.videoType === 'URL' &&
          (<input
            name="videoUpload"
            // value={overViewData?.overview?.courseVideo ? overViewData?.overview?.courseVideo : videoUrl}
            value={props.videoUrl}
            onChange={(e) => {
              // uploadVideoPreview(e)
              props.setVideoUrl(e.target.value)
              props.setEnteredUrl(e.target.value)
              dispatch(storeoverViewVideo({ videoUpload: e.target.value }))
            }}
            placeholder="Enter the URL"
            className="upload-inputField category"
          />)}

        {props.videoType === 'Browse' &&
          (
            <>
              <div className='browse'>
                <input
                  type="file"
                  name="videoUpload"
                  onChange={(e) => {
                    props.setVideoLink(e.target.files[0])
                    // props.setLink(e);
                    // props.setVideoUrl("")
                    // setSrc(URL.createObjectURL(props.videoLink));
                    // console.log("Fsg", URL.createObjectURL(videoLink))
                    uploadVideoPreview(e)
                    dispatch(storeoverViewVideo({ videoUpload: e.target.files[0].name }))
                  }}
                  accept="video/*"
                  autoComplete="off"
                  placeholder="Video Category"
                  className="uploadUrl category"
                />
                <div>{originalFileName}</div>
              </div>
            </>)}

        <ReactPlayer
          url={props.videoType === 'URL' ? props.videoUrl : props.videoType === 'Browse' ? props.browseUrl : null}
          controls
          className="react-player"
          width="200px"
          height="200px"
        />
      </div>

      {/* </div> */}
      <div className="upload-difficultyLevel">
        <div>
          <div className="upload-title">Difficulty&nbsp;Level</div>
          <div className="upload-videoTitle">
            <select
              name="difficultyLevel"
              className="upload-select"
              value={props.difficultyLevel}
              onChange={(e) => {
                dispatch(storedifficultyLevel(e.target.value))
                props.setDifficultyLevel(e.target.value)
              }}
            >
              <option>Select your option</option>
              <option value="Beginner"> Beginner</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <div className="upload-title">Course&nbsp;Keyword</div>
          <input
            type="text"
            name="courseKeyWord"
            placeholder="Course Keyword"
            className="upload-inputField category"
            autoComplete="off"
            required
            value={props.keyword}
            onChange={(e) => {
              dispatch(storecourseKeyword(e.target.value))
              props.setKeyword(e.target.value)
            }}
          />
        </div>
      </div>
      {loading && <Loading />}


    </>
  )
}

export default OtherTextArea
