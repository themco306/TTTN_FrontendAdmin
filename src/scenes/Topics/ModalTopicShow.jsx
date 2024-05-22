import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import topicApi from '../../api/topicApi';
import { topicActions } from '../../state/actions/topicActions';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';

function ModalTopicShow({topicId}) {
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const [visible, setVisible] = useState(false);
    const { topic } = useSelector(state => state.topicReducers);
    const [dataLoaded1, setDataLoaded1] = useState(false); 
  
    useEffect(() => {
      if (visible && !dataLoaded1) {
        const fetchData = async () => {
          try {
            const response = await topicApi.get(topicId);
            console.log(response.data)
            dispatch(topicActions.setTopic(response.data));
            setDataLoaded1(true);
          } catch (error) {
            if(error.response?.status){
              handleException(error)
    
            }
          }
        };
        fetchData();
      }
    }, [visible, dataLoaded1, topicId]);
  
    const handleExit = () => {
      setVisible(false);
      setTimeout(() => {
        dispatch(topicActions.clearTopic());
        setDataLoaded1(false);
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
      </div>
    );
  return (
<div style={{ display: "inline-block" }}>
      <Button
        icon={PrimeIcons.EYE}
        label="Xem"
        raised
        rounded
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Chi Tiết  Chủ đề"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={handleExit}
        footer={footerContent}
      >
          <div>
            <p><strong>Tên:</strong> {topic.name}</p>
            <p><strong>Slug:</strong> {topic.slug}</p>
            <p><strong>Trạng thái:</strong> {topic.status === 1 ? "Hiển thị" : "Ẩn"}</p>
            <p><strong>Ngày tạo:</strong> {new Date(topic.createdAt).toLocaleString()}</p>
            <p><strong>Người tạo:</strong> {topic.createdBy?.userName}</p>
            <p><strong>Ngày cập nhật:</strong> {new Date(topic.updatedAt).toLocaleString()}</p>
            <p><strong>Người cập nhật:</strong> {topic.updatedBy?.userName}</p>
          </div>
      </Dialog>
    </div>
  )
}

export default ModalTopicShow
