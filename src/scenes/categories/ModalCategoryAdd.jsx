import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import categoryApi from "../../api/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import {  categoryActions } from "../../state/actions/categoryActions";
import { toast } from "react-toastify";
import useCustomException from "../../helpers/useCustomException";
import StaticData from "../../helpers/StaticData";
import * as Yup from 'yup';
import ShowValiMsg from "../../validate/ShowValiMsg";
import validateCategory from "../../validate/validateCategory";

function ModalCategoryAdd() {
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const { id } = useSelector(state => state.authReducer.user);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status,setStatus]=useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryData = useSelector((state) => state.categoryReducers.categories);
  const [loading,setLoading]=useState(false);
  const [errors,setErrors]=useState({});
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
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await validateCategory.validate({name,description},{abortEarly:false})
      setErrors({})
        const data = {
            name: name,
            description: description,
            parentId: selectedCategory?.id,
            status:status,
            createdById: id,
            updatedById: id
        };
        var response = await categoryApi.add(data);
        console.log(response);
        if (response.status === 201) {
            dispatch(categoryActions.addCategory(response.data.data));
           toast.success(response.data.message);
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

    } finally {
        setLoading(false);
    }
};



  const footerContent = (
    <div>
      <Button
        label="Thoát"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Thêm"
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
        icon={PrimeIcons.PLUS}
        label="Thêm"
        severity="success"
        raised
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Thêm Danh Mục"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
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
            onChange={(e)=>setName(e.target.value)}
          />
          <ShowValiMsg>{errors.name}</ShowValiMsg>
        </div>
        <div className="col-md-4">
        <label htmlFor="status" style={{ display: "block" }}>
            Trạng thái:
          </label>
          <Dropdown value={status} onChange={(e) => setStatus(e.value)} options={StaticData.statusData} id="status"   optionLabel="name" placeholder="Chọn trạng thái" 
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
            onChange={(e)=>setDescription(e.target.value)}
          />
          <ShowValiMsg>{errors.description}</ShowValiMsg>
        </div>
        <div className="col-md-4">
          <label htmlFor="cate" style={{ display: "block" }}>
            Danh mục cha:
          </label>
          <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={[{name: 'Không có', value: null}, ...categoryData]} id="cate"   optionLabel="name" placeholder="Chọn cấp cha" 
            style={{ width: "100%" }}/>
        </div>
        </div>
        
      </Dialog>
    </div>
  );
}

export default ModalCategoryAdd;
