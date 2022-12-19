import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js"
import { login } from "../actions/userActions.js";
import FormContainer from "../components/FormContainer.js";
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";

const LoginScreen = ({ location, navigate }) => {
    location = useLocation();
    navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';
    useEffect(() => {
        if (userInfo) {
            navigate(`/`)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId="email">
                    <Form.Label className="text-center">Email Address</Form.Label>
                    <Form.Control className="w-50" type="email" place="enter Email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="w-50" type="password" place="enter Email" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" varient="primary">Sign in </Button>
                <Row className="py-3">
                    <Col>
                        New Customer? <Link to={redirect ? `register?redirect=${redirect}` : `/register`}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer >
    )
}
export default LoginScreen;