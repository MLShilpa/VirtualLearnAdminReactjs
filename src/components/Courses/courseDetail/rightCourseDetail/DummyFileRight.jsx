import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./DummyFileRight.css";
import { pdfImage } from "../../../../assets/pdf_img.png";
import { icn_active } from "../../../../assets/DropdownArrow.png";
import { addIcon } from "../../../../utils/icons";
import RichTextEditor from "../../../AddCoursesFolder/richTextEditor/RichTextEditor";
import OtherTextArea from "../../../AddCoursesFolder/otherTextArea/OtherTextArea";
import { useDropzone } from "react-dropzone";
import PdfReader from "./PdfReader";
import { Base_Url } from "../../../../utils/baseUrl";
import { CategoryId } from "../../../../redux/reducers/createCourseSlice";
import {
  reset,
  storeCategory,
  storeName,
  storeoverViewData,
  storeSubCategory,
  storeTagline,
} from "../../../../redux/reducers/overViewSlice";
import Loading from "../../../../utils/loading/loading";
import {
  setCourseId,
  setCourseState,
  setEditState,
  setOverViewDataADC,
  setCourseChapterData,
} from "../../../../redux/reducers/addCourseState";
import { getCourseChaptersApi } from "../../../autherisation/auth";
import {
  errorMessage,
  successfulMessage,
} from "../../../toastMesaage/ToastMessage";

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const DummyFileRight = () => {
  const overViewData = useSelector((state) => state.overViewData.overViewData);
  const editState = useSelector((state) => state.addCourseState.editState);
  const courseId = useSelector((state) => state.addCourseState.courseId);

  const [categoryList, setCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  // const overview = useSelector((state) => state.overViewData)

  const [videoUrl, setVideoUrl] = useState();
  const [videoType, setVideoType] = useState("Select your option");
  const [videoLink, setVideoLink] = useState("");
  const [title, setTitle] = useState(null);
  const [vCategory, setvCategory] = useState(null);
  const [vSubCategory, setvSubCategory] = useState(null);
  const [taglinee, setTaglinee] = useState(null);
  const [description, setDescription] = useState(null);
  const [learningOutCome, setLearningOutCome] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [browseUrl, setBrowseUrl] = useState(null);
  const [enteredUrl, setEnteredUrl] = useState(null);
  const [editCourseId, setEditCourseId] = useState();
  const [keyword, setKeyword] = useState(null);

  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.overViewData?.categoryId);
  const coursePhoto = useSelector((state) => state.overViewData?.coursePhoto);
  // const previewVideo = useSelector((state) => state.overViewData?.previewVideo)

  useEffect(() => {
    if (overViewData) {
      setTitle(overViewData?.overview?.title);
      setTaglinee(overViewData?.overview?.tagline);
      setvCategory(overViewData?.overview?.category);
      setvSubCategory(overViewData?.overview?.subCategory);
      setDescription(overViewData?.overview?.description);
      setLearningOutCome(overViewData?.overview?.outcome);
      setRequirements(overViewData?.overview?.requirements);
      setPhoto(overViewData?.overview?.courseImage);
      setPreviewVideo(overViewData?.overview?.courseVideo);
      setDifficultyLevel(overViewData?.overview?.difficulty);
      setEditCourseId(overViewData?.overview?._id);
      setKeyword(overViewData?.overview?.keywords);
    }
  }, [overViewData]);

  useEffect(() => {
    if (videoType === "Browse") {
      setPreviewVideo(browseUrl);
    } else if (videoType === "URL") {
      setPreviewVideo(videoUrl);
    }
  }, [videoType, browseUrl, videoUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", vCategory);
    formData.append("subCategory", vSubCategory);
    formData.append("description", description);
    formData.append("requirements", requirements);
    formData.append("tagline", taglinee);
    formData.append("keywords", keyword);
    formData.append("courseImage", photo);
    formData.append("courseVideo", previewVideo);
    formData.append("outcome", learningOutCome);
    formData.append("difficulty", difficultyLevel);

    try {
      const fetchedData = await axios(`${Base_Url}/api/v1/create_course`, {
        method: "post",
        data: formData,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      // console.log("fetchedData",fetchedData?.data?.courseId?._id);
      dispatch(setCourseId(fetchedData?.data?.courseId?._id));
      dispatch(setCourseState(false));
      successfulMessage("Course created successfully");
      return fetchedData;
    } catch (err) {
      let error = err;
      console.log("error", error);
      errorMessage("something went wrong");
    }
  };

  const handleEdit = async (event) => {
    // getPreviewVideo();
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", vCategory);
    formData.append("subCategory", vSubCategory);
    formData.append("description", description);
    formData.append("requirements", requirements);
    formData.append("tagline", taglinee);
    formData.append("keywords", "design");
    formData.append("courseImage", photo);
    formData.append("courseVideo", previewVideo);
    // formData.append('keywords', event.target.image.files[0]);
    formData.append("outcome", learningOutCome);
    formData.append("difficulty", "medium");
    formData.append("courseId", editCourseId);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      const fetchedData = await axios(`${Base_Url}/api/v1/edit_course`, {
        method: "patch",
        data: formData,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      // console.log("res", fetchedData);
      getChaptersListApiCall();
      successfulMessage("Course edited successfully");
      dispatch(setCourseState(false));
      return fetchedData;
    } catch (err) {
      let error = err;
      console.log("error", error);
      errorMessage("something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`${Base_Url}/api/v1/category_list`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert('Some error occured')
      });
  }, []);

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
    <>
      <div className="main-container">
        <div className="DummyFileRight-date-recentcourse">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="DummyFileRight-upload-container">
              <div id="form" className="upload-formController">
                <div className="DummyFileRight-upload-videoCategory">
                  <div>
                    {" "}
                    <div className="upload-title">Course&nbsp;Title</div>
                    <div className="upload-videoTitleee">
                      <input
                        type="text"
                        name="videoTitle"
                        placeholder="Course Title"
                        className="upload-inputField title"
                        required
                        autoComplete="off"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          dispatch(storeName(e.target.value));
                        }}
                      />
                    </div>
                  </div>

                  <div className="upload-videoSubCategory">
                    <div className="upload-dropDown">
                      <div className="upload-title">Video&nbsp;Category</div>

                      <div className="upload-videoTitle">
                        <div class="dropdown">
                          <div
                            onClick={() => {
                              myFunction();
                            }}
                            className="dropbtn upload-selectDrop"
                          >
                            {vCategory}
                          </div>
                          <img
                            src={require("../../../../assets/DropdownArrow.png")}
                            alt=""
                            className="imgDropDown"
                          />
                          <div id="myDropdown" class="dropdown-content">
                            {categoryList &&
                              categoryList.map((ele, id) => {
                                return (
                                  <div
                                    className="QandA-option optionsDiv"
                                    key={id}
                                    onClick={() => {
                                      dispatch(
                                        storeCategory(ele && ele._id && ele._id)
                                      );
                                      setvCategory(ele.categories.category);
                                    }}
                                    value={vCategory}
                                  >
                                    {ele?.categories?.category}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="upload-dropDown">
                      <div className="upload-title">
                        Video&nbsp;Sub&nbsp;Category
                      </div>
                      <div className="upload-videoTitle">
                        <select
                          name="videoSubCategory"
                          className="upload-select"
                          value={vSubCategory}
                          onChange={(e) => {
                            setvSubCategory(e.target.value);
                          }}
                        >
                          <option>Select your option</option>
                          {categoryList &&
                            categoryList.map((ele, id) => {
                              if (ele.categories.category === vCategory) {
                                return ele.categories.subCategory.map(
                                  (element, subId) => {
                                    return (
                                      <option
                                        value={element}
                                        className="QandA-option"
                                        key={subId}
                                        onClick={() => {
                                          //  dispatch(storeCategory(ele && ele._id && ele._id))
                                          // setvSubCategory(ele && ele)
                                          // console.log(vSubCategory);
                                        }}
                                      >
                                        {element && element}
                                      </option>
                                    );
                                  }
                                );
                              }
                              return null; // Return null if the condition is not met for the current item
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="upload-tagline">
                  <div>
                    {" "}
                    <div className="upload-title">Video&nbsp;Tagline</div>
                    <div className="DummyFileRight-textarea-tagline">
                      <textarea
                        name="tagline"
                        className="upload-inputField tagline"
                        required
                        autoComplete="off"
                        value={taglinee}
                        onChange={(e) => {
                          dispatch(storeTagline(e.target.value));
                          setTaglinee(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="upload-addDescription">
                  <div className="upload-discriptionTitle">
                    Add&nbsp;Discription&nbsp;/&nbsp;Overview
                  </div>
                  <div className="uplaod-discriptionArea">
                    <RichTextEditor
                      description={description}
                      setDescription={setDescription}
                    />
                  </div>
                  <div className="uplaod-TextArea">
                    <OtherTextArea
                      learningOutCome={learningOutCome}
                      setLearningOutCome={setLearningOutCome}
                      difficultyLevel={difficultyLevel}
                      setDifficultyLevel={setDifficultyLevel}
                      setRequirements={setRequirements}
                      requirements={requirements}
                      photo={photo}
                      setPhoto={setPhoto}
                      previewVideo={previewVideo}
                      setPreviewVideo={setPreviewVideo}
                      videoUrl={videoUrl}
                      setVideoUrl={setVideoUrl}
                      videoLink={videoLink}
                      setVideoLink={setVideoLink}
                      videoType={videoType}
                      setVideoType={setVideoType}
                      browseUrl={browseUrl}
                      setBrowseUrl={setBrowseUrl}
                      enteredUrl={enteredUrl}
                      setEnteredUrl={setEnteredUrl}
                      keyword={keyword}
                      setKeyword={setKeyword}
                    />
                  </div>
                </div>
                <div
                  className="Upload-buttonPublish"
                  style={{ marginTop: "10px" }}
                ></div>
              </div>
              <div className="DummyFileRight-Save-buttonPublish">
                <button
                  className="QandA-ButtonEdit"
                  id="edit"
                  disabled={editState === "edit" ? false : true}
                  onClick={(e) => {
                    handleEdit(e);
                  }}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="QandA-Button"
                  id="save"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  disabled={editState === "edit" ? true : false}
                >
                  Save
                </button>
              </div>
            </div>
          </form>

          {/* <form onSubmit={(e) => {
            // uploadVideosHandler(e)
            // overViewHandler(e)
          }}>
            <div className="DummyFileRight-upload-container">
              <div className='upload-videoTitleee'>
              <input
                type="text"
                placeholder="Chapter Title"
                className="upload-inputField title chapName"
              />
              </div>
              <div className="DummyFileRight-Save-buttonPublish">
                <button type="submit" className="QandA-Button" id="save" disabled>
                  Save
                </button>
              </div>
            </div>
          </form> */}

          {/* <form
            onSubmit={(e) => {
              // uploadVideosHandler(e)
              // overViewHandler(e)
            }}
          >
            <div className="DummyFileRight-upload-containe">
              <div id="form" className="upload-formController">
                <div className="upload-videoCategory">
                  <div>
                    {' '}
                    <div className="upload-title">Video&nbsp;Title</div>

                    <input
                      type="text"
                      name="videoTitle"
                      placeholder="Video Title"
                      className="upload-inputField title richText-container"
                      required
                      autoComplete="off"
                      // value={title}
                      onChange={(e) => {

                      }}
                    />

                  </div>

                  <div className="upload-videoSubCategory">
                    <div className="upload-dropDown">
                      <div className="upload-title">Video&nbsp;Category</div>

                      <div className="upload-videoTitle">
                        <select
                          // value={vCategory}
                          name="videoCategory"
                          className="upload-select"
                          onChange={(e) => {

                          }}
                        >
                          <option>Select your option</option>
                          <option value="PDF" className='QandA-option'>PDF</option>
                          <option value="PPT" className='QandA-option'>PPT</option>
                          <option value="Video" className='QandA-option'>Video</option>
                          <option value="Video URL" className='QandA-option'>Video URL</option>
                          <option value="Weblink" className='QandA-option'>Weblink</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <PdfReader />
                </div>

                <div
                  className="Upload-buttonPublish"
                  style={{ marginTop: '10px' }}
                ></div>
              </div >


              <div className="Upload-buttonPublish">
                <button type="submit" className="QandA-Button" id="save" disabled>
                  Save
                </button>
              </div>

            </div >
          </form> */}
        </div>
      </div>
    </>
  );
};

export default DummyFileRight;
