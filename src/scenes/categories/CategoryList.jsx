import React, { useEffect, useRef, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton } from "primereact/selectbutton";
import categoryApi from "../../api/categoryApi";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { InputSwitch } from "primereact/inputswitch";
import ModalCategoryAdd from "./ModalCategoryAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryActions
} from "../../state/actions/categoryActions";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ModalCategoryEdit from "./ModalCategoryEdit";
import { toast } from "react-toastify";
import ModalCategoryShow from "./ModalCategoryShow";
import useCustomException from "../../helpers/useCustomException";
function CategoryList() {
  const categoryData = useSelector(
    (state) => state.categoryReducers.categories
  );
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sizeOptions] = useState([
    { label: "Nhỏ", value: "small" },
    { label: "Vừa", value: "normal" },
    { label: "Lớn", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response.data);
        dispatch(categoryActions.listCategory(response.data));
      } catch (error) {
        if(error.response?.status){
          handleException(error)

        }
      }
    };
    fetchData();
  }, []);
  

  const handleDelete = async (categoryId) => {
    if (!confirmPopup()) return;
    try {
      let res = await categoryApi.delete(categoryId);
      if (res.status === 200) {
        dispatch(categoryActions.deleteCategory(categoryId));
        toast.success(res.data.message)
      }
      return;
    } catch (error) {
      if(error.response?.status){
        handleException(error)

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
        const ids = selectedCategories.map(category => category.id);
        const data = {
            ids: ids
        };
        console.log(data);
        let res = await categoryApi.deleteCategories(data);
        console.log(res);
        if (res.status === 200) {
            const updatedSelectedCategories = selectedCategories.filter(category => !ids.includes(category.id));
            setSelectedCategories(updatedSelectedCategories);
            dispatch(categoryActions.deleteCategories(ids));
            toast.success(res.data.message)
        }
        return;
    } catch (error) {
      if(error.response?.status){
        handleException(error)

      }
    }
};

  const handleConfirmDeleteSelected = () => {
    if (selectedCategories.length > 0) {
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
      toast.info("Bạn chưa chọn gì để xóa!")
    }
  };
  const handleChangeStatus= async (id)=>{
    try{
      const response=await categoryApi.updateStatus(id);
      if(response.status===200){
          dispatch(categoryActions.updateCategory(response.data));
      }
      console.log(response)
    }catch(error){
      if(error.response?.status){
        handleException(error)

      }
    }
   
  }
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Danh mục"} previousPage={"Trang chủ"} />
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
                disabled={selectedCategories.length === 0}
              />
              
              <ModalCategoryAdd />
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
            value={categoryData}
            size={size}
            selectionMode={false ? null : "checkbox"}
            selection={selectedCategories}
            onSelectionChange={(e) => setSelectedCategories(e.value)}
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
            <Column  headerStyle={{ width: "5%" }} sortable  field="id" header="Mã"></Column>
            <Column  headerStyle={{ width: "25%" }} sortable  field="name" header="Tên"></Column>
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
                      checked={rowData.status===1?true:false}
                      onChange={()=>handleChangeStatus(rowData.id)}
                    />
                  </div>
                  <ModalCategoryShow categoryId={rowData.id}/>
                  <ModalCategoryEdit categoryId={rowData.id}/>

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

export default CategoryList;
