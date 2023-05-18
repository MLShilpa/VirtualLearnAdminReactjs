import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import './DummyFileRight.css';
import { pdfImage } from '../../../../assets/pdf_img.png'
import { icn_active } from '../../../../assets/DropdownArrow.png'
import { addIcon } from '../../../../utils/icons'
import RichTextEditor from '../../../AddCoursesFolder/richTextEditor/RichTextEditor'
import OtherTextArea from '../../../AddCoursesFolder/otherTextArea/OtherTextArea'
import { useDropzone } from 'react-dropzone'
import PdfReader from './PdfReader'
import { Base_Url } from "../../../../utils/baseUrl";
import { CategoryId } from '../../../../redux/reducers/createCourseSlice'
import {
  reset,
  storeCategory,
  storeName,
  storeoverViewData,
  storeSubCategory,
  storeTagline,
} from '../../../../redux/reducers/overViewSlice'


// const formData = new FormData();
// formData.append(
//   "twitterLink",
//   values.TwitterURL ? values.TwitterURL : "empty"
// );
// formData.append(
//   "faceBookLink",
//   values.FacebookURL ? values.FacebookURL : "empty"
// );
// formData.append("occupation", values.editPOccupation);
// formData.append("gender", values.gender);
// formData.append(
//   "dateOfBirth",
//   values.editPDOB ? values.editPDOB : "empty"
// );
// if (selectedFile == null) {
//   // console.log("No image been uploaded");
// } else {
//   formData.append("profilePhoto", selectedFile);
// }

// const formData = {
//   courseName: e.target.videoTitle.value,
//   categoryName: e.target.videoCategory.value,
//   subCategoryName: e.target.videoSubCategory.value,
//   courseTagLine: e.target.tagline.value,

//   description:
//     description && description.description && description.description,
//   learningOutCome: e.target.courseOutcome.value,
//   requirements: e.target.requirements.value,

//   difficultyLevel: e.target.difficultyLevel.value,
//   courseKeyword: e.target.courseKeyWord.value,
//   coursePhoto: overViewDataToBeUploaded.coursePhoto,
//   previewVideo: overViewDataToBeUploaded.previewVideo,
// }

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

