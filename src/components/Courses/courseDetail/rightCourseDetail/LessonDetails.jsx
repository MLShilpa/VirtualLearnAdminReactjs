import React from 'react'
import { ToastContainer } from 'react-toastify'

import Router from './components/Router/Router'

const LessonDetails = () => {
    return (
        {/* <form
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
          </form> */}
    );
};

export default LessonDetails;
