import React from 'react'

export function Logout(){                            
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href="/"
}