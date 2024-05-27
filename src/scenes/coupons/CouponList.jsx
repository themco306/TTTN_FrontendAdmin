import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import React, { useEffect, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import ContentMain from '../../components/ContentMain'
import { PrimeIcons } from 'primereact/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import couponApi from '../../api/couponApi'
import { couponActions } from '../../state/actions/couponActions'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputSwitch } from 'primereact/inputswitch'
import { confirmPopup } from 'primereact/confirmpopup'

function CouponList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const couponData = useSelector((state) => state.couponReducers.coupons);
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            var response = await couponApi.getAll();
            console.log(response.data);
            dispatch(couponActions.listCoupon(response.data));
          } catch (error) {
            console.log(error)
          }
        
        };
        fetchData();
      }, []);
      const handleDelete = async (productId) => {
        if (!confirmPopup()) return;
        try {
          let res = await couponApi.delete(productId);
          if (res.status === 200) {
            dispatch(couponActions.deleteCoupon(productId));
            toast.success(res.data.message);
          }
          return;
        } catch (err) {
          console.log(err);
          toast.error("Không thể xóa bản ghi này!");
          return;
        }
      };
    
      const handleConfirmDelete = (productId) => {
        confirmDialog({
          message: "Bạn có thực sự muốn xóa?",
          header: "Xóa",
          acceptLabel: "Có",
          rejectLabel: "Không",
          icon: "pi pi-info-circle",
          position: "right",
          accept: () => handleDelete(productId),
          reject: () => {},
        });
      };
      const handleDeleteSelected = async () => {
        if (!confirmPopup()) return;
        try {
          const ids = selectedCoupons.map((p) => p.id);
          const data = {
            ids: ids,
          };
          console.log(data);
          let res = await couponApi.deleteProducts(data);
          console.log(res);
          if (res.status === 200) {
            const updatedSelected = selectedCoupons.filter(
              (p) => !ids.includes(p.id)
            );
            setSelectedCoupons(updatedSelected);
            dispatch(couponActions.deleteCoupons(ids));
            toast.success(`Xóa thành công ID: ${ids}`);
          }
          return;
        } catch (err) {
          console.log(err);
    
          toast.error("Không thể xóa bản ghi này!");
          return;
        }
      };
    
      const handleConfirmDeleteSelected = () => {
        if (selectedCoupons.length > 0) {
          confirmDialog({
            message: "Bạn có thực sự muốn xóa?",
            header: "Xóa",
            acceptLabel: "Có",
            rejectLabel: "Không",
            icon: "pi pi-info-circle",
            position: "top-left",
            accept: handleDeleteSelected,
            reject: () => {},
          });
        } else {
          toast.info("Bạn chưa chọn gì để xóa!");
        }
      };
      const handleChangeStatus = async (id) => {
        try {
          const response = await couponApi.updateStatus(id);
          if (response.status === 200) {
            dispatch(couponActions.updateStatusCoupon(id));
          }
          console.log(response);
        } catch (e) {
          console.error(e);
        }
      };
  return (
    <>
    <ConfirmDialog />
    <ContentHeader currentPage={"Mã giảm giá"} previousPage={"Trang chủ"} />
    <ContentMain>
      <div className="card">
        <div className="row  flex justify-content-between  mb-4">
          <div className="col-md-6">
            <Button
              icon={PrimeIcons.TRASH}
              label="Xóa đã chọn"
              onClick={handleConfirmDeleteSelected}
              severity="danger"
              raised
              disabled={selectedCoupons.length === 0}
            />

            <Button
              icon={PrimeIcons.PLUS}
              label="Thêm"
              severity="success"
              raised
              onClick={() => navigate("/coupon/create")}
            />
          </div>
        </div>
        <DataTable
          value={couponData}
          selectionMode={false ? null : "checkbox"}
          selection={selectedCoupons}
          onSelectionChange={(e) => setSelectedCoupons(e.value)}
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
            field="id"
            header="STT"
          ></Column>
          <Column
            headerStyle={{ width: "15%" }}
            header="Mã Giảm"
            field='code'
          ></Column>
          <Column
            headerStyle={{ width: "30%" }}
            sortable
            field="description"
            header="Mô tả"
          ></Column>
          <Column
            headerStyle={{ width: "8%" }}
            sortable
            field="usageLimit"
            header="Số lượng còn"
          ></Column>
          <Column
            header="Chức năng"
            headerStyle={{ width: "30%" }}
            body={(rowData) => (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={rowData.id}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputSwitch
                    checked={rowData.status === 1 ? true : false}
                    onChange={() => handleChangeStatus(rowData.id)}
                  />
                </div>
                <Button
                  icon={PrimeIcons.EYE}
                  label="Xem"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/coupon/show", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  label="Sửa"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/coupon/edit", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.TRASH}
                  label="Xóa"
                  severity="danger"
                  onClick={() => handleConfirmDelete(rowData.id)}
                  raised
                  rounded
                />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </ContentMain>
  </>
  )
}

export default CouponList
