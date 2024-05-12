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
import sliderApi from "../../api/sliderApi";
import { sliderActions } from "../../state/actions/sliderActions";
import { validateUSlider } from "../../validate/validateSlider";
import { Image } from "primereact/image";
import appUrl from "../../api/appUrl";
function ModalSliderEdit({ categoryId }) {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const userId = useSelector(state => state.authReducer.user.id);
  const {slider} = useSelector(state => state.sliderReducers);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [oldImage,setOldImage]=useState("")
  const [errors,setErrors]=useState({});
  useEffect(() => {
    if (visible ) {
      const fetchData = async () => {
        try {
          const response = await sliderApi.get(categoryId);
          console.log('get one',response);
          if(response.status===200){
            dispatch(sliderActions.setSlider(response.data));
            setName(response.data.name)
            setOldImage(response.data.imagePath)
          }
        } catch (error) {
          handleException(error)
        }
      };
      fetchData();
    }
  }, [visible,  categoryId]);




  const handleSubmit = async () => {

    try {
      setLoading(true);

      await validateUSlider.validate({name},{abortEarly:false})
        var formData=new FormData();
        formData.append("Name",name);
        formData.append("Image",image);
        formData.append("CreatedById",userId)
        formData.append("UpdatedById",userId)
      const response = await sliderApi.update(categoryId,formData );
      console.log(response);
      if (response.status === 200) {
        dispatch(sliderActions.setSlider(response.data.data));
        setOldImage(response.data.data.imagePath)
        setImage(null)
        setPreviewImage(null)
        dispatch(sliderActions.updateSlider(response.data.data));

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
      dispatch(sliderActions.clearSlider());
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
          <div className="col-md-12">
            <label htmlFor="avatar" style={{ display: "block" }}>
              Ảnh đại diện:
            </label>
            <div style={{ overflow: "hidden" }}>
              <label
                htmlFor="avatar"
                style={{ cursor: "pointer", fontSize: 20 }}
              >
                Chọn ảnh 
              </label>
              {image!==null&&(<Button icon={PrimeIcons.REFRESH} style={{ marginLeft:5 }}
              onClick={()=>{setImage(null);setPreviewImage(null)}}
              ></Button>)}
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  float: "left",
                  width: 0,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <div style={{ float: "right" }}>
                {image===null? <Image src={appUrl.sliderURL+oldImage} width={100} preview />:
                 <Image src={previewImage} width={100} preview />
                }
              </div>
              <ShowValiMsg>{errors.image}</ShowValiMsg>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalSliderEdit;
