import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import { useDispatch, useSelector } from "react-redux";
import useCustomException from "../../helpers/useCustomException";
import brandApi from "../../api/brandApi";
import { brandActions } from "../../state/actions/brandActions";
import { confirmPopup } from "primereact/confirmpopup";
import { toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ContentMain from "../../components/ContentMain";
import { PrimeIcons } from "primereact/api";
import { SelectButton } from "primereact/selectbutton";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import ModalBrandAdd from "./ModalBrandAdd";
import ModalBrandEdit from "./ModalBrandEdit";
import ModalBrandShow from "./ModalBrandShow";

function BrandList() {
  const brandData = useSelector((state) => state.brandReducers.brands);
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sizeOptions] = useState([
    { label: "Nhỏ", value: "small" },
    { label: "Vừa", value: "normal" },
    { label: "Lớn", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await brandApi.getAll();
        console.log(response.data);
        dispatch(brandActions.listBrand(response.data));
      } catch (error) {
        if (error.response?.status) {
          handleException(error);
        }
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (categoryId) => {
    if (!confirmPopup()) return;
    try {
      let res = await brandApi.delete(categoryId);
      if (res.status === 200) {
        dispatch(brandActions.deleteBrand(categoryId));
        toast.success(res.data.message);
      }
      return;
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
    }
  };

  const handleConfirmDelete = (categoryId) => {
    confirmDialog({
      message: "Bạn có thực sự muốn xóa?",
      header: "Xóa",
      acceptLabel: "Có",
      rejectLabel: "Không",
      icon: "pi pi-info-circle",
      position: "right",
      accept: () => handleDelete(categoryId),
      reject: () => {},
    });
  };
  const handleDeleteSelected = async () => {
    if (!confirmPopup()) return;
    try {
      const ids = selectedBrands.map((category) => category.id);
      const data = {
        ids: ids,
      };
      console.log(data);
      let res = await brandApi.deleteBrands(data);
      console.log(res);
      if (res.status === 200) {
        const updatedSelectedCategories = selectedBrands.filter(
          (category) => !ids.includes(category.id)
        );
        setSelectedBrands(updatedSelectedCategories);
        dispatch(brandActions.deleteBrands(ids));
        toast.success(res.data.message);
      }
      return;
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
    }
  };

  const handleConfirmDeleteSelected = () => {
    if (selectedBrands.length > 0) {
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
      const response = await brandApi.updateStatus(id);
      if (response.status === 200) {
        dispatch(brandActions.updateStatusBrand(id));
      }
      console.log(response);
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
    }
  };
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Thương hiệu"} previousPage={"Trang chủ"} />
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
                disabled={selectedBrands.length === 0}
              />

              <ModalBrandAdd />
            </div>
            <div
              className="col-md-6 "
              style={{ display: "flex", justifyContent: "end" }}
            >
              <SelectButton
                value={size}
                onChange={(e) => setSize(e.value)}
                options={sizeOptions}
              />
            </div>
          </div>

          <DataTable
            value={brandData}
            size={size}
            selectionMode={false ? null : "checkbox"}
            selection={selectedBrands}
            onSelectionChange={(e) => setSelectedBrands(e.value)}
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
              header="Mã"
            ></Column>
            <Column
              headerStyle={{ width: "25%" }}
              sortable
              field="name"
              header="Tên"
            ></Column>
            <Column
              headerStyle={{ width: "15%" }}
              sortable
              sortField="createdAt"
              header="Ngày tạo"
              body={(rowData)=>(<span>{new Date(rowData.createdAt).toLocaleString()}</span>)}
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
                  <ModalBrandShow brandId={rowData.id}/>
                  <ModalBrandEdit brandId={rowData.id}/>

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
  );
}

export default BrandList;
