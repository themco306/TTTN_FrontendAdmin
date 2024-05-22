import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import topicApi from '../../api/topicApi';
import { topicActions } from '../../state/actions/topicActions';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import StaticData from '../../helpers/StaticData';
import { Dialog } from 'primereact/dialog';
import validateTopic from '../../validate/validateTopic';

function ModalTopicAdd() {
    const dispatch = useDispatch();
    const handleException = useCustomException();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [status,setStatus]=useState(1);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topicData = useSelector((state) => state.topicReducers.topics);
  const [loading,setLoading]=useState(false);
  const [errors,setErrors]=useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await topicApi.getAll();
        console.log(response.data);
        dispatch(topicActions.listTopic(response.data));
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
      await validateTopic.validate({name},{abortEarly:false})
      setErrors({})
        const data = {
            name: name,
            parentId: selectedTopic?.id??0,
            status:status,
        };
        var response = await topicApi.add(data);
        console.log(response);
        if (response.status === 200) {
            dispatch(topicActions.addTopic(response.data.data));
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
      header="Thêm Chủ Đề"
      visible={visible}
      maximizable
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
      footer={footerContent}
    >
      <div className="row">
      <div className="col-md-12">
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
      <div className="col-md-5">
      <label htmlFor="status" style={{ display: "block" }}>
          Trạng thái:
        </label>
        <Dropdown value={status} onChange={(e) => setStatus(e.value)} options={StaticData.statusData} id="status"   optionLabel="name" placeholder="Chọn trạng thái" 
          style={{ width: "100%" }}/>
      </div>
      <div className="col-md-7">
        <label htmlFor="cate" style={{ display: "block" }}>
          Chủ đề cha:
        </label>
        <Dropdown value={selectedTopic} onChange={(e) => setSelectedTopic(e.value)} options={[{name: 'Không có', value: null}, ...topicData]} id="cate"   optionLabel="name" placeholder="Chọn cấp cha" 
          style={{ width: "100%" }}/>
      </div>
      </div>
     
      
    </Dialog>
  </div>
  )
}

export default ModalTopicAdd
