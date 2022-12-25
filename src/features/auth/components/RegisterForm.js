import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./auth.scss";
import { Button } from "react-bootstrap";
import FormikControl from "../../../shareComponents/formikCustom/FormikControl";
import { Link, useNavigate, useParams } from "react-router-dom";
import IMAGES from "../../../assets/images/imageStore";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Register } from "../authSlice";

const initialValues = {
  email: "",
  pass: "",
  name: "",
  phone: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Enter your email")
    .email("Invalid email foramt"),
  pass: Yup.string().required("Enter your password"),
});

const RegisterForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const result = await dispatch(Register({ values: values })).unwrap();
      alert(result.message);
      navigate("/auth/login");
    } catch (error) {
      alert(error.message);
    }
  };

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

        <div className="loginForm__right__header">SIGN UP</div>
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
                      placeholder="Enter your name"
                      label="Name"
                      type="text"
                      name="name"
                    />
                    <FormikControl
                      control="input"
                      placeholder="Enter your phone number"
                      label="Phone"
                      type="text"
                      name="phone"
                    />
                  </div>

                  <div className="rowform">
                    <FormikControl
                      control="input"
                      placeholder="Enter your email"
                      type="email"
                      label="Email"
                      name="email"
                    />

                    <FormikControl
                      control="datetime"
                      label="Chọn ngày sinh"
                      placeholder="01/01/2001"
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
                      placeholder="Enter your password"
                      type="password"
                      name="pass"
                    />
                    <FormikControl
                      control="input"
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      type="password"
                      name="confirmpass"
                    />
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!formik.isValid}
                    style={{
                      width: "100%",
                      background: "#2bc891",
                      border: "none",
                    }}
                  >
                    Register
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="loginForm__right__footer">
          Do you have account?{" "}
          <Link to="/auth/login" style={{ "text-decoration": "none" }}>
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
