import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCustomException from "../../helpers/useCustomException";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { validateCSlider } from "../../validate/validateSlider";
import sliderApi from "../../api/sliderApi";
import { sliderActions } from "../../state/actions/sliderActions";
import appUrl from "../../api/appUrl";
import { Image } from "primereact/image";
function ModalSliderAdd() {
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const { id } = useSelector((state) => state.authReducer.user);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await validateCSlider.validate({ name,image }, { abortEarly: false });
      setErrors({});
      var formData= new FormData()
      formData.append("Name",name)
      formData.append("Image",image)
      formData.append("CreatedById",id)
      formData.append("UpdatedById",id)
      var response = await sliderApi.add(formData);
      console.log(response);
      if (response.status === 201) {
        dispatch(sliderActions.addSlider(response.data.data));
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
        header="Thêm Ảnh Bìa"
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
              placeholder="Ảnh mùa đông"
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
                {previewImage && (
                  <Image src={previewImage} width={100} preview />
                )}
              </div>
              <ShowValiMsg>{errors.image}</ShowValiMsg>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalSliderAdd;
