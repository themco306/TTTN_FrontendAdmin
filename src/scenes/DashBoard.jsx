import React from "react";
import ContentHeader from "../components/ContentHeader";

import ContentMain from "../components/ContentMain";
import SignalRComponent from "../signal/SignalRComponent";
import OnlineUsers from "../signal/OnlineUsers";

function DashBoard() {
  return (
    <>
   
      <ContentHeader currentPage={""} previousPage={"Trang chủ"} />
      <div className="row">
        <div className="col-12 row">
          <div className="col-4 ">
            <ContentMain>
            {/* <SignalRComponent/> */}
            </ContentMain>
          </div>
          <div className="col-8 ">
            <ContentMain>
            <h5>Người dùng mới</h5>
            </ContentMain>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
