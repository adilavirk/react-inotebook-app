import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField, Button, FormControl } from "@mui/material";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // eslint-disable-next-line to
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="container mt-5 addnotes">
        <h2 className="my-3" style={{ fontWeight: "bold" }}>
          Login to continue to iNotebook
        </h2>
        <p className="mb-4">Sign in on the internal platform</p>
        <div className="d-flex">
          <Button
            size="large"
            fullWidth
            className="mb-4 me-4"
            variant="contained"
            color="primary"
            startIcon={<FacebookIcon />}
            component={Link}
            to="/"
            style={{
              textTransform: "none",
              fontSize: "1.1rem",
              color: "white",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Login with Facebook
          </Button>
          <Button
            size="large"
            fullWidth
            className="mb-4"
            variant="contained"
            color="error"
            startIcon={<GoogleIcon />}
            component={Link}
            to="/"
            style={{
              textTransform: "none",
              fontSize: "1.1rem",
              color: "white",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Login with Google
          </Button>
        </div>
        <p className="mb-4 d-flex justify-content-center">
          or login with username and password
        </p>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              color="secondary"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <FormControl variant="outlined" fullWidth>
              <TextField
                color="secondary"
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <Button
            type="submit"
            fullWidth
            size="large"
            className="mb-4"
            variant="contained"
            color="secondary"
            style={{
              textTransform: "none",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.1rem",
            }}
          >
            Login
          </Button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
