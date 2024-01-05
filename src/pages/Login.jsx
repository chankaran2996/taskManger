import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./config";


export function Login() {

    const navigate = useNavigate()

    const loginValidationSchema = yup.object({
      email: yup
        .string()
        .required("😐 👆 This is Empty Email")
        .min(8, "Plz enter your cool Email more then 8 letters"),
      password: yup
        .string()
        .required("😐 👆 This is Empty Password")
        .min(5, "Plz enter your Cool Password more the 5 letters"),
    });
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
  
      validationSchema: loginValidationSchema,
  
      onSubmit: async (values) => {
  
        const login = await fetch(`${API}/users/login`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json" }
        })
          .then((data) => data.json())
        
        if (login.status === 400) {
          alert(login.message)
        } else {
          localStorage.setItem("token", login.secretToken)
          localStorage.setItem("email", login.userEmail)
          alert(login.message)
          navigate("/portal/home")
        }
  
      }
  
    });
  
    return (
      <form className="login-page" onSubmit={formik.handleSubmit}>
        <h2>Login Page</h2>
        <TextField
          value={formik.values.email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type={"text"}
          placeholder={"Enter your Email ID"}
          onChange={formik.handleChange}
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
        />
  
  
        <TextField
          value={formik.values.password}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type={"password"}
          placeholder={"Enter your Password"}
          onChange={formik.handleChange}
          name="password"
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />

                
                 
  
  
        <Button variant="contained" type="submit">
          Submit
        </Button>
        
        <p>Don't you have an account ? Click here 👉 <Link to="/signup">Sign Up</Link></p>
      
      <p> For test : <b>Email: guvi@gmail.com </b></p>
      <p><b>  password: password </b></p>
      </form>
    );
  }
