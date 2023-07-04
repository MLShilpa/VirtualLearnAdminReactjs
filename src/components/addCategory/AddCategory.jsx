import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import { NavLink, Outlet } from "react-router-dom";
import { addIcon } from "../../utils/icons";
import { Base_Url } from "../../utils/baseUrl";
import axios from "axios";
import { errorMessage, successfulMessage } from "../toastMesaage/ToastMessage";

const AddCategory = () => {
  const [imagesList, setImagesList] = useState();
  const [selectImage, setSelectImage] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryImage, setCategoryImage] = useState();
  const [addSubcategory, setAddSubcategory] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("category", categoryName);
    addSubcategory.map((data, i) => {
      data !== "" && formData.append(`subCategory[${i}]`, data);
    });
    formData.append("categoryImage", categoryImage);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      const fetchedData = await axios(`${Base_Url}/api/v1/add_category`, {
        method: "post",
        data: formData,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log("res", fetchedData);
      successfulMessage("Category added successfully");
      return fetchedData;
    } catch (err) {
      let error = err;
      console.log("error", error);
      errorMessage("something went wrong");
    }
  };

  const addField = () => {
    setAddSubcategory([...addSubcategory, ""]);
    // setFields([...fields, '']);
  };

  const handleInputChange = (e, i) => {
    const updatedSubCategory = [...addSubcategory];
    updatedSubCategory[i] = e.target.value;
    setAddSubcategory(updatedSubCategory);
  };

  useEffect(() => {
    axios
      .get(`${Base_Url}/api/v1/category_image_list`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setImagesList(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert('Some error occured')
      });
  }, []);

  return (
    <div>
      <div className="studentList-container studentList-container-1">
        <div className="container-courseDetail">
          <div className="addCategory">
            <div className="courseDetail-Conatiner-Left addCategory">
              <span className="courseDetail-header-text">Add Category</span>
              <div className="addCategoryBtn" onClick={() => {}}>
                {addIcon}
              </div>
            </div>
            <div className="courseDetail-Conatiner-Right">
              <div>
                {" "}
                <div className="upload-videoTitleee">
                  <input
                    type="text"
                    placeholder="Category Name"
                    name="CategoryName"
                    value={categoryName}
                    className="upload-inputField"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  />
                </div>
                <div className="categoryImageText">Select Category Image</div>
                <div className="catImages">
                  {imagesList?.categoryImageList.map((data, i) =>
                    data?.image.map((img, index) => {
                      return (
                        <div
                          className="imageCell"
                          onClick={() => {
                            setSelectImage(index);
                            setCategoryImage(img);
                          }}
                          style={{
                            border:
                              selectImage === index ? "2px solid #b31616" : "",
                          }}
                        >
                          <img src={img} alt="image" />
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="upload-videoTitleee">
                  {addSubcategory.map((data, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder="SubCategory Name"
                      name="subCategoryName"
                      value={data}
                      className="subCategoryInput"
                      onChange={(e) => {
                        handleInputChange(e, i);
                      }}
                    />
                  ))}
                </div>
                <div className="TestDetail-addNewContainer">
                  <button
                    className="TestDetail-addNewBtn"
                    onClick={() => {
                      addField();
                    }}
                  >
                    Add&nbsp;SubCategory&nbsp;+
                  </button>
                </div>
              </div>
              {/* <div className="buttonContainer"> */}
              <button
                type="submit"
                className="saveButton"
                id="save"
                onClick={() => {
                  handleSubmit();
                }}
                // disabled={editState === "edit" ? true : false}
              >
                Save
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
