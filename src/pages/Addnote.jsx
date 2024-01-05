import React, { useState, useRef, useMemo} from "react";
// import { User } from "./User";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { Movie } from "./Movie";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./config";
import JoditEditor from "jodit-react";


export function Addnote() {
  const editor = useRef(null);




  const addMovieValidationSchema = yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
    
  });
  const [content, setContent] = useState("");
console.log(content)

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
     
     
    },

    validationSchema: addMovieValidationSchema,

    onSubmit: (values) => {
      addMovie(values);
      
   
    },
  });

  const navigate = useNavigate();

  const addMovie = (values) => {
    values.note = content;
    values.email = localStorage.getItem("email");

    fetch(`${API}/notes`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          "Authentication": localStorage.getItem("token")
        }
      })
      .then(()=> alert("New note has created done 😃 👍 "))
        .then(() => navigate("/portal/allnotes"))

  };

  return (
    <form className="add-note-form" onSubmit={formik.handleSubmit}>
     <div className="title-date">
      <TextField
        value={formik.values.title}
        className="title"
        id="outlined-basic"
        label="Title"
        variant="outlined"
        placeholder="Enter a title"
        onChange={formik.handleChange}
        name="title"
        error={formik.touched.title && formik.errors.title}
        helperText={
          formik.touched.title && formik.errors.title ? formik.errors.title : null
        }
        onBlur={formik.handleBlur}
      />

      <TextField
      type="date"
      className="date"
        value={formik.values.date}
        id="outlined-basic"
       
        variant="outlined"
        placeholder="Enter a date"
        onChange={formik.handleChange}
        name="date"
        error={formik.touched.date && formik.errors.date}
        helperText={
          formik.touched.date && formik.errors.date
            ? formik.errors.date
            : null
        }
        onBlur={formik.handleBlur}
      />

</div>

      <JoditEditor
      className="content"
        ref={editor}
			tabIndex={1}
        value={content}
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
      />

      

      <Button variant="contained" type="submit">
        Add-Note
      </Button>
    </form>
  );
}
