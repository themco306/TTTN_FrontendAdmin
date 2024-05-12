import React, { useEffect, useState } from 'react'
import categoryApi from '../../api/categoryApi';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import { categoryActions } from '../../state/actions/categoryActions';
import useCustomException from '../../helpers/useCustomException';

function ModalCategoryShow({ categoryId }) {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [visible, setVisible] = useState(false);
  const { category } = useSelector(state => state.categoryReducers);
  const [dataLoaded1, setDataLoaded1] = useState(false); 

  useEffect(() => {
    if (visible && !dataLoaded1) {
      const fetchData = async () => {
        try {
          const response = await categoryApi.get(categoryId);
          console.log(response.data)
          dispatch(categoryActions.setCategory(response.data));
          setDataLoaded1(true);
        } catch (error) {
          if(error.response?.status){
            handleException(error)
  
          }
        }
      };
      fetchData();
    }
  }, [visible, dataLoaded1, categoryId]);

  const handleExit = () => {
    setVisible(false);
    setTimeout(() => {
      dispatch(categoryActions.clearCategory());
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
        header="Chi Tiết Danh Mục"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={handleExit}
        footer={footerContent}
      >
          <div>
            <p><strong>Tên:</strong> {category.name}</p>
            <p><strong>Slug:</strong> {category.slug}</p>
            <p><strong>Mô tả:</strong> {category.description}</p>
            <p><strong>Trạng thái:</strong> {category.status === 1 ? "Hiển thị" : "Ẩn"}</p>
            <p><strong>Ngày tạo:</strong> {new Date(category.createdAt).toLocaleString()}</p>
            <p><strong>Người tạo:</strong> {category.createdBy?.userName}</p>
            <p><strong>Ngày cập nhật:</strong> {new Date(category.updatedAt).toLocaleString()}</p>
            <p><strong>Người cập nhật:</strong> {category.updatedBy?.userName}</p>
          </div>
      </Dialog>
    </div>
  );
}

export default ModalCategoryShow;


