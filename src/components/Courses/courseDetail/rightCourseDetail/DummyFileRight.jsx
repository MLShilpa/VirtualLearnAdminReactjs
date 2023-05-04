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

  const [category, setCategory] = useState('Choose Category')
  const [categoryList, setCategoryList] = useState()
  const overview = useSelector((state) => state.overViewData)

  const [title, setTitle] = useState(overview.courseName)
  const [vCategory, setvCategory] = useState(overview.categoryName)
  const [vSubCategory, setvSubCategory] = useState('backend')
  const [taglinee, setTaglinee] = useState(overview.courseTagLine)

  const dispatch = useDispatch();

  const categoryId = useSelector(
    (state) => state.createCourse.categoryId,
  )
  console.log(categoryId)

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
        console.log(res.data)
        setCategoryList(res.data)
      })
      .catch((err) => {
        console.log(err)
        // alert('Some error occured')
      })
  }, [])

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${Base_Url}/api/v1/subcategory_list?id=${}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //         },
  //       },
  //     )
  //     .then((res) => {
  //       console.log(res.data)
  //       setCategoryList(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       // alert('Some error occured')
  //     })
  // }, [])

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
                          <div onClick={() => { myFunction() }} className="dropbtn upload-selectDrop">{category}</div>
                          <img
                            src={require("../../../../assets/DropdownArrow.png")}
                            alt=""
                            className="imgDropDown"
                          />
                          <div id="myDropdown" class="dropdown-content">
                            {categoryList &&
                              categoryList.map((ele,id) => {
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

                          }}
                        >
                          <option>Select your option</option>
                          <option
                            // value={cat.subCategoryName}
                            className="QandA-option"
                            onClick={() => {


                            }}
                          >

                          </option>

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
                <button type="submit" className="QandA-Button" id="save" onClick={() => { console.log("SFsfsdg") }}>
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
