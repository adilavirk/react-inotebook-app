import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avataars from "../images/avataaars.png";
import { TextField, Button, FormControl } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  // eslint-disable-next-line to
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div>
        <div className="d-flex">
          <div className="col-md-5">
            <img
              className="img-fluid"
              src={avataars}
              alt="register"
              style={{
                width: "150%",
                height: "91vh",
                objectFit: "cover",
                marginTop: "-10%",
                marginLeft: "-20%",
              }}
            />
          </div>

          <div className="col-md-7 ps-5 pe-5 pt-5" style={{ width: "50%" }}>
            <Button
              className="mb-4"
              variant="text"
              color="secondary"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/"
              style={{
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Home
            </Button>
            <h2 style={{ fontWeight: "bold" }}>Create a new account</h2>
            <p className="mb-4">Use your email to create a new account</p>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  color="secondary"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <TextField
                  type="email"
                  color="secondary"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    color="secondary"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
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
                Register now
              </Button>
            </form>
            <p>
              Have an account? <Link to="/login">Login</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
