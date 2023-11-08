import axios from "axios";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import { Button, Col, Form, Row } from "react-bootstrap";
import StoreContext from "../../ContextApi";
import { useNavigate } from "react-router-dom";
import { Url } from "../Core/index";
import Kicon from "./kollect-logo.png";
import { ToastContainer, toast } from "react-toastify";

function simulateNetworkRequest() {
  //
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function Login() {
  // login funcation

  const [isLoading, setLoading] = useState(false);
  const RoleDetails = useContext(StoreContext);
  let navigate = useNavigate();

  const notify = () =>
    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const email = useRef();
  const password = useRef();

  const handleClick = () => {
    setLoading(true);

    axios({
      method: "post",
      url: Url + "/auth/login",
      data: {
        loginId: email.current.value,
        password: password.current.value,
      },
    })
      .then((res) => {
        localStorage.setItem("Role", JSON.stringify(res.data.Role));
        RoleDetails.setUserData(res.data);
        notify();

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

        // console.log(res.data.Role);
        // alert("Login Successfully!")
      })
      .catch((err) => {
        // console.log(err.message, "employee not found");
        alert("incorrect credentials");
      });
  };

  return (
    <div>
      <div
        className="shadow-lg bg-white"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Kicon} height={80} />
        <h1 style={{ color: "#427d8f" }}>Kollectlt Dashboard</h1>
      </div>
      <ToastContainer />
      <Container>
        <Row className="mt-5">
          <Col lg={5} md={6} sm={12} className="shadow-lg rounded m-auto  p-4">
            <h1 className="text-center" style={{ color: "#427d8f" }}>
              Sign In
            </h1>
            <Form onSubmit={!isLoading ? handleClick : null}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Login Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Login id"
                  ref={email}
                />

                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </Form.Group>

              <Button
                style={{ backgroundColor: "#427d8f" }}
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                type="submit"
              >
                Submit
                {/* {isLoading ? "Loading…" : "Click to Login"} */}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
