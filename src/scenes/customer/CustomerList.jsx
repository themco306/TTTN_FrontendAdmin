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
import { Paginator } from 'primereact/paginator'
import { TriStateCheckbox } from 'primereact/tristatecheckbox'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

function CustomerList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const userData = useSelector((state) => state.userReducers.users);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [key, setKey] = useState("");
    const [onS, setOnS] = useState(false);
    const [selectOption, setSelectOption] = useState("");
    const [show, setShow] = useState(null);
    const options = [
      { name: "Mặc định", value: "" },
      { name: "Mới nhất", value: "create-asc" },
      { name: "Cũ nhất", value: "create-desc" },
      // { name: "Mới cập nhật", value: "update-desc" },
    ];
    useEffect(() => {
      const fetchData = async () => {
        try {
          const params = {
            key,
            status:show === null ? null : show ? 1 : 0,
            SortOrder:selectOption,
            pageSize: rows,
            pageNumber: currentPage,
          };
          var response = await userApi.getAllCustomer(params);
          console.log(response.data);
          dispatch(userActions.listUser(response.data.items));
          setTotalRecords(response.data.totalCount);
        setRows(response.data.pageSize);
        setCurrentPage(response.data.currentPage);
        setFirst((response.data.currentPage - 1) * response.data.pageSize);
        } catch (error) {
          console.log(error)
        }
       
      };
      fetchData();
    }, [currentPage, rows, onS,show,selectOption]);
    const onPageChange = (event) => {
      setFirst(event.first);
      setRows(event.rows);
      setCurrentPage(event.page + 1);
    };
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
    const footerTemplate = (
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[1, 2, 3, 5, 10, 20, 30, 50, 100]}
        onPageChange={onPageChange}
      />
    );
  return (
    <>
    <ConfirmDialog />
    <ContentHeader currentPage={"Khách hàng"} previousPage={"Trang chủ"} />
    <ContentMain>
      <div className="card">
        <div className="row  flex justify-content-between  mb-4">
          <div className="col-md-4">
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
          <div className="col-md-8" style={{ display:'flex',alignItems:'center' }}>
              <Dropdown
                value={selectOption}
                onChange={(e) => setSelectOption(e.value)}
                options={options}
                optionLabel="name"
                className="w-full md:w-14rem"
                 placeholder="Sắp xếp"
              />
              <InputText
                value={key}
                onChange={(e) => setKey(e.target.value)}
                style={{ width: "50%" }}
                placeholder="Tìm theo họ + tên có dấu, email, số điện thoại..."
                tooltip='Sử dụng dấu cộng để tìm theo họ&tên vd:Tran+Khanh'
              />
              <Button
                onClick={() => setOnS(!onS)}
                tooltip="Nếu muốn tìm tất cả thì nên đặt các thuộc tính khác về mặc định"
                severity="secondary"
                type="button"
              >
                Tìm
              </Button>
              <div className="ml-1" style={{ display: "flex", justifyContent: "space-between",alignItems:'center' }}>
                <TriStateCheckbox
                  value={show}
                  onChange={(e) => setShow(e.value)}
                />
                <label className="ml-1">
                  {show === null ? "Tất cả" : show ? "Đã xác thực" : "Chưa xác thực"}
                </label>
              </div>
            </div>
        </div>
        <DataTable
          value={userData}
          selectionMode={false ? null : "checkbox"}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          dataKey="id"
         
          removableSort
          footer={footerTemplate}
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
            headerStyle={{ width: "10%" }}
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
            headerStyle={{ width: "10%" }}
            sortable
            header="SĐT"
            field='phoneNumber'
          ></Column>
                              <Column
            headerStyle={{ width: "10%" }}
            sortable
            sortField="email" 

            header="Email"
            body={(rowData)=>(
              <span>{rowData.email}</span>
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
            headerStyle={{ width: "20%" }}
            body={(rowData) => (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={rowData.id}
              >
                <Button
                  icon={PrimeIcons.EYE}
                  tooltip="Xem"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/user/show", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  tooltip="Sửa"
                  severity='success'
                  raised
                  rounded
                  onClick={() =>
                    navigate("/user/edit", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.TRASH}
                  tooltip="Xóa"
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

export default CustomerList