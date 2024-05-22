import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import topicApi from '../../api/topicApi';
import { topicActions } from '../../state/actions/topicActions';
import validateTopic from '../../validate/validateTopic';
import { toast } from 'react-toastify';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { Dropdown } from 'primereact/dropdown';
import StaticData from '../../helpers/StaticData';
import { Dialog } from 'primereact/dialog';

function ModalTopicEdit({topicId}) {
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const {topic} = useSelector(state => state.topicReducers);
    const topicData = useSelector((state) => state.topicReducers.parentTopic);
    const [selectedTopic, setSelectedTopic] = useState({})
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [status,setStatus]=useState(1);
  
    const [dataLoaded1, setDataLoaded1] = useState(false); 
    const [dataLoaded2, setDataLoaded2] = useState(false); 
    const [errors,setErrors]=useState({});
    useEffect(() => {
      if (visible && !dataLoaded1) {
        const fetchData = async () => {
          try {
            const response = await topicApi.get(topicId);
            console.log('get one',response.data);
            dispatch(topicActions.setTopic(response.data));
            setDataLoaded1(true); // Đặt trạng thái đã load dữ liệu
          } catch (error) {
            handleException(error)
          }
        };
        fetchData();
      }
    }, [visible, dataLoaded1, topicId]);
  
    useEffect(() => {
      if (topic) {
        setName(topic.name);
        setStatus(topic.status)
        if(topicData){
          setSelectedTopic(topicData.find((cate) => cate.id === topic.parentId));
        }
      }
      
    }, [topic,topicData]);
  
  
    useEffect(() => {
      if (visible && !dataLoaded2) {
        const fetchData = async () => {
          try {
            const response = await topicApi.getParents(topicId);
            console.log('pảent',response.data);
            dispatch(topicActions.listParentTopic(response.data));
           
            setDataLoaded2(true); // Đặt trạng thái đã load dữ liệu
          } catch (error) {
            if(error.response?.status){
              handleException(error)
    
            }
          }
        };
        fetchData();
      }
    }, [visible, dataLoaded2, topicId]);
  
    const handleSubmit = async () => {
  
      try {
        setLoading(true);
  
        await validateTopic.validate({name},{abortEarly:false})
        const data = {
          name: name,
          parentId: parseInt(selectedTopic?.id)??0,
          status:status,
        };
        const response = await topicApi.update(topicId, data);
        console.log(response);
        if (response.status === 200) {
          dispatch(topicActions.updateTopic(response.data.data));
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
        
        dispatch(topicActions.clearTopic());
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
        header="Sửa Chủ đề"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={handleExit}
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
            onChange={(e) => setName(e.target.value)}
          />
           <ShowValiMsg>{errors.name}</ShowValiMsg>
          </div>
          <div className="col-md-5">
        <label htmlFor="description" style={{ display: "block" }}>
            Chủ đề cha:
          </label>
          <Dropdown value={status} onChange={(e) => setStatus(e.value)} options={StaticData.statusData}   optionLabel="name" placeholder="Chọn cấp cha" 
            style={{ width: "100%" }}/>
        </div>
        <div className="col-md-7">
            <label htmlFor="description" style={{ display: "block" }}>
              Danh mục cha:
            </label>
            <Dropdown
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.value)}
              options={[
                { name: "Không có", value: null },
                ...topicData,
              ]}
              optionLabel="name"
              placeholder="Chọn cấp cha"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ModalTopicEdit
