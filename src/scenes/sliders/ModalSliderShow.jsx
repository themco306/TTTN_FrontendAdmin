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
import sliderApi from '../../api/sliderApi';
import { sliderActions } from '../../state/actions/sliderActions';
import { Image } from 'primereact/image';
import appUrl from '../../api/appUrl';

function ModalSliderShow({ categoryId }) {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [visible, setVisible] = useState(false);
  const { slider } = useSelector(state => state.sliderReducers);
  const [dataLoaded1, setDataLoaded1] = useState(false); 

  useEffect(() => {
    if (visible && !dataLoaded1) {
      const fetchData = async () => {
        try {
          const response = await sliderApi.getShow(categoryId);
          console.log(response.data)
          dispatch(sliderActions.setSlider(response.data));
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

      dispatch(sliderActions.clearSlider());
      setDataLoaded1(false);

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
        header="Chi Tiết Ảnh Bìa"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={handleExit}
        footer={footerContent}
      >
          <div className='row'>
            <div className="col-md-6">
            <p><strong>Tên:</strong> {slider.name}</p>
            <p><strong>Trạng thái:</strong> {slider.status === 1 ? "Hiển thị" : "Ẩn"}</p>
            <p><strong>Ngày tạo:</strong> {new Date(slider.createdAt).toLocaleString()}</p>
            <p><strong>Người tạo:</strong> {slider.createdBy?.userName}</p>
            <p><strong>Ngày cập nhật:</strong> {new Date(slider.updatedAt).toLocaleString()}</p>
            <p><strong>Người cập nhật:</strong> {slider.updatedBy?.userName}</p>
            </div>
            <div className="col-md-6">
                <Image src={appUrl.sliderURL+slider.imagePath} width="100%" preview/>
            </div>
            
          </div>
      </Dialog>
    </div>
  );
}

export default ModalSliderShow;


