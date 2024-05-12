import React from 'react'

function ShowValiMsg({children,color='red', minHeight = '1.5em'}) {
  return (
    <div style={{ color:color,minHeight:minHeight }}>{children}</div>
  )
}

export default ShowValiMsg