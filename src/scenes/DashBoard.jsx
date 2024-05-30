import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";

import ContentMain from "../components/ContentMain";
import { useSelector } from "react-redux";
import NewUser from "./NewUser";
import OrderStatusChart from "./OrderStatusChart";
import { Message } from "primereact/message";
import SummaryOrder from "./SummaryOrder";

function DashBoard() {
  const adminOnline=useSelector(state=>state.signalrReducers.adminOnline)
  const customerOnline=useSelector(state=>state.signalrReducers.customerOnline)
  return (
    <>
   
      <ContentHeader currentPage={""} previousPage={"Trang chủ"} />
      <div className="row">
        <div className="col-12 row">
          <div className="col-4 ">
            <ContentMain>
            <Message icon={"pi pi-globe"} style={{ width:"100%",fontSize:18 }} text="Người dùng trực tuyến" />
              <div className="row mt-2">
                <div className="col-12">
                  <p>Trang quản trị: <strong style={{ color:"green" }}>{adminOnline}</strong>
                  </p>
                </div>
                <div className="col-12">
                  <p>Trang người dùng: <strong style={{ color:"green" }}>{customerOnline}</strong>
                  </p>
                </div>
              </div>
              <Message severity="success" icon={"pi pi-dollar"} style={{ width:"100%",fontSize:18 }} text="Doanh thu" />
                <SummaryOrder/>

            </ContentMain>
          </div>
 
          <div className="col-8 row ">
            <div className="col-12">
            <ContentMain>
           <NewUser/>

            </ContentMain>
            </div>
            <div className="col-12">
            <ContentMain>
            <OrderStatusChart/>
            </ContentMain>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
