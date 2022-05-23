import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import './styles.scss'

import { updateUser } from '../../profileSlice';

import useImageUpload from '../../../../hooks/useImageUpload';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const uploadImage = useImageUpload();
  
  const UserState = useSelector((state) => state.user.userInfo);
  
  const [imageAvt, setImageAvt] = useState("")
  const [userInfo, setUserInfo] = useState(UserState);

  const { name, email, mobile, role, avatar } = userInfo;

  const onChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const image = await uploadImage(e.target.files[0]);
    setImageAvt(image);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    const action = updateUser({...userInfo, avatar: imageAvt});
    await dispatch(action);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Container>
          <Row>
            <Col sm={2} className="text-right">
              <Form.Label>Change your avatar</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                className="w-100"
                type="file"
                name="avatar"
                onChange={handleFileChange}
                placeholder="Enter your name"
              />
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={2} className="text-right">
              <Form.Label>Name</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                className="w-100"
                type="text"
                name="name"
                required
                value={name}
                onChange={onChangeUserInfo}
                placeholder="Enter your name"
              />
              <Form.Text className="text-muted">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </Form.Text>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={2} className="text-right">
              <Form.Label>Email</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control disabled
                className="w-100"
                type="text"
                name="email"
                value={email}
                onChange={onChangeUserInfo}
                placeholder="Enter your email address"
              />
              <Form.Text className="text-muted">
                Change new email address
              </Form.Text>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={2} className="text-right">
              <Form.Label>Phone Number</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                className="w-100"
                type="text"
                name="mobile"
                value={mobile}
                onChange={onChangeUserInfo}
                placeholder="Enter your phone number"
              />
              <Form.Text className="text-muted">Add new phone number</Form.Text>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={2} className="text-right">
              <Form.Label>Gender</Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={role}
                name="role"
                onChange={onChangeUserInfo}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
              <Form.Text className="text-muted">Choose your gender</Form.Text>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Button variant="primary" className="submit-btn" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default UpdateProfile;
