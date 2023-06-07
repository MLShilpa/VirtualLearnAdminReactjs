import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Base_Url } from "../../../../utils/baseUrl";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  setCourseChapterData,
  setOverViewDataADC,
  setCourseId,
  setEditState,
  setChapterState,
} from "../../../../redux/reducers/addCourseState";
import { getCourseChaptersApi } from "../../../autherisation/auth";
import {
  errorMessage,
  successfulMessage,
} from "../../../toastMesaage/ToastMessage";

const ChapterTitleRight = () => {
  const chapterData = useSelector((state) => state.overViewData.chapterData);
  const editState = useSelector((state) => state.addCourseState.editState);
  const [chapName, setChapName] = useState(null);
  const [chapId, setChapId] = useState(null);
  const courseId = useSelector((state) => state.addCourseState.courseId);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (chapterData) {
    setChapName(
      chapterData === "" ? "" : chapterData?.chapterName?.chapterName
    );
    setChapId(chapterData === "" ? "" : chapterData?.chapterName?._id);
    // }
  }, [chapterData]);

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

  const submitChapter = (e) => {
    e.preventDefault();
    axios
      .request({
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "post",
        url: `${Base_Url}/api/v1/add_chapter`,
        data: {
          _id: courseId,
          chapterName: chapName,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          dispatch(setCourseId(courseId));
          getChaptersListApiCall();
          successfulMessage("Chapter added Successfully");
          dispatch(setChapterState(false));
        }
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong");
        // alert('Some error occured')
      });
  };

  const editChapter = (e) => {
    e.preventDefault();
    axios
      .request(`${Base_Url}/api/v1/edit_chapter_name`, {
        method: "patch",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        params: {
          chapterId: chapId,
          chapterName: chapName,
        },
      })
      .then((res) => {
        console.log(res.data);
        getChaptersListApiCall();
        successfulMessage("Chapter edited Successfully");
        dispatch(setChapterState(false));
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong");
        // alert('Some error occured')
      });
  };

  return (
    <div className="main-container">
      <div className="DummyFileRight-date-recentcourse">
        <div className="DummyFileRight-upload-container">
          <form
            onSubmit={(e) => {
              submitChapter(e);
            }}
          >
            <div className="DummyFileRight-upload-container">
              <div
                className="upload-videoTitleee "
                style={{ minWidth: "400px" }}
              >
                <input
                  type="text"
                  placeholder="Chapter Title"
                  name="chapName"
                  className="upload-inputField title chapName"
                  value={chapName}
                  onChange={(e) => {
                    setChapName(e.target.value);
                  }}
                />
              </div>
              <div className="DummyFileRight-Save-buttonPublish">
                <button
                  className="QandA-ButtonEdit"
                  id="edit"
                  disabled={editState === "edit" ? false : true}
                  onClick={(e) => {
                    editChapter(e);
                  }}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="QandA-Button"
                  id="save"
                  disabled={editState === "edit" ? true : false}
                >
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

export default ChapterTitleRight;
