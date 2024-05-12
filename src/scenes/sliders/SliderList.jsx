import React, { useEffect, useRef, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { InputSwitch } from "primereact/inputswitch";
import { useDispatch, useSelector } from "react-redux";
import {  confirmPopup } from "primereact/confirmpopup";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";
import useCustomException from "../../helpers/useCustomException";
import sliderApi from "../../api/sliderApi";
import { sliderActions } from "../../state/actions/sliderActions";
import { Image } from "primereact/image";
import appUrl from "../../api/appUrl";
import ModalSliderAdd from "./ModalSliderAdd";
import ModalSliderEdit from "./ModalSliderEdit";
import ModalSliderShow from "./ModalSliderShow";
function SliderList() {
  const sliderData = useSelector(
    (state) => state.sliderReducers.sliders
  );
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [selectedSliders,setSelectedSliders]=useState([]);
  const [sizeOptions] = useState([
    { label: "Nhỏ", value: "small" },
    { label: "Vừa", value: "normal" },
    { label: "Lớn", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sliderApi.getAll();
        console.log(response.data);
        dispatch(sliderActions.listSlider(response.data));
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
      let res = await sliderApi.delete(categoryId);
      if (res.status === 200) {
        dispatch(sliderActions.deleteSlider(categoryId));
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
        const ids = selectedSliders.map(category => category.id);
        const data = {
            ids: ids
        };
        console.log(data);
        let res = await sliderApi.deleteSliders(data);
        console.log(res);
        if (res.status === 200) {
            const updatedSelected= selectedSliders.filter(category => !ids.includes(category.id));
            setSelectedSliders(updatedSelected);
            dispatch(sliderActions.deleteSliders(ids));
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
    if (selectedSliders.length > 0) {
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
      const response=await sliderApi.updateStatus(id);
      if(response.status===200){
        dispatch(sliderActions.updateStatus(id));
      }
    }catch(error){
      if(error.response?.status){
        handleException(error)

      }
    }
   
  }
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Hình ảnh bìa"} previousPage={"Trang chủ"} />
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
                disabled={selectedSliders.length === 0}
              />
              
              <ModalSliderAdd />
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
            value={sliderData}
            size={size}
            selectionMode={false ? null : "checkbox"}
            selection={selectedSliders}
            onSelectionChange={(e) => setSelectedSliders(e.value)}
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
            <Column  headerStyle={{ width: "25%" }} sortable   header="Hình ảnh" body={(rowData)=>(
              <Image src={(appUrl.sliderURL+rowData.imagePath)} alt="Image" width="100" preview />
            )}></Column>
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
                  <ModalSliderShow categoryId={rowData.id}/>
                  <ModalSliderEdit categoryId={rowData.id}/>

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

export default SliderList;
