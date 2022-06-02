import React from 'react';

import Form from 'react-bootstrap/Form';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { changePassword } from '../../profileSlice';
import { useDispatch } from 'react-redux';

import './styles.scss';

const ChangePassword = ({ setShowModal }) => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const onChangeFormValues = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const action = changePassword(formValues);
        const result = await dispatch(action).unwrap();
        alert(result.message);
        setShowModal(false);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Container>
                    <Row>
                        <Col sm={3} className="text-right">
                            <Form.Label>Old Password</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                className="w-100"
                                type="password"
                                name="oldPassword"
                                onChange={onChangeFormValues}
                                value={formValues.oldPassword}
                                placeholder="Enter your old password"
                            />
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Container>
                    <Row>
                        <Col sm={3} className="text-right">
                            <Form.Label>New Password</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                className="w-100"
                                type="password"
                                placeholder="Enter new password"
                                name="newPassword"
                                onChange={onChangeFormValues}
                                value={formValues.newPassword}
                            />
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Container>
                    <Row>
                        <Col sm={3} className="text-right">
                            <Form.Label>Confirm New Password</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                className="w-100"
                                type="password"
                                placeholder="Confirm new password"
                                name="confirmPassword"
                                onChange={onChangeFormValues}
                                value={formValues.confirmPassword}
                            />
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

export default ChangePassword;
