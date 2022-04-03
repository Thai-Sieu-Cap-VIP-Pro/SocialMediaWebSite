import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./auth.scss";
import { Button } from "react-bootstrap";
import FormikControl from "../../../shareComponents/formikCustom/FormikControl";
import { Link } from "react-router-dom";
import IMAGES from "../../../assets/images/imageStore";
import { Container, Col, Row } from "react-bootstrap";

const initialValues = {
  email: "giathai1505@gmail.com",
  pass: "my16022001",
  name: "Gia Thái",
  phone: "0355794027",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Enter your email")
    .email("Invalid email foramt"),
  pass: Yup.string().required("Enter your password"),
});

const onSubmit = (values) => console.log("Form data ", values);

const RegisterForm = () => {
  const radioOptions = [
    { key: "1", value: "Nam" },
    { key: "2", value: "Nữ" },
    { key: "3", value: "Khác" },
  ];

  return (
    <div className="loginForm registerForm">
      <div className="loginForm__left">
        <img id="registerImg" src={IMAGES.login.register} alt="" />
      </div>
      <div className="loginForm__right">
        <div className="loginForm__right__user">
          <img src={IMAGES.login.avatar2} alt="" />
        </div>

        <div className="loginForm__right__header">REGISTER</div>
        <div className="loginForm__right__content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="rowform">
                    <FormikControl
                      control="input"
                      label="Name"
                      type="text"
                      name="name"
                    />
                    <FormikControl
                      control="input"
                      label="Phone"
                      type="text"
                      name="phone"
                    />
                  </div>

                  <div className="rowform">
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                    />

                    <FormikControl
                      control="datetime"
                      label="Chọn ngày sinh"
                      name="BirthDay"
                    />
                  </div>
                  <FormikControl
                    control="radio"
                    label="Gender"
                    name="gender"
                    options={radioOptions}
                  />

                  <div className="rowform">
                    <FormikControl
                      control="input"
                      label="Password"
                      type="password"
                      name="pass"
                    />
                    <FormikControl
                      control="input"
                      label="Confirm Password"
                      type="password"
                      name="confirmpass"
                    />
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Register
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="loginForm__right__footer">
          Do you have account? <Link to="/login">Login now</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
