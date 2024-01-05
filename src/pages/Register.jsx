import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { API } from './config';

export function Register () {
    const navigate = useNavigate()

    const signInValidationSchema = yup.object({
        userName: yup
            .string()
            .required("😐 👆 This is Empty User Name"),
        email: yup
            .string()
            .required("😐 👆 This is Empty Email"),
        password: yup
            .string()
            .required("😐 👆 This is Empty Password")
            .min(5, "Plz enter your Cool Password more the 5 letters"),
    });

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
        },

        validationSchema: signInValidationSchema,

        onSubmit: async (values) => {

            const signIn = await fetch(`${API}/users/signup`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
                .then((data) => data.json())

            if (signIn.status === 400) {
                alert(signIn.message)
            } else {
                alert("New User has Registered Successfully 😃👍")
                navigate("/")
            }

        }

    });

    return (
        <form className="signin-page" onSubmit={formik.handleSubmit}>
            <h2>Signup Page</h2>
            <TextField
                value={formik.values.userName}
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                type={"text"}
                placeholder={"Enter a user name"}
                onChange={formik.handleChange}
                name="userName"
                onBlur={formik.handleBlur}
                error={formik.touched.userName && formik.errors.userName}
                helperText={formik.touched.userName && formik.errors.userName ? formik.errors.userName : null}
            />

            <TextField
                value={formik.values.email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type={"text"}
                placeholder={"Enter a Email ID"}
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
                type={"text"}
                placeholder={"Enter a Password"}
                onChange={formik.handleChange}
                name="password"
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
            />

            <Button variant="contained" type="submit">
                Submit
            </Button>

            <p className="login-route"> Do you have an account ? Click here 👉 <Link to="/"> Login </Link></p>

        </form>
    )
}
