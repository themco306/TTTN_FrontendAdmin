import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import React, { useEffect, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import ContentMain from '../../components/ContentMain'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../../state/actions/menuActions';
import menuApi from '../../api/menuApi';
import { PrimeIcons } from 'primereact/api';
import { confirmPopup } from 'primereact/confirmpopup';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

function MenuList() {
    const getType=(type)=>{
        switch (type) {
            case "category":
                return "Danh mục"
                case "post":
                    return "Bài viết"
            default:
                return "Tùy biến"
        }
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuData = useSelector((state) => state.menuReducers.menus);
    const [selectedMenus, setSelectedMenus] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await menuApi.getAll();
          console.log(response);
          dispatch(menuActions.listMenu(response.data));
        };
        fetchData();
      }, []);
      const handleDelete = async (productId) => {
        if (!confirmPopup()) return;
        try {
          let res = await menuApi.delete(productId);
          if (res.status === 200) {
            dispatch(menuActions.deleteMenu(productId));
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
          const ids = selectedMenus.map((p) => p.id);
          const data = {
            ids: ids,
          };
          console.log(data);
          let res = await menuApi.deleteMenus(data);
          console.log(res);
          if (res.status === 200) {
            const updatedSelected = selectedMenus.filter(
              (p) => !ids.includes(p.id)
            );
            setSelectedMenus(updatedSelected);
            dispatch(menuActions.deleteMenus(ids));
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
        if (selectedMenus.length > 0) {
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
          const response = await menuApi.updateStatus(id);
          if (response.status === 200) {
            dispatch(menuActions.updateStatusMenu(id));
          }
          console.log(response);
        } catch (e) {
          console.error(e);
        }
      };
  return (
    <>
    <ConfirmDialog />
    <ContentHeader currentPage={"Quản lý menu"} previousPage={"Trang chủ"} />
    <ContentMain>
     <div className='row'>
        <div className="col-md-3"></div>
        <div className="col-md-9">
        <div className="card">
        <div className="row  flex justify-content-between  mb-4">
          <div className="col-md-6">
            <Button
              icon={PrimeIcons.TRASH}
              label="Xóa đã chọn"
              onClick={handleConfirmDeleteSelected}
              severity="danger"
              raised
              disabled={selectedMenus.length === 0}
            />
          </div>
        </div>
        <DataTable
          value={menuData}
          selectionMode={false ? null : "checkbox"}
          selection={selectedMenus}
          onSelectionChange={(e) => setSelectedMenus(e.value)}
          dataKey="id"
          paginator
          removableSort
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "40rem" }}
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
          sortable
          sortField='name'
            headerStyle={{ width: "25%" }}
            header="Tên/Liên kết"
            body={(rowData)=>(<div><div><strong>{rowData.name}</strong></div><div><span>{rowData.link}</span></div></div>)}
          ></Column>
          <Column
            headerStyle={{ width: "15%" }}
            sortable
            sortField='position'
            header="Vị trí"
            body={(rowData)=>(<span>{rowData.position==="mainmenu"?"menu trên":"menu dưới"}</span>)}
          ></Column>
          <Column
            headerStyle={{ width: "15%" }}
            sortable
            sortField='type'
            header="Loại"
            body={(rowData)=>(<span>{getType(rowData.type)}</span>)}
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
                  tooltip='Xem chi tiết'
                  raised
                  rounded
                  onClick={() =>
                    navigate("/menu/show", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  tooltip='Sửa'
                  raised
                  rounded
                  onClick={() =>
                    navigate("/menu/edit", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.TRASH}
                  tooltip='Xóa'
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
        </div>
     </div>
    </ContentMain>
  </>
  )
}

export default MenuList
