import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import ContentMain from '../../components/ContentMain'
import { Column } from 'primereact/column'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userApi } from '../../api/userApi'
import { userActions } from '../../state/actions/userActions'
import { Image } from 'primereact/image'
import appUrl from '../../api/appUrl'
import { Avatar } from 'primereact/avatar'
import { InputSwitch } from 'primereact/inputswitch'
import { toast } from 'react-toastify'
import { confirmPopup } from 'primereact/confirmpopup'
import useCustomException from '../../helpers/useCustomException'

function UserList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const userData = useSelector((state) => state.userReducers.users);
    const [selectedUsers, setSelectedUsers] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        var response = await userApi.getAll();
        console.log(response.data);
        dispatch(userActions.listUser(response.data));
      };
      fetchData();
    }, []);
    const handleChangeStatus = async (id) => {
      try {
        const response = await userApi.updateStatus(id);
        if (response.status === 200) {
          dispatch(userActions.updateStatusUser(id));
        }
      } catch (e) {
        if(e.response?.status){
          handleException(e)
        }
      }
    };
    const handleDelete = async (userId) => {
      try {
        let res = await userApi.delete(userId);
        console.log(res)
        if (res.status === 200) {
          dispatch(userActions.deleteUser(userId));
          toast.success(`Xóa thành công ID: ${userId}`);
        }
        return;
      } catch (err) {
        console.log(err);
        toast.error("Không thể xóa bản ghi này!");
        return;
      }
    };
  
    const handleConfirmDelete = (userId) => {
      confirmDialog({
        message: "Bạn có thực sự muốn xóa?",
        header: "Xóa",
        acceptLabel: "Có",
        rejectLabel: "Không",
        icon: "pi pi-info-circle",
        position: "right",
        accept: () => handleDelete(userId),
        reject: () => {},
      });
    };
    const handleDeleteSelected = async () => {
      if (!confirmPopup()) return;
      try {
        const ids = selectedUsers.map((p) => p.id);
        const data = {
          ids: ids,
        };
        console.log(data);
        let res = await userApi.deleteUsers(data);
        console.log(res);
        if (res.status === 200) {
          const updatedSelected = selectedUsers.filter(
            (p) => !ids.includes(p.id)
          );
          setSelectedUsers(updatedSelected);
          dispatch(userActions.deleteUsers(ids));
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
      if (selectedUsers.length > 0) {
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
  return (
    <>
    <ConfirmDialog />
    <ContentHeader currentPage={"Quản trị viên"} previousPage={"Trang chủ"} />
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
              disabled={selectedUsers.length === 0}
            />

            <Button
              icon={PrimeIcons.PLUS}
              label="Thêm"
              severity="success"
              raised
              onClick={() => navigate("/user/create")}
            />
          </div>
        </div>
        <DataTable
          value={userData}
          selectionMode={false ? null : "checkbox"}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
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
  header="Mã"
  body={(rowData) => rowData.id.slice(9, 13)} 
  sortField="id" // Sử dụng sortField để chỉ định trường dữ liệu sẽ được sắp xếp

></Column>

          <Column
            headerStyle={{ width: "15%" }}
            header="Ảnh"
            body={(rowData) => (
              <Avatar image={rowData.avatar&&(appUrl.avatarURL+rowData.avatar)} size="xlarge" shape="circle"  />
            )}
          ></Column>
          <Column
            headerStyle={{ width: "20%" }}
            sortable
            sortField="firstName" 
            header="Họ&Tên"
            body={(rowData)=>(
              <span>{rowData.firstName +' '+rowData.lastName}</span>
            )}
          ></Column>
          <Column
            headerStyle={{ width: "8%" }}
            sortable
            field="quantity"
            header="Quyền hạn"
            body={(rowData)=>(
              <span>
              {rowData.roles.slice(0, 2).map((role, index) => (
                <React.Fragment key={index}>
                  {role}
                  {index !== rowData.roles.length - 1 && ", "}
                </React.Fragment>
              ))}
              {rowData.roles.length > 2 && "..."}
            </span>
            )}
          ></Column>
                    <Column
            headerStyle={{ width: "5%" }}
            sortable
            sortField="emailConfirmed" 
            header="Xác thực Email"
            body={(rowData)=>(
              <InputSwitch
              checked={rowData.emailConfirmed}
              onChange={() => handleChangeStatus(rowData.id)}
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
                  icon={PrimeIcons.EYE}
                  label="Xem"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/user/show", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  label="Sửa"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/user/edit", { state: { id: rowData.id } })
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

export default UserList