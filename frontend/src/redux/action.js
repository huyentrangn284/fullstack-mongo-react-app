import * as types from "./actionType";
import axios from "axios";

const API = "http://127.0.0.1:5000";

const getStudents = (students) => ({
  type: types.GET_STUDENTS,
  payload: students,
});

const _getoneStudent = (student) => ({
  type: types.GET_ONE_STUDENT,
  payload: student,
});

const addStudent = (msg) => ({
  type: types.ADD_STUDENT,
  payload: msg,
});

const delStudent = (msg) => ({
  type: types.DELETE_STUDENT,
  payload: msg,
});

const _updateStudent = (msg) => ({
  type: types.UPDATE_STUDENT,
  payload: msg,
});

export const listStudents = () => {
  return function (dispatch) {
    axios
      .get(`${API}/students`)
      .then((response) => dispatch(getStudents(response.data.students)))
      .catch((err) => console.log(err));
  };
};

export const createStudent = (student) => {
  return function (dispatch) {
    axios
      .post(`${API}/students`, student)
      .then((response) => {
        dispatch(addStudent(response.data.msg));
        dispatch(listStudents());
      })
      .catch((err) => console.log(err));
  };
};

export const deleteStudent = (id) => {
  return function (dispatch) {
    axios
      .delete(`${API}/students/${id}`)
      .then((response) => {
        dispatch(delStudent(response.data.msg));
        dispatch(listStudents());
      })
      .catch((err) => console.log(err));
  };
};

export const getoneStudent = (id) => {
  return function (dispatch) {
    axios
      .get(`${API}/students/${id}`)
      .then((response) => {
        dispatch(_getoneStudent(response.data.student));
      })
      .catch((err) => console.log(err));
  };
};

export const updateStudent = (student, id) => {
  return function (dispatch) {
    axios
      .put(`${API}/students/${id}`, student)
      .then((response) => {
        dispatch(_updateStudent(response.data.msg));
        dispatch(listStudents());
      })
      .catch((err) => console.log(err));
  };
};
