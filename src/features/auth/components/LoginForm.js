import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./auth.css";
import { Button } from "react-bootstrap";
import FormikControl from "../../../shareComponents/formikCustom/FormikControl";


const initialValues = {
  email: "",
  pass: "my16022001",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Enter your email")
    .email("Invalid email foramt"),
  pass: Yup.string().required("Enter your password"),
});

const onSubmit = (values) => console.log("Form data ", values);

const Loginform = () => {
  return (
    <div id="loginForm">
      <div className="loginFrom_header">Đăng nhập</div>
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
                name="pass"
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
      <p>Do you have account? <a href="#">Register Now</a></p>
    </div>
  );
};

export default Loginform;
