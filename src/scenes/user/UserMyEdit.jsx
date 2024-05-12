import React, { useEffect, useState } from 'react'
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import appUrl from '../../api/appUrl';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { toast } from 'react-toastify';
import { userApi } from '../../api/userApi';
import { validateUUser } from '../../validate/validateUser';
import { userActions } from '../../state/actions/userActions';
import {  useNavigate } from 'react-router-dom';
import useCustomException from '../../helpers/useCustomException';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'primereact/image';
import { PrimeIcons } from 'primereact/api';
import { authActions } from '../../state/actions/authActions';

function UserMyEdit() {
    const handleException = useCustomException();
    const navigate=useNavigate()
    const userId = useSelector((state) => state.authReducer.user.id);
    const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(false);
  const [lSubmit,setLSubmit]=useState(false);
  const [errors,setErrors]=useState({})

  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const res=await userApi.get(userId);
        if(res.status===200){
          dispatch(userActions.setUser(res.data));
          setFirstname(res.data.firstName)
          setLastname(res.data.lastName)
          setUsername(res.data.userName)
          setPreviewAvatar(res.data.avatar)
          setEmail(res.data.email)
          setPhoneNumber(res.data.phoneNumber)
          setGender(res.data.gender)
          console.log(res.data)
        }
      }catch(e){
        console.error(e)
      }
    }
    fetchData()
  },[userId])
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file)
      const reader = new FileReader(); 
      reader.onload = () => {
        setSelectAvatar(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };
  const handleSubmit=async()=>{
    try{
        setLSubmit(true)
        
          await validateUUser.validate({firstname,lastname,username,password,confirmPassword,email,phoneNumber},{abortEarly:false})
  
        const data={
            firstname,
            lastname,
            username,
            email,
            password,
            confirmPassword,
            phoneNumber,
            gender,
            avatar:avatar
        }
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('phoneNumber', phoneNumber);
        formData.append('gender', gender);
        formData.append('avatar', avatar);
        const response=await userApi.myUpdate(userId,formData);
        console.log(response)
        if (response.status === 200) {
            dispatch(authActions.login(response.data.data));
            localStorage.setItem('user', JSON.stringify(response.data.data));
            setErrors({})
            setAvatar(null)
           toast.success(response.data.message);
  
          
           
        }
    }catch(error){
        console.log('ee',error)
        if (error.response?.status) {
            handleException(error);
          } else {
            const newError = {};
            error.inner?.forEach((e) => {
              newError[e.path] = e.message;
            });
            console.log(newError)
            setErrors(newError);
          }
    }finally{
        setLSubmit(false)
    }
  }
  return (
    <>
    <ContentHeader
      currentPage={"Tài Khoản Của Tôi"}
      previousPage={"Trang chủ"}
      previousPath={"/"}
    />
    <ContentMain>
      <div className="row">
        <div className="col-md-8 row">
          <div className="col-md-6">
            <label htmlFor="firstname" style={{ display: "block" }}>
              Họ:
            </label>
            <InputText
              variant="filled"
              id="firstname"
              placeholder="Nguyen "
              style={{ width: "100%" }}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <ShowValiMsg>{errors.firstname}</ShowValiMsg>
          </div>
          <div className="col-md-6">
            <label htmlFor="lastname" style={{ display: "block" }}>
              Tên:
            </label>
            <InputText
              variant="filled"
              id="lastname"
              placeholder="Khanh "
              style={{ width: "100%" }}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <ShowValiMsg>{errors.lastname}</ShowValiMsg>

          </div>
          <div className="col-md-6">
            <label htmlFor="email" style={{ display: "block" }}>
              Email:
            </label>
            <InputText
              variant="filled"
              id="email"
              placeholder="Khanh@gmail.com "
              style={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
            />
            <ShowValiMsg>{errors.email}</ShowValiMsg>

          </div>
          <div className="col-md-6">
            <label htmlFor="phone" style={{ display: "block" }}>
              Điện thoại:
            </label>
            <InputText
              variant="filled"
              id="phone"
              placeholder="0366281394"
              style={{ width: "100%" }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}

            />
            <ShowValiMsg>{errors.phoneNumber}</ShowValiMsg>

          </div>
          <div className="col-md-6">
            <label htmlFor="username" style={{ display: "block" }}>
              Tên tài khoản:
            </label>
            <InputText
              variant="filled"
              id="username"
              placeholder="Khanh113"
              style={{ width: "100%" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='username'

            />
            <ShowValiMsg>{errors.username}</ShowValiMsg>

          </div>
          <div className="col-md-6">
           

          </div>
          <div className="col-md-6">
            <label htmlFor="password" style={{ display: "block" }}>
              Mật khẩu:
            </label>
            <InputText
              id="password"
              type={showPassword ? "text" : "password"}
              style={{ width: "90%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
            />
           

            <Button
              style={{ width: "10%" }}
              onClick={() => setShowPassword(!showPassword)}
              icon={!showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
            ></Button>
             <ShowValiMsg>{errors.password}</ShowValiMsg>
          </div>
          <div className="col-md-6">
            <label htmlFor="confirmPassword" style={{ display: "block" }}>
              Nhập Lại Mật khẩu:
            </label>
            <InputText
              id="confirmPassword"
              type={showCPassword ? "text" : "password"}
              style={{ width: "90%" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <Button
              style={{ width: "10%" }}
              onClick={() => setShowCPassword(!showCPassword)}
              icon={!showCPassword ? "pi pi-eye-slash" : "pi pi-eye"}
            ></Button>
            <ShowValiMsg>{errors.confirmPassword}</ShowValiMsg>

          </div>
        </div>
        <div className="col-md-4 row">
          <div className="col-md-12">
            <label htmlFor="lastname" style={{ display: "block" }}>
              Giới tính:
            </label>
            <div className="row">
              <div
                className="col-md-4"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <RadioButton
                  inputId="genderMale"
                  name="gender"
                  value={true}
                  onChange={(e) => setGender(e.value)}
                  checked={gender}
                />
                <label htmlFor="genderMale" className="ml-2">
                  Nam
                </label>
              </div>
              <div
                className="col-md-4 "
                style={{ display: "flex", justifyContent: "center" }}
              >
                <RadioButton
                  inputId="genderFe_Male"
                  name="gender"
                  value={false}
                  onChange={(e) => setGender(e.value)}
                  checked={!gender}
                />
                <label htmlFor="genderFe_Male" className="ml-2">
                  Nữ
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12">
  <label htmlFor="avatar" style={{ display: "block" }}>
    Ảnh đại diện:
  </label>
  <div style={{ overflow: 'hidden' }}>
    <label htmlFor='avatar' style={{ cursor:'pointer',fontSize:20, }}>Chọn ảnh</label>
    {avatar!==null&&(<Button icon={PrimeIcons.REFRESH} style={{ marginLeft:5 }}
              onClick={()=>{setAvatar(null);setSelectAvatar(null)}}
              ></Button>)}
    <input type="file" id="avatar" accept="image/*" onChange={handleFileChange} style={{ float: 'left', width: 0, opacity: 0, cursor: 'pointer' }} />
    <div style={{ float: 'right' }}>
      {selectAvatar !== null ? (
        <Image src={selectAvatar} alt="Selected Avatar" width={100} preview />
      ) : (
        <Image src={previewAvatar&&(appUrl.avatarURL+previewAvatar)} width={100} preview />
      )}
    </div>
  </div>
</div>

          
        </div>
        <div
          className="col-md-12"
          style={{ display: "flex", justifyContent: "end",alignItems:'center' }}
        >
          <Button loading={lSubmit} onClick={handleSubmit} severity="success">Sửa</Button>
          

        </div>
      </div>
    </ContentMain>
  </>
  )
}

export default UserMyEdit
