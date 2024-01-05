import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from "./config";
import parse from 'html-react-parser';
import loading from "../assets/loading.gif";
import axios from "axios";

export function Viewnote() {
  const {_id} = useParams();

  const [note, setNote] = useState([])

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadData()
}, []);

let loadData = async () => {
    setLoading(true)
    let users = await axios.get(`${API}/notes/${_id}`,{
      headers:{"Authentication" : localStorage.getItem("token")}
    });
    setNote(users.data)
    setLoading(false)
}

  const navigate = useNavigate() 
  
  return (
    <div>{
  isLoading ? <img className="loading" src="https://cdn.dribbble.com/users/5008510/screenshots/10840297/media/df7b4d1933701ea86c581ac730063966.gif" alt="image" /> :

      <div className="movie-detail-container">
        <div className="movie-spec">
          <h2 className="movie-name">Title : {note.title}</h2>
          <h4 className="movie-rating"> Date : {note.date}</h4>
        </div>

        <div className="movie-description">{parse(note.note)}</div>

        <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={()=> navigate(-1)}>Back</Button>
      </div>
}
</div>

  );
}

