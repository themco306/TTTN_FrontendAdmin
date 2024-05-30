import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import React, { useEffect, useState } from "react";
import dashboardApi from "../api/dashboardApi";
import { date } from "yup";

function SummaryOrder() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(today);
  const [summaryOrder, setSummaryOrder] = useState({});
  const fetch = async () => {
    try {
      const datetimeQuery = {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      };
      console.log(endDate.toLocaleString())
      const response = await dashboardApi.summaryOrder(datetimeQuery);
      console.log(response);
      if (response.status === 200) {
        setSummaryOrder(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="row">
      <div className="col-12 mt-2">
        <p
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >Tổng số đơn: <strong>{summaryOrder.totalOrders} đơn</strong></p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Trung bình mỗi đơn:{" "}
          <strong>{summaryOrder.averageOrderValue?.toLocaleString()} VND</strong>
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Tổng Giá trị:{" "}
          <strong>{summaryOrder.totalRevenue?.toLocaleString()} VND</strong>
        </p>
      </div>
      <div
        className="col-12 my-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor="">Từ &nbsp;</label>
        <Calendar
          value={startDate}
          onChange={(e) => setStartDate(e.value)}
          dateFormat="dd/mm/yy"
          maxDate={new Date()}

        />
      </div>
      <div
        className="col-12 my-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor="">Đến &nbsp;</label>
        <Calendar
            maxDate={new Date()}
          value={endDate}
          onChange={(e) => setEndDate(e.value)}
          dateFormat="dd/mm/yy"
        />
      </div>
      <div
        className="col-12 my-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={fetch} label="Lọc" />
      </div>
    </div>
  );
}

export default SummaryOrder;
