import React from 'react'
import { ToastContainer } from 'react-toastify'

const ChapterTitleRight = () => {
    return (

      <div className="main-container">
      <div className="DummyFileRight-date-recentcourse">
        <div className="DummyFileRight-upload-container">
        <form onSubmit={(e) => {
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
          </form> 
          </div>
          </div>
          </div>

    );
};

export default ChapterTitleRight
