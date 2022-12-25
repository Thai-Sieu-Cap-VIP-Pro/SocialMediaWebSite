import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./auth.scss";
import { Button, Spinner } from "react-bootstrap";
import FormikControl from "../../../shareComponents/formikCustom/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/images/imageStore";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, LoginUser } from "../authSlice";
import { addActiveId } from "../../user/profileSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Enter your email"),
  password: Yup.string().required("Enter your password"),
});

const LoginForm = () => {
  let navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      const result = await dispatch(LoginUser(values)).unwrap();
      await dispatch(getAllUsers()).unwrap();
      const action1 = addActiveId(result.currentUser._id);
      dispatch(action1);
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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

        <div className="loginForm__right__header">SIGN IN</div>
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
                    placeholder="sample@gmail.com"
                    type="email"
                    label="Email"
                    name="email"
                  />

                  <FormikControl
                    control="input"
                    placeholder="*********"
                    label="Password"
                    type="password"
                    name="password"
                  />

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
                    {loading ? (
                      <div>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          style={{ marginRight: "10px" }}
                        />
                        Loading...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="loginForm__right__footer">
          Do you have account?{" "}
          <Link to="/auth/register" style={{ "text-decoration": "none" }}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
