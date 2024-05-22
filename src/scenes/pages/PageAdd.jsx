import React, { useEffect, useState } from "react";
import useCustomException from "../../helpers/useCustomException";
import { useNavigate } from "react-router-dom";
import postApi from "../../api/postApi";
import { toast } from "react-toastify";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { InputText } from "primereact/inputtext";
import ContentMain from "../../components/ContentMain";
import ContentHeader from "../../components/ContentHeader";
import StaticData from "../../helpers/StaticData";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import validatePage from "../../validate/validatePage";

function PageAdd() {
  const handleException = useCustomException();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState(0);

  const [lSubmit, setLSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [comeBack, setComeBack] = useState(true);

  const handleSubmit = async () => {
    try {
      setLSubmit(true);
      await validatePage.validate({ name, detail }, { abortEarly: false });
      var formData = new FormData();
      formData.append("Name", name);
      formData.append("Detail", detail);
      formData.append("TopicId", 0);
      formData.append("Image", "");
      formData.append("Status", status);
      const response = await postApi.addPage(formData);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        if (comeBack) {
          navigate("/page");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status) {
        handleException(error);
      } else {
        const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        console.log(newError);
        setErrors(newError);
      }
    } finally {
      setLSubmit(false);
    }
  };
  return (
    <>
      <ContentHeader
        currentPage={"Thêm Trang Đơn"}
        previousPage={"Trang đơn"}
        previousPath={"/page"}
      />
      <ContentMain>
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="name" style={{ display: "block" }}>
              Tên trang đơn:
            </label>
            <InputText
              variant="filled"
              id="name"
              placeholder=""
              style={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div
            className="col-md-12"
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "5px",
              }}
            >
              <Checkbox
                id="comeBack"
                checked={comeBack}
                onChange={() => setComeBack(!comeBack)}
              />
              <label htmlFor="comeBack">Quay về danh sách khi </label>
            </div>
            <Button loading={lSubmit} onClick={handleSubmit} severity="success">
              Thêm
            </Button>
          </div>
        </div>
      </ContentMain>
    </>
  );
}

export default PageAdd;
