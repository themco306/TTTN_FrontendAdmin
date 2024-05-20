import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCustomException from '../../helpers/useCustomException';
import { useDispatch } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import orderApi from '../../api/orderApi';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import appUrl from '../../api/appUrl';
import { Image } from 'primereact/image';
import OrderStatus from './OrderStatus';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { toast } from 'react-toastify';

function OrderEdit() {
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
    const location = useLocation();
    const orderId = location.state.id;
    const handleException = useCustomException();
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [lFecth,setLFecth]=useState(false)
    const [order, setOrder] = useState(null);
    useEffect(()=>{
        const fetchData =async()=>{
          try{
            setLFecth(true)
            const res=await orderApi.get(orderId);
            if(res.status===200){
                setOrder(res.data)
                setLFecth(true)
              console.log(res.data)
            }
          }catch(error){
            if(error.response?.status){
              handleException(error)
    
            }
          }
        }
        fetchData()
      },[orderId])
      const handleDis =(status,statusD,paymentType)=>{
        switch (statusD) {
            case "Cancelled":
                if(status==="Received"||status==="Cancelled"){
                    return true;
                }
                return false;
            case "Delivered":
                if(status==="Shipped")
                    {
                        return false;
                    }
                return true;
                case "Shipped":
                    if(paymentType==="OnlinePayment"&&status==="PaymentCompleted")
                        {
                            return false;
                        }else if(status==="Confirmed"&&paymentType!=="OnlinePayment"){
                            return false;
                        }
                    return true;
            default:
                return false;
        }
           
      }
      const handleChangeStatus = async (status) => {
        try {
            const data = {
                status: status
            };
            const response = await orderApi.updateStatus(orderId, data);
            if (response.status === 200) {
                setOrder(prev => ({ ...prev, status: status }));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };
  return (
    <>
    <ContentHeader
           currentPage={"Cập nhật trạng thái"}
           previousPage={"Đơn hàng"}
           previousPath={"/order"}
    />
    <ContentMain>
    <div className="row m-5">
      <div className="col-md-5">
        <h3>Thông tin đơn hàng</h3>
        {order!==null && (
          <>
            <p>Mã đơn hàng: {order.code}</p>
            <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Hình thức thanh toán: {order.paymentType==="OnlinePayment"? "Thanh toán online":"Thanh toán khi nhận hàng"}</p>
            <p>Giá tiền: {order.total.toLocaleString()} VND</p>
            <div>Trạng thái: <OrderStatus
                  data={getStatusText(order.status,order.paymentType)}
                  id={order.id}
                /></div>
          </>
        )}
      </div>
      <div className="col-md-7">
        <h3>Thông tin người nhận</h3>
        {order!==null && (
          <>
        <p>Danh xưng: {order.orderInfo.deliveryName}</p>
        <p>Số ĐT: {order.orderInfo.deliveryPhone}</p>
        <p>Đia chỉ giao hàng: {order.orderInfo.deliveryAddress}, {order.orderInfo.deliveryWard}, {order.orderInfo.deliveryDistrict}, {order.orderInfo.deliveryProvince}</p>
        <p>Ghi chú: {order.note}</p>
        </>)}
      </div>
      <div className="col-md-8">
        <h4>Chi tiết đơn hàng</h4>
        {order!==null&&(
             <DataTable value={order.orderDetails} tableStyle={{ minWidth: '40rem',fontSize:15 }}>
             <Column style={{ width:"15%" }} header="Hình ảnh" body={(item)=>(
                <><Image src={appUrl.imageURL+item.product.galleries[0].imagePath} width="100%"/></>
             )}></Column>
             <Column  style={{ width:"30%" }}  header="Tên" body={(item)=>(<span>{item.product.name}</span>)}></Column>
             <Column  style={{ width:"20%" }} header="Giá mua" body={(item)=>(<span>{item.price.toLocaleString()} VND</span>)}></Column>
             <Column  style={{ width:"10%" }} field="quantity" header="Số lượng"></Column>
             <Column  style={{ width:"20%" }}  header="Tổng" body={(item)=>(<span>{item.totalPrice.toLocaleString()} VND</span>)}></Column>
            </DataTable>
        )}
      </div>
      <div className="col-md-4">
        <h4>Khác</h4>
        {order?.paidOrder&&order?.paidOrder.paymentDate!==null&&(
            <p>Đã thanh toán qua: <strong>{order?.paidOrder.paymentMethod}</strong> vào lúc {new Date(order?.paidOrder.paymentDate).toLocaleString()}</p>
        )}
        <div style={{ display:'flex',justifyContent:'space-between' }}>
            <Button onClick={()=>handleChangeStatus("Shipped")} disabled={handleDis(order?.status,"Shipped",order?.paymentType)} severity='info' icon={'pi pi-truck'} tooltip='Nhấn vào để xác nhận rằng đơn hàng đang được giao'/>
            <Button onClick={()=>handleChangeStatus("Delivered")} disabled={handleDis(order?.status,"Delivered",order?.paymentType)} severity='success' icon={'pi pi-verified'} tooltip='Nhấn vào để xác nhận đơn hàng đã giao thành công'/>
            <Button onClick={()=>handleChangeStatus("Cancelled")} disabled={handleDis(order?.status,"Cancelled",order?.paymentType)} severity='danger' icon={'pi pi-trash'} tooltip='Nhấn vào để hủy đơn hàng'/>
        </div>
      </div>
    </div>
    </ContentMain>
  </>
  )
}

export default OrderEdit
