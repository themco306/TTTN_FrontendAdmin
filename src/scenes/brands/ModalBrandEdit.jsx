import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import brandApi from '../../api/brandApi';
import { brandActions } from '../../state/actions/brandActions';
import StaticData from '../../helpers/StaticData';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { toast } from 'react-toastify';
import validateBrand from '../../validate/validateBrand';

function ModalBrandEdit({brandId}) {
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const {brand} = useSelector(state => state.brandReducers);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [status,setStatus]=useState(1);
  
    const [dataLoaded1, setDataLoaded1] = useState(false); 
    const [errors,setErrors]=useState({});
    useEffect(() => {
      if (visible && !dataLoaded1) {
        const fetchData = async () => {
          try {
            const response = await brandApi.get(brandId);
            console.log('get one',response.data);
            dispatch(brandActions.setBrand(response.data));
            setDataLoaded1(true); // Đặt trạng thái đã load dữ liệu
          } catch (error) {
            handleException(error)
          }
        };
        fetchData();
      }
    }, [visible, dataLoaded1, brandId]);

    useEffect(() => {
        if (brand) {
          setName(brand.name);
          setStatus(brand.status)
         
        }
        
      }, [brand]);
    const handleSubmit = async () => {
  
      try {
        setLoading(true);
  
        await validateBrand.validate({name},{abortEarly:false})
        const data = {
          name: name,
       
          status:status,
        };
        const response = await brandApi.update(brandId, data);
        console.log(response);
        if (response.status === 200) {
          dispatch(brandActions.updateBrand(response.data.data));
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
        
        dispatch(brandActions.clearBrand());
        setDataLoaded1(false)
      }, 500);
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
    </Dialog>
  </div>
  )
}

export default ModalBrandEdit
