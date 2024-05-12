import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    
<>

<div className="noise"></div>
<div className="overlay"></div>
<div className="terminal">
  <h1>Lỗi <span class="errorcode">404</span></h1>
  <p className="output">Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.</p>
  <p className="output">Vui lòng thử <Link href="#1" onClick={() => window.history.back()}>quay lại</Link> hoặc <Link to="/">trở về trang chủ</Link>.</p>
<p className="output">Chúc may mắn.</p>
</div>

</>

  )
}

export default NotFound