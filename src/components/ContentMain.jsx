import React from 'react'

function ContentMain({children,deleteAll=true,add=true}) {
  return (
    <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
             {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ContentMain
