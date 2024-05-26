import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCustomException from "../../helpers/useCustomException";
import { useDispatch, useSelector } from "react-redux";
import menuApi from "../../api/menuApi";
import { menuActions } from "../../state/actions/menuActions";
import validateMenu from "../../validate/validateMenu";
import { toast } from "react-toastify";
import ContentHeader from "../../components/ContentHeader";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import StaticData from "../../helpers/StaticData";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { InputText } from "primereact/inputtext";
import ContentMain from "../../components/ContentMain";
import { InputNumber } from "primereact/inputnumber";

function MenuEdit() {
  const location = useLocation();
  const menuId = location.state.id;
  const handleException = useCustomException();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuData = useSelector((state) => state.menuReducers.menu);
//   const parentData = useSelector((state) => state.menuReducers.menus);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState("");
  const [sortOrder, setsortOrder] = useState(0);
  const [parent, setParent] = useState(null);
  const [parentData, setParentData] = useState([]);
  const [status, setStatus] = useState(0);

  const [lSubmit, setLSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [comeBack, setComeBack] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await menuApi.get(menuId);
        if (res.status === 200) {
          dispatch(menuActions.setMenu(res.data));
          console.log(res.data);
        }
      } catch (error) {
        if (error.response?.status) {
          handleException(error);
        }
      }
    };
    fetchData();
  }, [menuId]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await menuApi.getParents(menuId);
          console.log('pảent',response.data);
          setParentData(response.data)
        } catch (error) {
          if(error.response?.status){
            handleException(error)
  
          }
        }
      };
      fetchData();
  }, [menuId]);
  useEffect(() => {
    if (menuData) {
      setName(menuData.name);
      setLink(menuData.link);
      setPosition(menuData.position);
      setsortOrder(menuData.sortOrder);
    
      setStatus(menuData.status);
      if(parentData){
          setParent(parentData.find((cate) => cate.id === menuData.parent?.id));
      }
    }
  }, [menuData,parentData]);
  const handleSubmit = async () => {
    try {
      setLSubmit(true);
      await validateMenu.validate({ name, link }, { abortEarly: false });
      const data = {
        position,
        name,
        link,
        sortOrder,
        status,
        parentId:parent!==null?parent?.id:null
      };
      const response = await menuApi.update(menuId, data);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        if (comeBack) {
          // dispatch(menuActions())
          navigate("/menu");
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
        currentPage={"Sửa Menu"}
        previousPage={"Menu"}
        previousPath={"/menu"}
      />
      <ContentMain>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name" style={{ display: "block" }}>
              Tên:
            </label>
            <InputText
              variant="filled"
              id="name"
              disabled={menuData.type!=="custom"}
              placeholder=""
              style={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ShowValiMsg>{errors.name}</ShowValiMsg>
          </div>
          <div className="col-md-6">
            <label htmlFor="link" style={{ display: "block" }}>
              Liên kết:
            </label>
            <InputText
              variant="filled"
              id="link"
              disabled={menuData.type!=="custom"}

              placeholder=""
              style={{ width: "100%" }}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <ShowValiMsg>{errors.link}</ShowValiMsg>
          </div>
          <div className="col-md-6">
            <label htmlFor="position" style={{ display: "block" }}>
            Vị trí:
            </label>
            <Dropdown
              value={position}
              onChange={(e) => setPosition(e.value)}
              options={[
                { name: "Menu chính", value: "mainmenu" },
                { name: "Menu cuối trang", value: "footermenu" },
              ]}
              id="position"
              optionLabel="name"
              placeholder="Chọn vị trí"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="sortOrder" style={{ display: "block" }}>
              Sắp xếp: <span>từ nhỏ đến lớn</span>
            </label>
              <InputNumber value={sortOrder} onValueChange={(e)=>setsortOrder(e.value)} required/>
          </div>
          <div className="col-md-6">
            <label htmlFor="parent" style={{ display: "block" }}>
              Cấp cha:
            </label>
            <Dropdown
            loading={parentData.length===0}
              value={parent}
              onChange={(e) => setParent(e.value)}
              options={parentData}
              id="parent"
              optionLabel="name"
              placeholder="Chọn cấp cha"
              style={{ width: "100%" }}
              filter
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="status" style={{ display: "block" }}>
              Trạng thái:
            </label>
            <Dropdown
              value={status}
              onChange={(e) => setStatus(e.value)}
              options={StaticData.statusData}
              id="status"
              optionLabel="name"
              placeholder="Chọn trạng thái"
              style={{ width: "100%" }}
            />
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
              Sửa
            </Button>
          </div>
        </div>
      </ContentMain>
    </>
  );
}

export default MenuEdit;
