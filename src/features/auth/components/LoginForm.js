import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./auth.scss";
import { Button } from "react-bootstrap";
import FormikControl from "../../../shareComponents/formikCustom/FormikControl";
import { Link } from "react-router-dom";
import IMAGES from "../../../assets/images/imageStore";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../authSlice";

const initialValues = {
  email: "thai@gmail.com",
  password: "123",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Enter your email"),
  password: Yup.string().required("Enter your password"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log(values);
    const action = LoginUser(values);
    var actionReseult = dispatch(action);
  };

  return (
    <div className="loginForm">
      <div className="loginForm__left">
        <img src={IMAGES.login.phone} alt="" />
      </div>
      <div className="loginForm__right">
        <div className="loginForm__right__user">
          <img src={IMAGES.login.avatar} alt="" />
        </div>

        <div className="loginForm__right__header">WELCOME</div>
        <div className="loginForm__right__content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                  />

                  <FormikControl
                    control="input"
                    label="Password"
                    type="password"
                    name="password"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Login
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="loginForm__right__footer">
          Do you have account? <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
