import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import './DummyFileRight.css';
import { pdfImage } from '../../../../assets/pdf_img.png'
import { addIcon } from '../../../../utils/icons'
import RichTextEditor from '../../../AddCoursesFolder/richTextEditor/RichTextEditor'
import OtherTextArea from '../../../AddCoursesFolder/otherTextArea/OtherTextArea'
import { useDropzone } from 'react-dropzone'
import PdfReader from './PdfReader'

const DummyFileRight = () => {

  console.log('my course');
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);

  return (
    <>
      <div className="main-container">
        <div className="DummyFileRight-date-recentcourse">

          {/* <form
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
                    <div className="upload-title">Video&nbsp;Title</div>
                    <div className="upload-videoTitleee">
                      <input
                        type="text"
                        name="videoTitle"
                        placeholder="Video Title"
                        className="upload-inputField title"
                        required
                        autoComplete="off"
                        // value={title}
                        onChange={(e) => {

                        }}
                      />
                    </div>
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
                          <option
                            // value={cat.categoryName}
                            className="QandA-option"
                          // key={i}
                          >

                          </option>

                        </select>

                      </div>
                    </div>

                    <div className="upload-dropDown">
                      <div className="upload-title">Video&nbsp;Sub&nbsp;Category</div>
                      <div className="upload-videoTitle">
                        <select
                          name="videoSubCategory"
                          className="upload-select"
                          // value={vSubCategory}
                          onChange={(e) => {

                          }}
                        >
                          <option>Select your option</option>
                          <option
                            // value={cat.subCategoryName}
                            className="QandA-option"
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
                        // value={taglinee}
                        onChange={(e) => {

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
                <button type="submit" className="QandA-Button" id="save" disabled>
                  Save
                </button>
              </div>
            </div>
          </form> */}

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


          <form
            onSubmit={(e) => {
              // uploadVideosHandler(e)
              // overViewHandler(e)
            }}
          >
            <div className="upload-container">
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
          </form>
        </div >
      </div >
    </>
  );
};

export default DummyFileRight;
