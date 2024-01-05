import React from 'react'
import { useNavigate } from 'react-router-dom'

export  function NotFound() {

  const navigate = useNavigate()
    return (
  
      <div className='page-not-found'>
          <h1>404 not found the page</h1>
          <h4 className="notfound" onClick={()=> navigate("/portal/home")} style={{color:"blue"}}>Back to Home-Page Click here</h4>
          <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"/>
      </div>
    )
  }
