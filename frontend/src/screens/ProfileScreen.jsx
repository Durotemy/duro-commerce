import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileScree = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("userInfo", userInfo);
  console.log("body", user);


useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    if (!user || !user.name) {
      dispatch(getUserDetails("profile"));
    } else {
        setName(user.name)
        setEmail(user.email)
    }
  }, [dispatch, navigate, userInfo, user]);

  return (
    <div className="mt-6">
      <Row>
        <Col md={3}>
          <h2 className="mt-10">User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form >
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={user.name}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                ></Form.Control>
              </Form.Group>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScree;
