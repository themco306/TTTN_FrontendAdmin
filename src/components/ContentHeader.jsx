import React from 'react'
import { Link } from 'react-router-dom'

function ContentHeader({currentPage, previousPage,previousPath="/"}) {
  return (
    <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">{currentPage}</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><Link to={previousPath}>{previousPage}</Link></li>
            <li className="breadcrumb-item active">{currentPage}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ContentHeader
