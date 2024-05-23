
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import postApi from '../../api/postApi';
import { pageActions } from '../../state/actions/pageActions';
import { toast } from 'react-toastify';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { confirmPopup } from 'primereact/confirmpopup';
import { Image } from 'primereact/image';
import appUrl from '../../api/appUrl';

function PostList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const pageData = useSelector((state) => state.pageReducers.pages);
  const [selectedPages, setSelectedPages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      var response = await postApi.getAllPost();
      console.log(response.data);
      dispatch(pageActions.listPage(response.data));
    };
    fetchData();
  }, []);
  const handleChangeStatus = async (id) => {
    try {
      const response = await postApi.updateStatus(id);
      console.log(response)
      if (response.status === 200) {
        dispatch(pageActions.updateStatusPage(id));
      }
    } catch (e) {
      if(e.response?.status){
        handleException(e)
      }
    }
  };
  const handleDelete = async (userId) => {
    try {
      let res = await postApi.delete(userId);
      console.log(res)
      if (res.status === 200) {
        dispatch(pageActions.deletePage(userId));
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
      const ids = selectedPages.map((p) => p.id);
      const data = {
        ids: ids,
      };
      console.log(data);
      let res = await postApi.deletes(data);
      console.log(res);
      if (res.status === 200) {
        const updatedSelected = selectedPages.filter(
          (p) => !ids.includes(p.id)
        );
        setSelectedPages(updatedSelected);
        dispatch(pageActions.deletePages(ids));
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
    if (selectedPages.length > 0) {
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
    <ContentHeader currentPage={"Tất cả bài viết"} previousPage={"Trang chủ"} />
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
              disabled={selectedPages.length === 0}
            />

            <Button
              icon={PrimeIcons.PLUS}
              label="Thêm"
              severity="success"
              raised
              onClick={() => navigate("/post/create")}
            />
          </div>
        </div>
        <DataTable
          value={pageData}
          selectionMode={false ? null : "checkbox"}
          selection={selectedPages}
          onSelectionChange={(e) => setSelectedPages(e.value)}
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
  body={(rowData) => rowData.id} 
  sortField="id" // Sử dụng sortField để chỉ định trường dữ liệu sẽ được sắp xếp

></Column>
<Column
            headerStyle={{ width: "15%" }}
            header="Hình ảnh bìa"
            body={(rowData)=>(
              <Image src={appUrl.postUrl+rowData.imagePath} width='100em' preview/>
            )}
          ></Column>
          <Column
            headerStyle={{ width: "20%" }}
            sortable
            header="Tên bài viết"
            field='name'
          ></Column>
                    <Column
            headerStyle={{ width: "20%" }}
            sortable
            header="Chủ đề"
            field='topic.name'
          ></Column>
                    <Column
            headerStyle={{ width: "20%" }}
            sortable
            header="Ngày tạo"
            sortField='createdAt'
            body={(rowData)=>(<span>{new Date(rowData.createdAt).toLocaleString()}</span>)}
          ></Column>
                    <Column
            headerStyle={{ width: "5%" }}
            sortable
            sortField="status" 
            header="Hiển thị"
            body={(rowData)=>(
              <InputSwitch
              checked={rowData.status===1?true:false}

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
                    navigate("/post/show", { state: { id: rowData.id } })
                  }
                />
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  label="Sửa"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/post/edit", { state: { id: rowData.id } })
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

export default PostList
