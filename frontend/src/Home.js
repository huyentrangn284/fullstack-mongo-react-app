import React, { useEffect, useState } from "react";
import {
  Navbar,
  Table,
  Container,
  Col,
  Row,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  listStudents,
  deleteStudent,
  getoneStudent,
  updateStudent,
} from "./redux/action";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  email: "",
  contact: "",
  address: "",
  age: "",
};
const Home = () => {
  const [state, setState] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [stID, setStID] = useState(null);
  const dispatch = useDispatch();
  const { students, msg, student } = useSelector((state) => state.student);
  const { name, email, contact, address, age } = state;

  useEffect(() => {
    dispatch(listStudents());
  }, []);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
  }, [msg]);

  useEffect(() => {
    if (student) {
      setState({ ...student });
    }
  }, [student]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateStudent(state, stID));
      setEditMode(false);
      setStID(null);
    } else {
      dispatch(createStudent(state));
    }
    setState(initialState);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleUpdate = (id) => {
    dispatch(getoneStudent(id));
    setEditMode(true);
    setStID(id);
  };

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#212329" }}
        className="justify-content-center"
      >
        <Navbar.Brand
          style={{
            color: "#FFC106",
            fontFamily: "Roboto Mono",
            fontSize: "30px",
          }}
        >
          UIT Student Information Management
        </Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: "70px" }}>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Label
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#37474F",
                }}
              >
                {editMode ? "UPDATE STUDENT FORM" : "ADD STUDENT FORM"}
              </Form.Label>
              <Form.Group style={{ marginTop: "20px" }}>
                {/* <Form.Label>Name</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name || ""}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginTop: "20px" }}>
                {/* <Form.Label>Email</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email || ""}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginTop: "20px" }}>
                {/* <Form.Label>Contact</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Contact"
                  name="contact"
                  value={contact || ""}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginTop: "20px" }}>
                {/* <Form.Label>Address</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address || ""}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginTop: "20px" }}>
                {/* <Form.Label>Age</Form.Label> */}
                <Form.Control
                  type="number"
                  placeholder="Age"
                  name="age"
                  value={age || ""}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#80DFEA",
                    borderColor: "#80DFEA",
                    color: "#455964",
                  }}
                  size="lg"
                >
                  {editMode ? "Update" : "Submit"}
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#37474F",
                marginBottom: "33px",
              }}
            >
              LIST OF STUDENTS
            </h3>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {students &&
                students.map((item, index) => (
                  <tbody key={item.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>{item.address}</td>
                      <td>{item.age}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="warning"
                            onClick={() => handleUpdate(item.id)}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleDelete(item.id)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
