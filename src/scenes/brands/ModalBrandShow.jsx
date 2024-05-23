import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useCustomException from '../../helpers/useCustomException';
import brandApi from '../../api/brandApi';
import { brandActions } from '../../state/actions/brandActions';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';

function ModalBrandShow({brandId}) {
    const dispatch = useDispatch();
    const handleException = useCustomException();
    const [visible, setVisible] = useState(false);
    const { brand } = useSelector(state => state.brandReducers);
    const [dataLoaded1, setDataLoaded1] = useState(false); 
  
    useEffect(() => {
      if (visible && !dataLoaded1) {
        const fetchData = async () => {
          try {
            const response = await brandApi.get(brandId);
            console.log(response.data)
            dispatch(brandActions.setBrand(response.data));
            setDataLoaded1(true);
          } catch (error) {
            if(error.response?.status){
              handleException(error)
    
            }
          }
        };
        fetchData();
      }
    }, [visible, dataLoaded1, brandId]);
  
    const handleExit = () => {
      setVisible(false);
      setTimeout(() => {
        dispatch(brandActions.clearBrand());
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
              <p><strong>Tên:</strong> {brand.name}</p>
              <p><strong>Slug:</strong> {brand.slug}</p>
              <p><strong>Trạng thái:</strong> {brand.status === 1 ? "Hiển thị" : "Ẩn"}</p>
              <p><strong>Ngày tạo:</strong> {new Date(brand.createdAt).toLocaleString()}</p>
              <p><strong>Người tạo:</strong> {brand.createdBy?.userName}</p>
              <p><strong>Ngày cập nhật:</strong> {new Date(brand.updatedAt).toLocaleString()}</p>
              <p><strong>Người cập nhật:</strong> {brand.updatedBy?.userName}</p>
            </div>
        </Dialog>
      </div>
    );
}

export default ModalBrandShow
