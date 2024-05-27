import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import contactApi from "../../api/contactApi";
import { contactActions } from "../../state/actions/contactActions";
import { toast } from "react-toastify";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";
import ModalShowContent from "./ModalShowContent";

function ContactList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const contactData = useSelector((state) => state.contactReducers.contacts);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await contactApi.getAll();
        console.log(response.data);
        dispatch(contactActions.listContact(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (productId) => {
    if (!confirmPopup()) return;
    try {
      let res = await contactApi.delete(productId);
      if (res.status === 200) {
        dispatch(contactActions.deleteContact(productId));
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
      const ids = selectedContacts.map((p) => p.id);
      const data = {
        ids: ids,
      };
      console.log(data);
      let res = await contactApi.deleteProducts(data);
      console.log(res);
      if (res.status === 200) {
        const updatedSelected = selectedContacts.filter(
          (p) => !ids.includes(p.id)
        );
        setSelectedContacts(updatedSelected);
        dispatch(contactActions.deleteContacts(ids));
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
    if (selectedContacts.length > 0) {
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
      <ContentHeader currentPage={"Liên hệ"} previousPage={"Trang chủ"} />
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
                disabled={selectedContacts.length === 0}
              />
            </div>
          </div>
          <DataTable
            value={contactData}
            selectionMode={false ? null : "checkbox"}
            selection={selectedContacts}
            onSelectionChange={(e) => setSelectedContacts(e.value)}
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
              headerStyle={{ width: "10%" }}
              header="Họ & Tên"
              sortable
              field="name"
            ></Column>
            <Column
              headerStyle={{ width: "15%" }}
              sortable
              sortField="createdAt"
              header="Ngày tạo"
              body={(rowData) => (
                <span>{new Date(rowData.createdAt).toLocaleString()}</span>
              )}
            ></Column>
<Column
  headerStyle={{ width: "20%" }}
  header="Nội dung"
  body={(rowData) => {
    const content = rowData.content || "";
    const truncatedContent = content.length > 50 ? `${content.substring(0, 50)}...` : content;

    return <span>{truncatedContent}</span>;
  }}
></Column>
            <Column
              headerStyle={{ width: "15%" }}
              sortable
              sortField="status"
              header="Trạng thái"
              body={(rowData) => (
                <div>
                  {rowData.status === 1 ? (
                    <Button label="Đã trả lời" severity="success" rounded />
                  ) : (
                    <Button label="Chưa trả lời" severity="danger" rounded />
                  )}
                </div>
              )}
            ></Column>
            <Column
              header="Chức năng"
              headerStyle={{ width: "15%" }}
              body={(rowData) => (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  key={rowData.id}
                >
                  <ModalShowContent content={rowData.content} id={rowData.id} replayContent={rowData.replayContent}/>
                 
                  <Button
                    icon={PrimeIcons.USER_EDIT}
                    tooltip="Nhấn để trả lời"
                    tooltipOptions={{ position:'top' }}
                    raised
                    rounded
                    onClick={() =>
                      navigate("/contact/edit", { state: { id: rowData.id } })
                    }
                  />
                  <Button
                    icon={PrimeIcons.TRASH}
                    tooltip="Nhấn để xóa"
                    tooltipOptions={{ position:'top' }}
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
  );
}

export default ContactList;
