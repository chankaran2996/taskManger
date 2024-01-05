import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./config";
import JoditEditor from "jodit-react";

export function Editnote() {
  const { _id } = useParams();

  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`${API}/notes/${_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authentication: localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((nts) => setNote(nts));
  }, []);

  return (
    <div>
      {note ? (
        <EditFormNote note={note} />
      ) : (
        <img
          className="loading"
          src="https://cdn.dribbble.com/users/5008510/screenshots/10840297/media/df7b4d1933701ea86c581ac730063966.gif"
          alt="image"
        />
      )}
    </div>
  );
}

function EditFormNote({ note }) {
  const editor = useRef(null);

  const addMovieValidationSchema = yup.object({
    title: yup.string().required(),
    date: yup.date().required(),
  });
  const [content, setContent] = useState(note.note);

  const formik = useFormik({
    initialValues: {
      title: note.title,
      date: note.date,
    },

    validationSchema: addMovieValidationSchema,

    onSubmit: (values) => {
      addMovie(values);
    },
  });

  const navigate = useNavigate();

  const addMovie = (values) => {
    values.note = content;

    ////-----> Follow 3 step's <-----////
    //// Step's
    //// 1. Method => POST
    //// 2. body => data & JSON(string)
    //// 3. header => JSON

    fetch(`${API}/notes/${note._id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
        Authentication: localStorage.getItem("token"),
      },
    })
      .then(() => alert("This data updated successfully 😃 👍"))
      .then(() => navigate("/portal/allnotes"));
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
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : null
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
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />

      <Button variant="contained" type="submit">
        Update-Note's
      </Button>
    </form>
  );
}
