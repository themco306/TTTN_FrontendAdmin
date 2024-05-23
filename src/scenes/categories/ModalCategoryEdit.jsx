import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import categoryApi from "../../api/categoryApi";
import { toast } from "react-toastify";
import StaticData from "../../helpers/StaticData";
import { categoryActions } from "../../state/actions/categoryActions";
import useCustomException from "../../helpers/useCustomException";
import validateCategory from "../../validate/validateCategory";
import ShowValiMsg from "../../validate/ShowValiMsg";
function ModalCategoryEdit({ categoryId }) {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const userId = useSelector(state => state.authReducer.user.id);
  const {category} = useSelector(state => state.categoryReducers);
  const categoryData = useSelector((state) => state.categoryReducers.parentCate);
  const [selectedCategory, setSelectedCategory] = useState({})
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status,setStatus]=useState(1);

  const [dataLoaded1, setDataLoaded1] = useState(false); 
  const [dataLoaded2, setDataLoaded2] = useState(false); 
  const [errors,setErrors]=useState({});
  useEffect(() => {
    if (visible && !dataLoaded1) {
      const fetchData = async () => {
        try {
          const response = await categoryApi.get(categoryId);
          console.log('get one',response.data);
          dispatch(categoryActions.setCategory(response.data));
          setDataLoaded1(true); // Đặt trạng thái đã load dữ liệu
        } catch (error) {
          handleException(error)
        }
      };
      fetchData();
    }
  }, [visible, dataLoaded1, categoryId]);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setStatus(category.status)
      if(categoryData){
        setSelectedCategory(categoryData.find((cate) => cate.id === category.parentId));
      }
    }
    
  }, [category,categoryData]);


  useEffect(() => {
    if (visible && !dataLoaded2) {
      const fetchData = async () => {
        try {
          const response = await categoryApi.getParents(categoryId);
          console.log('pảent',response.data);
          dispatch(categoryActions.listParentCategory(response.data));
         
          setDataLoaded2(true); // Đặt trạng thái đã load dữ liệu
        } catch (error) {
          if(error.response?.status){
            handleException(error)
  
          }
        }
      };
      fetchData();
    }
  }, [visible, dataLoaded2, categoryId]);

  const handleSubmit = async () => {

    try {
      setLoading(true);

      await validateCategory.validate({name,description},{abortEarly:false})
      const data = {
        name: name,
        description: description,
        parentId: parseInt(selectedCategory?.id),
        status:status,
        createdById: userId,
        updatedById: userId,
      };
      const response = await categoryApi.update(category.id, data);
      console.log(response);
      if (response.status === 201) {
        dispatch(categoryActions.updateCategory(response.data.data));
        toast.success(response.data.message)
      }
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      } else {
        const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        setErrors(newError);
      }
    }
    setLoading(false);
  };
  const handleExit = () => {
    setVisible(false);
    setTimeout(() => {
      
      dispatch(categoryActions.clearCategory());
      setDataLoaded1(false);
      setDataLoaded2(false);
    }, 500);
  };
  
  const footerContent = (
    <div>
      <Button
        label="Thoát"
        icon="pi pi-times"
        onClick={handleExit}
        className="p-button-text"
      />
      <Button
        label="Sửa"
        icon="pi pi-check"
        onClick={handleSubmit}
        autoFocus
        loading={loading}
      />
    </div>
  );
  
  return (
    <div style={{ display: "inline-block" }}>
      <Button
        icon={PrimeIcons.USER_EDIT}
        label="Sửa"
        raised
        rounded
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Sửa Danh Mục"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={handleExit}
        footer={footerContent}
      >
         <div className="row">
        <div className="col-md-8">
          <label htmlFor="name" style={{ display: "block" }}>
            Tên:
          </label>
          <InputText
            variant="filled"
            id="name"
            placeholder="One piece"
            style={{ width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <ShowValiMsg>{errors.name}</ShowValiMsg>
          </div>
          <div className="col-md-4">
        <label htmlFor="description" style={{ display: "block" }}>
            Trạng thái:
          </label>
          <Dropdown value={status} onChange={(e) => setStatus(e.value)} options={StaticData.statusData}   optionLabel="name" placeholder="Chọn cấp cha" 
            style={{ width: "100%" }}/>
        </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="description" style={{ display: "block" }}>
              Mô tả:
            </label>
            <InputTextarea
              variant="filled"
              id="description"
              placeholder="One piece"
              style={{ width: "100%" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
             <ShowValiMsg>{errors.description}</ShowValiMsg>
          </div>
          <div className="col-md-4">
            <label htmlFor="description" style={{ display: "block" }}>
              Danh mục cha:
            </label>
            <Dropdown
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.value)}
              options={[
                { name: "Không có", value: null },
                ...categoryData,
              ]}
              optionLabel="name"
              placeholder="Chọn cấp cha"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalCategoryEdit;