const DummyFileRight = () => {

  const overviewData = useSelector((state) => state.overViewData.overviewData)

  const [categoryList, setCategoryList] = useState()
  const [subCategoryList, setSubCategoryList] = useState()
  const overview = useSelector((state) => state.overViewData)

  const [title, setTitle] = useState(null)
  const [vCategory, setvCategory] = useState(null)
  const [vSubCategory, setvSubCategory] = useState(null)
  const [taglinee, setTaglinee] = useState(null)

  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.overViewData?.categoryId)
  const description = null
  const learningOutCome = null
  const requirements = null
  const coursePhoto = useSelector((state) => state.overViewData?.coursePhoto)
  const previewVideo = useSelector((state) => state.overViewData?.previewVideo)
  const difficultyLevel = null

  useEffect(() => {
    if (overviewData) {
      setTitle(overviewData?.overview?.title);
      setTaglinee(overviewData?.overview?.tagline);
      setvCategory(overviewData?.overview?.category);
      setvSubCategory(overviewData?.overview?.subCategory);
      description = overviewData?.overview?.description;
      learningOutCome = overviewData?.overview?.outcome;
      requirements = overviewData?.overview?.requirements;
      coursePhoto = overviewData?.overview?.description;
      difficultyLevel = overviewData?.overview?.difficulty;

    }
  }, [overviewData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("save")

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', vCategory);
    formData.append('subCategory', vSubCategory);
    formData.append('tagline', taglinee);
    formData.append('image', coursePhoto);
    formData.append('description', description);
    formData.append('image', previewVideo);
    formData.append('requirements', requirements);
    // formData.append('keywords', event.target.image.files[0]);
    formData.append('outcome', learningOutCome);
    formData.append('difficulty', difficultyLevel);

    try {
      const response = await axios.post(`${Base_Url}/api/v1/create_course`, formData, {
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



  useEffect(() => {
    axios
      .get(
        `${Base_Url}/api/v1/category_list`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        // console.log(res.data)
        setCategoryList(res.data)
      })
      .catch((err) => {
        console.log(err)
        // alert('Some error occured')
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `${Base_Url}/api/v1/subcategory_list`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          params: {
            id: `${categoryId}`
          },
        },
      )
      .then((res) => {
        // console.log(res.data)
        setSubCategoryList(res.data)
      })
      .catch((err) => {
        console.log(err)
        // alert('Some error occured')
      })
  })


  return (
    <>
      <div className="main-container">
        <div className="DummyFileRight-date-recentcourse">


          <form
            onSubmit={(e) => {
              // uploadVideosHandler(e)
              // overViewHandler(e)
            }}
          >
            <div className="DummyFileRight-upload-container">
              <div id="form" className="upload-formController">
                <div className="DummyFileRight-upload-videoCategory">
                  <div>
                    {' '}
                    <div className="upload-title">Course&nbsp;Title</div>
                    <div className="upload-videoTitleee">
                      <input
                        type="text"
                        name="videoTitle"
                        placeholder="Video Title"
                        className="upload-inputField title"
                        required
                        autoComplete="off"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                          dispatch(storeName(e.target.value))
                        }}
                      />
                    </div>
                  </div>

                  <div className="upload-videoSubCategory">
                    <div className="upload-dropDown">
                      <div className="upload-title">Video&nbsp;Category</div>

                      <div className="upload-videoTitle">
                        <div class="dropdown">
                          <div onClick={() => { myFunction() }} className="dropbtn upload-selectDrop">{vCategory}</div>
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

                                      dispatch(storeCategory(ele && ele._id && ele._id))
                                      setvCategory(ele.categories.category)
                                      // setCategory(ele.categories.category)
                                      // dispatch(CategoryId(ele && ele._id && ele._id))
                                    }}
                                    value={vCategory}
                                  >
                                    {ele.categories.category}
                                  </div>
                                );
                              })}

                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="upload-dropDown">
                      <div className="upload-title">Video&nbsp;Sub&nbsp;Category</div>
                      <div className="upload-videoTitle">
                        <select
                          name="videoSubCategory"
                          className="upload-select"
                          value={vSubCategory}
                          onChange={(e) => {
                            setvSubCategory(e.target.value)
                          }}
                        >
                          <option>Select your option</option>
                          {subCategoryList &&
                            subCategoryList?.categories?.subCategory?.map((ele, id) => {

                              return (
                                <option
                                  value={ele}
                                  className="QandA-option"
                                  key={id}
                                  onClick={() => {
                                    //  dispatch(storeCategory(ele && ele._id && ele._id))
                                    // setvSubCategory(ele && ele)
                                    // console.log(vSubCategory);
                                  }}
                                >
                                  {ele && ele}
                                </option>
                              );
                            })}

                        </select>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="upload-tagline">
                  <div>
                    {' '}
                    <div className="upload-title">Video&nbsp;Tagline</div>
                    <div className="DummyFileRight-textarea-tagline">
                      <textarea
                        name="tagline"
                        className="upload-inputField tagline"
                        required
                        autoComplete="off"
                        value={taglinee}
                        onChange={(e) => {
                          dispatch(storeTagline(e.target.value))
                          setTaglinee(e.target.value)
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
                    <RichTextEditor />
                  </div>
                  <div className="uplaod-TextArea">
                    <OtherTextArea />
                  </div>
                </div>
                <div
                  className="Upload-buttonPublish"
                  style={{ marginTop: '10px' }}
                >
                </div>
              </div>
              <div className="DummyFileRight-Save-buttonPublish">
                <button className="QandA-ButtonEdit" id="edit">
                  Edit
                </button>
                <button type="submit" className="QandA-Button" id="save" onClick={(e) => { handleSubmit(e) }}>
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


        </div >
      </div >
    </>
  );
};

export default DummyFileRight;
