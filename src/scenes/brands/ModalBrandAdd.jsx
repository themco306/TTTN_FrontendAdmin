import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import brandApi from '../../api/brandApi';
import { brandActions } from '../../state/actions/brandActions';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import StaticData from '../../helpers/StaticData';
import { Dropdown } from 'primereact/dropdown';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { Dialog } from 'primereact/dialog';
import validateBrand from '../../validate/validateBrand';

function ModalBrandAdd() {
    const dispatch = useDispatch();
    const handleException = useCustomException();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [status,setStatus]=useState(1);
  const [loading,setLoading]=useState(false);
  const [errors,setErrors]=useState({});
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await validateBrand.validate({name},{abortEarly:false})
      setErrors({})
        const data = {
            name: name,
            status:status,
        };
        console.log(data)
        var response = await brandApi.add(data);
        console.log(response);
        if (response.status === 200) {
            dispatch(brandActions.addBrand(response.data.data));
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
      header="Thêm Thương hiệu"
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
          placeholder="Nhật Bản"
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
      
    </Dialog>
  </div>
  )
}

export default ModalBrandAdd
