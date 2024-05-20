import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import orderApi from "../../api/orderApi";
import { orderActions } from "../../state/actions/orderActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { Tooltip } from "primereact/tooltip";
import OrderStatus from "./OrderStatus";

function OrderList() {
  const getStatusText = (status,paymentType) => {
    switch (status) {
      case 'PendingUserConfirmation':
        return {
          text: 'Chờ xác nhận',
          icon: "pi pi-file-check",
          tooltip: "Đợi khách xác nhận đặt hàng",
          type: "warn"
        };
      case 'Confirmed':
        return {
          text: 'Đã xác nhận',
          icon: "pi pi-box",
          tooltip: paymentType==="OnlinePayment"?"Chờ khách thanh toán":"Cần đóng gói hàng",
          type: "success"
        };
      case 'Shipped':
        return {
          text: 'Đang giao hàng',
          icon: "pi pi-truck",
          tooltip: "Đang giao hàng",
          type: "warn"
        };
      case 'Delivered':
        return {
          text: 'Đã giao hàng',
          icon: "pi pi-check",
          tooltip: "Giao thành công",
          type: "info"
        };
      case 'Received':
        return {
          text: 'Đã nhận hàng',
          icon: "pi pi-check-circle",
          tooltip: "Khách đã nhận hàng",
          type: "success"
        };
      case 'Cancelled':
        return {
          text: 'Đơn bị hủy',
          icon: "pi pi-times-circle",
          tooltip: "Đã hủy",
          type: "error"
        };
      case 'PaymentCompleted':
        return {
          text: 'Đã thanh toán',
          icon: "pi pi-credit-card",
          tooltip: "Khách đã thanh toán,Cần đóng gói hàng",
          type: "success"
        };
      default:
        return {
          text: 'Không xác định',
          icon: "pi pi-question-circle",
          tooltip: "Trạng thái không xác định",
          type: "info"
        };
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state.orderReducers.orders);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var response = await orderApi.getAll();
      console.log(response);
      dispatch(orderActions.listOrder(response.data));
    };
    fetchData();
  }, []);
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Đơn hàng"} previousPage={"Trang chủ"} />
      <ContentMain>
        <div className="card">
          <div className="row  flex justify-content-between  mb-4">
            <div className="col-md-6">
              {/* <Button
                icon={PrimeIcons.TRASH}
                label="Xóa đã chọn"
                onClick={handleConfirmDeleteSelected}
                severity="danger"
                raised
                disabled={selectedProducts.length === 0}
              /> */}

              {/* <Button
                icon={PrimeIcons.PLUS}
                label="Thêm"
                severity="success"
                raised
                onClick={() => navigate("/product/create")}
              /> */}
            </div>
          </div>
          <DataTable
            value={orderData}
            selectionMode={false ? null : "checkbox"}
            selection={selectedOrders}
            onSelectionChange={(e) => setSelectedOrders(e.value)}
            dataKey="id"
            paginator
            removableSort
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5%" }}
            ></Column>
            <Column
              headerStyle={{ width: "5%" }}
              sortable
              field="code"
              header="Mã"
            ></Column>
            <Column
              headerStyle={{ width: "10%" }}
              sortable
              sortField="user.firstName"
              header="Người đặt"
              body={(rowData) => (
                <span>
                  {rowData.user.firstName + " " + rowData.user.lastName}
                </span>
              )}
            ></Column>
            <Column
              headerStyle={{ width: "10%" }}
              sortable
              sortField="orderInfo.deliveryName"
              header="Người nhận"
              body={(rowData) => <span>{rowData.orderInfo.deliveryName}</span>}
            ></Column>
            <Column
              headerStyle={{ width: "10%" }}
              sortable
              sortField="total"
              header="Giá tiền"
              body={(rowData)=><span>{rowData.total.toLocaleString()} VND</span>}
            ></Column>
            <Column
              headerStyle={{ width: "18%" }}
              sortable
              sortField="createdAt"
              header="Ngày đặt"
              body={(rowData) => (
                <span>{new Date(rowData.createdAt).toLocaleString()}</span>
              )}
            ></Column>
            <Column
              headerStyle={{ width: "20%" }}
              sortable
              sortField="status"
              header="Trạng thái"
              body={(rowData) => (
                <OrderStatus
                  data={getStatusText(rowData.status,rowData.paymentType)}
                  id={rowData.id}
                />
              )}
            ></Column>
            <Column
              header="Chức năng"
              headerStyle={{ width: "30%" }}
              body={(rowData) => (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  key={rowData.id}
                >
                  <Button
                    icon={PrimeIcons.USER_EDIT}
                    label=""
                    tooltip="Cập nhật trạng thái đơn hàng"
                    raised
                    rounded
                    onClick={() =>
                      navigate("/order/edit", { state: { id: rowData.id } })
                    }
                  />
                 
                </div>
              )}
            ></Column>
          </DataTable>
        </div>
      </ContentMain>
    </>
  );
}

export default OrderList;
