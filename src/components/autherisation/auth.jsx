import axios from "axios";
import React from "react";
import { Base_Url } from "../../utils/baseUrl";

export const getParticularCourses = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_particular_course?courseId=${id}`,
      options
    );
    if (response.data) {
      console.log("courseDeatil", response.data);
      return response.data;
    }
  } catch (error) {
    console.log("overView data", error.response.data);
  }
};

export const getCourseChaptersApi = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_course_chapters?courseId=${id}`,
      options
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("overView data", error.response.data);
  }
};

export const getChaptersLesonsApi = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_course_chapters_lessons?lessonId=${id}`,
      options
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("overView data", error.response.data);
  }
};

export const getChapterName = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_chapter_name?chapterId=${id}`,
      options
    );
    if (response.data) {
      // console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.log("overView data", error.response.data);
  }
};

export const getCourseOverview = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_course_overview?courseId=${id}`,
      options
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("overView data", error.response.data);
  }
};

export const getLesson = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/get_lesson_name?lessonId=${id}`,
      options
    );
    if (response.data) {
      // console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.log("Lesson data", error.response.data);
  }
};
export const getQuestions = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${Base_Url}/api/v1/chapter_questions?chapterId=${id}`,
      options
    );
    if (response.data) {
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("overView data", error);
  }
};
