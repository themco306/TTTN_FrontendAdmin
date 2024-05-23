import React, { useEffect, useState } from 'react'
import useCustomException from '../../helpers/useCustomException';
import { useLocation, useNavigate } from 'react-router-dom';
import validatePage from '../../validate/validatePage';
import postApi from '../../api/postApi';
import { toast } from 'react-toastify';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import TextEditor from '../../components/TextEditor';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import StaticData from '../../helpers/StaticData';
import { pageActions } from '../../state/actions/pageActions';
import { useDispatch, useSelector } from 'react-redux';

function PageEdit() {
    const location = useLocation();
    const pageId = location.state.id;
    const handleException = useCustomException();
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const pageData = useSelector(
        (state) => state.pageReducers.page
      );
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [status, setStatus] = useState(0);
  
    const [lSubmit, setLSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [comeBack, setComeBack] = useState(true);
    useEffect(()=>{
        const fetchData =async()=>{
          try{
            const res=await postApi.get(pageId);
            if(res.status===200){
              dispatch(pageActions.setPage(res.data));
              console.log(res.data)
            }
          }catch(error){
            if(error.response?.status){
              handleException(error)
    
            }
          }
        }
        fetchData()
      },[pageId])
      useEffect(() => {
        if (pageData) {
          setName(pageData.name)
          setDetail(pageData.detail)
          setStatus(pageData.status)
        }
        
      }, [pageData]);
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
        const response = await postApi.update(pageId,formData);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          if (comeBack) {
            dispatch(pageActions.clearCategory())
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
        currentPage={"Sửa Trang Đơn"}
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
      <div className="col-md-12 mb-3">
        
        <TextEditor initData={detail} setData={setDetail}/>
        <ShowValiMsg>{errors.detail}</ShowValiMsg>

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
  )
}

export default PageEdit
