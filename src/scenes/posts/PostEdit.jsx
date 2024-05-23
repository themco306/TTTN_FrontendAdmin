import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useCustomException from '../../helpers/useCustomException';
import { useDispatch, useSelector } from 'react-redux';
import topicApi from '../../api/topicApi';
import { topicActions } from '../../state/actions/topicActions';
import { validateUPost } from '../../validate/validatePost';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import StaticData from '../../helpers/StaticData';
import ShowValiMsg from '../../validate/ShowValiMsg';
import TextEditor from '../../components/TextEditor';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { toast } from 'react-toastify';
import postApi from '../../api/postApi';
import { pageActions } from '../../state/actions/pageActions';
import { PrimeIcons } from 'primereact/api';
import appUrl from '../../api/appUrl';

function PostEdit() {
    const location = useLocation();
    const pageId = location.state.id;
    const handleException = useCustomException();
    const navigate = useNavigate();
const dispatch=useDispatch()
const pageData = useSelector(
    (state) => state.pageReducers.page
  );
const topicData = useSelector(
    (state) => state.topicReducers.topics
  );
const [name, setName] = useState("");
const [detail, setDetail] = useState("");
const [status, setStatus] = useState(0);
const [image, setImage] = useState(null);
const [selectedTopic, setSelectedTopic] = useState(null);
const [previewImage, setPreviewImage] = useState("");
const [oldImage,setOldImage]=useState("")
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
    const fetchData = async () => {
      try {
        const response = await topicApi.getAll();
        console.log(response.data);
        dispatch(topicActions.listTopic(response.data));
      } catch (error) {
        if(error.response?.status){
          handleException(error)

        }
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (pageData) {
      setName(pageData.name)
      setDetail(pageData.detail)
      setOldImage(pageData.imagePath)
      setStatus(pageData.status)
      if(topicData){
        setSelectedTopic(topicData.find((cate) => cate.id === pageData.topicId));
      }
    }
    
  }, [pageData,topicData]);
const handleSubmit = async () => {
  try {
    setLSubmit(true);
    await validateUPost.validate({ name, detail }, { abortEarly: false });
    var formData = new FormData();
    formData.append("Name", name);
    formData.append("Detail", detail);
    formData.append("TopicId", selectedTopic===null?0:selectedTopic.id);
    formData.append("Image", image);
    formData.append("Status", status);
    const response = await postApi.update(pageId,formData);
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data.message);
      if (comeBack) {
        dispatch(pageActions.clearCategory())
        navigate("/post");
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
    <>
    <ContentHeader
      currentPage={"Sửa Bài viết"}
      previousPage={"Bài viết"}
      previousPath={"/post"}
    />
    <ContentMain>
      <div className="row">
        <div className="col-md-8">
          <label htmlFor="name" style={{ display: "block" }}>
            Tên bài viết:
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
    <div className="col-md-5 mb-2">
        <label htmlFor="cate" style={{ display: "block" }}>
          Chủ đề:
        </label>
        <Dropdown value={selectedTopic} onChange={(e) => setSelectedTopic(e.value)} options={[{name: 'Không có', value: null}, ...topicData]} id="cate"   optionLabel="name" placeholder="Chọn chủ đề" 
          style={{ width: "100%" }}/>
      </div>
      <div className="col-md-7 mb-2">
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
                {image===null? <Image src={appUrl.postUrl+oldImage} width={100} preview />:
                 <Image src={previewImage} width={100} preview />
                }
              </div>
              <ShowValiMsg>{errors.image}</ShowValiMsg>
            </div>
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

export default PostEdit
