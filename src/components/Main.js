import { Toast } from 'primereact/toast'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


function Main() {
  return (
   <div className="content-wrapper" style={{minHeight: 255}}>
    <ToastContainer />
    <Outlet/>
  </div>

  )
}

export default Main
