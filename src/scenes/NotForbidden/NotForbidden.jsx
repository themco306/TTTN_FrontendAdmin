import React from 'react'
import { Link } from 'react-router-dom'
function NotForbidden() {
  return (
    
<>

<div className="noise"></div>
<div className="overlay"></div>
<div className="terminal">
  <h1>Lỗi <span className="errorcode">403</span></h1>
  <p className="output">Bạn không có quyền truy cập</p>
  <p className="output">Vui lòng thử <a href="/">trở về trang chủ</a>.</p>
<p className="output">Chúc may mắn.</p>
</div>

</>

  )
}

export default NotForbidden