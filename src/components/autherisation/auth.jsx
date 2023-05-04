import axios from 'axios';
import React from 'react'
import { Base_Url } from '../../utils/baseUrl';


export const getParticularCourses = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_particular_course?courseId=${id}`,
      options,
    );
    if (response.data) {
      console.log("courseDeatil",response.data)
      return response.data;
    }
  } catch (error) {
    console.log('overView data', error.response.data);
  }
};

export const getCourseChaptersApi = async (id) => {
    const options = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.get(
        `${Base_Url}/api/v1/get_course_chapters?courseId=${id}`,
        options,
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log('overView data', error.response.data);
    }
  };

  export const getChaptersLesonsApi = async (id) => {
    const options = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.get(
        `${Base_Url}/api/v1/get_course_chapters_lessons?lessonId=${id}`,
        options,
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log('overView data', error.response.data);
    }
  };

