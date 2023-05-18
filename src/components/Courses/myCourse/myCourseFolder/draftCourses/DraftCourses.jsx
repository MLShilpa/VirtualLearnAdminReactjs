import "./DraftCourses.css";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  setCourseDetailDraft,
  setDraftCoursesPageNum,
} from "../../../../../redux/reducers/MyCourseStateSlice";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Base_Url } from "../../../../../utils/baseUrl";
import Modal from "react-modal";
import { Data } from "../../MyCourseData";
import {
  CircularProgress,
  createTheme,
  Pagination,
  PaginationItem,
  ThemeProvider,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import Loading from "../../../../../utils/loading/loading";
import { setAccState, setAddCourseState, setCourseChaptersAndOverviewDataNull, setCourseId } from "../../../../../redux/reducers/addCourseState";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#11cb5f",
    },
    neutral: {
      main: "#ee5c4d",
      contrastText: "#092963",
    },
  },
});

const DraftCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [draftdata, setdraftdata] = useState([]);
  const [toBeDeleted, setToBedeleted] = useState({});
  const [loading, setLoading] = useState(false);

  let currentPage = "";

  // const classes = useStyles();
  const handleChange = (event, value) => {
    setPage(value);
    dispatch(setCourseDetailDraft(false));
    dispatch(setDraftCoursesPageNum(value));
  };
  const currentPageNum = useSelector(
    (state) => state.myCourseStateSlice.draftCoursesPageNum
  );
  const courseDetailDraftState = useSelector(
    (state) => state.myCourseStateSlice.courseDetailDraftState
  );

  const [page, setPage] = useState(currentPageNum);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    setLoading(true);
    if (courseDetailDraftState) {
      // console.log("courseDetailDraftState",courseDetailDraftState)
      axios
        .get(
          `${Base_Url}/api/v1/get_draft_courses?page=${currentPageNum}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )

        .then((res) => {
          setdraftdata(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      axios
        .get(`${Base_Url}/api/v1/get_draft_courses?page=${page}&limit=5`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })

        .then((res) => {
          console.log("draftdata", res.data);
          setdraftdata(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const deleteCourse = (data) => {
    alert(data);
    currentPage = page;
    axios(`${Base_Url}/api/v1/delete_course?_id=${data}`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        // alert(res)
        toast.success("Course deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setLoading(true);
        const num =currentPage;
        if(draftdata.data.length == 1){
          num =currentPage-1;
        }
        axios
          .get(
            `${Base_Url}/api/v1/get_draft_courses?page=${num}&limit=5`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            // console.log("currentPage",currentPage)
            setdraftdata(res?.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        // alert(err.response.data)
        // alert('error')
        toast.error("Course deletion failed", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(err);
      });
  };
//   var utcDate = '2023-07-15T04:44:28.962Z';  // ISO-8601 formatted date returned from server
// var localDate = new Date(utcDate);
// console.log(localDate)
  return (
    <div className="DraftCourses-body">
      {draftdata && draftdata.data && draftdata.data.length > 0 ? (
        <div className="DraftCourses-list-body">
          <>
            {loading ? (
              <div className="DraftCourses-laoding">
                <ThemeProvider theme={theme}>
                  <CircularProgress color="neutral" />
                </ThemeProvider>
              </div>
            ) : (
              <div className="DraftCourses-list-body">
              {/* <> */}
                {/* {Data.length > 0 ? ( */}

                {draftdata?.data.map((res, i) => {
                  // {Data.map((res, i) => {
                  return (
                    <div
                      className="DraftCourses-CourseList"
                      key={i}
                      onClick={() => {
                        // alert("pressed")
                        dispatch(setCourseDetailDraft(true));
                        dispatch(setDraftCoursesPageNum(page));
                        dispatch(setAddCourseState())
                        dispatch(setCourseId(res?._id))
                        dispatch(setCourseChaptersAndOverviewDataNull())
                        navigate("/DashBoard/MyCourses/CourseDetail");
                      }}
                    >
                      <div className="DraftCourses-Title">
                        <div className="DraftCourses-Thumbnail">
                          <img
                            src={res?.courseImage}
                            alt=""
                            className="DraftCourses-thumbnail"
                          />
                          <div className="DraftCourses-thumbnail-play">
                            <svg
                              width={19}
                              height={19}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
                                fill="#EE5C4D"
                                fillOpacity={0.7}
                                stroke="#EE5C4D"
                                strokeWidth={0.962}
                              />
                              <mask
                                id="prefix__a"
                                style={{
                                  maskType: "alpha",
                                }}
                                maskUnits="userSpaceOnUse"
                                x={7}
                                y={6}
                                width={6}
                                height={7}
                              >
                                <path
                                  d="M8.534 12.286l.004-.002 3.812-2.29h.001a.783.783 0 00.356-.487.785.785 0 00-.356-.862h-.001l-3.812-2.29a.78.78 0 00-.6-.08.782.782 0 00-.584.753v4.583a.789.789 0 001.18.675z"
                                  fill="#fff"
                                />
                              </mask>
                              <g mask="url(#prefix__a)">
                                <path
                                  d="M8.534 12.286l.004-.002 3.812-2.29h.001a.783.783 0 00.356-.487.785.785 0 00-.356-.862h-.001l-3.812-2.29a.78.78 0 00-.6-.08.782.782 0 00-.584.753v4.583a.789.789 0 001.18.675z"
                                  fill="#fff"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className="DraftCourses-titleContainer">
                          <div>{res?.title}</div>

                          <div className="date-Container">
                            {/* 12/09/2020, 06:30 
                      "uploadedDate": "2022-12-21 06:01:13.705145",*/}
                            Added on&nbsp;
                            {res?.createdAt.slice(8, 10)}/
                            {res?.createdAt.slice(5, 7)}/
                            {res?.createdAt.slice(0, 4)},&nbsp;
                            {/* {res?.createdAt.slice(11, 16)} */}
                            {/* {Date(res?.createdAt)} */}
                            {Date(res?.createdAt).slice(16,21)}
                          </div>
                          <aside
                            className="DraftCourses-delete-modal"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Modal
                              isOpen={modalIsOpen}
                              onRequestClose={closeModal}
                              contentLabel="Example Modal"
                              ariaHideApp={false}
                              className="DraftCourses-delete-course-modal"
                              // overlayClassName="Overlay"
                              parentSelector={() =>
                                document.querySelector("#root")
                              }
                            >
                              <div className="DraftCourses-delete-course-modal-content">
                                <div className="DraftCourses-deleteCourse">
                                  Delete Course
                                </div>
                                <div className="DraftCourses-deleteContent">
                                  Are you sure you want to delete the course
                                  <strong style={{ textTransform: "capitalize" }}>
                                    {" "}
                                    {toBeDeleted?.title}
                                  </strong>{" "}
                                  from the Draft Courses ?
                                </div>
                                <div className="DraftCourses-buttons">
                                  <button
                                    onClick={closeModal}
                                    className="DraftCourses-cancel"
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    className="DraftCourses-delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteCourse(toBeDeleted._id);
                                      closeModal();
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </Modal>
                          </aside>
                        </div>
                      </div>
                      <div>
                        <button
                          className="DraftCourses-delete-courses"
                          // onClick={console.log('i--',i)}
                          onClick={(e) => {
                            e.stopPropagation();
                            // console.log("i", i);
                            setToBedeleted(res);
                            openModal();
                          }}
                        >
                          <svg
                            width={36}
                            height={36}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z"
                              fill="#092963"
                              fillOpacity={0.1}
                            />
                            <path
                              d="M22 16v10h-8V16h8zm-1.5-6h-5l-1 1H11v2h14v-2h-3.5l-1-1zm3.5 4H12v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V14z"
                              fill="#092963"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              {/* </> */}
              </div>
            )}

            {draftdata && draftdata?.data && draftdata?.data?.length > 0 && (
              // {Data.length > 0 && (
              <>
                {draftdata?.TotalPage === 1 ? (
                  <></>
                ) : (
                  <>
                    {/* <div classname={`paginationBtns ${ loading ? "DraftCourses-pagination-laoding": "" }`}> */}
                    <div className="paginationBtns">
                      <ThemeProvider theme={theme}>
                        <Pagination
                          defaultPage={
                            courseDetailDraftState ? currentPageNum : 1
                          }
                          count={draftdata?.TotalPage}
                          siblingCount={1}
                          boundaryCount={1}
                          renderItem={(item) => (
                            <PaginationItem
                              slots={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                            />
                          )}
                          showFirstButton
                          showLastButton
                          shape="circular"
                          size="large"
                          sx={{
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 1.5,
                            // minWidth: 400,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          color="neutral"
                          onChange={handleChange}
                        />
                      </ThemeProvider>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        </div>
      ) : (
        <>
          {loading ? (
            // <>loading ......</>
            <Loading />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  height: "50vh",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                <div className="emptyImageCourse">
                  <img
                    src={require("../../../../../assets/EmptyImage.png")}
                    alt=""
                  />
                </div>
                No Draft courses
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DraftCourses;
