import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import contactApi from '../../api/contactApi';
import { contactActions } from '../../state/actions/contactActions';
import { toast } from 'react-toastify';
import { validateContent } from '../../validate/validateContent';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import TextEditor from '../../components/TextEditor';
import useCustomException from '../../helpers/useCustomException';

function ContactEdit() {
    const location = useLocation();
    const contactId = location.state.id;
    const handleException = useCustomException();
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const contactData = useSelector(
        (state) => state.contactReducers.contact
      );
    const [replayContent, setReplayContent] = useState("");
  
    const [lSubmit, setLSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [comeBack, setComeBack] = useState(true);
    useEffect(()=>{
        const fetchData =async()=>{
          try{
            const res=await contactApi.get(contactId);
            if(res.status===200){
              dispatch(contactActions.setContact(res.data));
              console.log(res.data)
            }
          }catch(error){
            if(error.response?.status){
              handleException(error)
    
            }
          }
        }
        fetchData()
      },[contactId])
      useEffect(() => {
        if (contactData) {
            setReplayContent(contactData.replayContent||"")
        }
      }, [contactData]);
    const handleSendReplay= async(email)=>{
        try {
          const data={
            replayContent
          }
          await contactApi.sendReplay(email,data)
        } catch (error) {
          console.log(error)
        }
    }
    const handleSubmit = async () => {
      try {
        setLSubmit(true);
        await validateContent.validate({replayContent }, { abortEarly: false });
        
        const response = await contactApi.update(contactId,{replayContent});
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          handleSendReplay(contactData.email)
          if (comeBack) {
            navigate("/contact");
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
      currentPage={"Trả lời liên hệ"}
      previousPage={"Liên hệ"}
      previousPath={"/contact"}
    />
    <ContentMain>
      <div className="row">
        <div className="col-md-6">
            <p><strong>Họ & Tên: </strong>{contactData.name}</p>
            <p><strong>Trạng thái: </strong>{contactData.status?"Đã trả lời":"Chưa trả lời"}</p>
        </div>
        <div className="col-md-6">
        <p><strong>Số ĐT: </strong>{contactData.phone}</p>
            <p><strong>Email: </strong>{contactData.email}</p>
        </div>
        <div className="col-md-6">
            <p><strong>Ngày tạo: </strong>{new Date(contactData.createdAt).toLocaleString()}</p>
        </div>
        <div className="col-md-6">
        <p>
  <strong>Người trả lời: </strong>
  {contactData.updatedBy?.userName ? (
    <>
      <span style={{ color: 'green' }}>{contactData.updatedBy.userName}</span> lúc: <span style={{ color: 'green' }}>{new Date(contactData.updatedAt).toLocaleString()}</span>
    </>
  ) : null}
</p>
        </div>
        <div className="col-md-12">
            <p><strong>Nội dung: </strong>{contactData.content}</p>
        </div>
    <div className="col-md-12 mb-3">
        <label htmlFor="replayContent" className="form-label">Nội dung trả lời</label>
      <TextEditor initData={replayContent} setData={setReplayContent}/>
      <ShowValiMsg>{errors.replayContent}</ShowValiMsg>
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
            Trả lời
          </Button>
        </div>
      </div>
    </ContentMain>
  </>
  )
}

export default ContactEdit
