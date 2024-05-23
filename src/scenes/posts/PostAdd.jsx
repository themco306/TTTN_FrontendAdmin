import React, { useEffect, useState } from 'react'
import useCustomException from '../../helpers/useCustomException';
import { useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
import { toast } from 'react-toastify';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { Dropdown } from 'primereact/dropdown';
import TextEditor from '../../components/TextEditor';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import StaticData from '../../helpers/StaticData';

import { Image } from 'primereact/image';
import { validateCPost } from '../../validate/validatePost';
import topicApi from '../../api/topicApi';
import { topicActions } from '../../state/actions/topicActions';
import { useDispatch, useSelector } from 'react-redux';


function PostAdd() {
    const handleException = useCustomException();
        const navigate = useNavigate();
    const dispatch=useDispatch()
    const topicData = useSelector(
        (state) => state.topicReducers.topics
      );
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [status, setStatus] = useState(0);
    const [image, setImage] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
    const [lSubmit, setLSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [comeBack, setComeBack] = useState(true);
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
    const handleSubmit = async () => {
      try {
        setLSubmit(true);
        await validateCPost.validate({ name, detail,image }, { abortEarly: false });
        var formData = new FormData();
        formData.append("Name", name);
        formData.append("Detail", detail);
        formData.append("TopicId", selectedTopic===null?0:selectedTopic.id);
        formData.append("Image", image);
        formData.append("Status", status);
        const response = await postApi.addPost(formData);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          if (comeBack) {
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
      currentPage={"Thêm Bài viết"}
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
            Thêm
          </Button>
        </div>
      </div>
    </ContentMain>
  </>
  )
}

export default PostAdd
