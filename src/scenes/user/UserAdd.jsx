import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { MultiSelect } from "primereact/multiselect";
import { userApi } from "../../api/userApi";
import { Checkbox } from "primereact/checkbox";
import useCustomException from "../../helpers/useCustomException";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppRole from "../../helpers/AppRole";
import { validateCUser } from "../../validate/validateUser";
import { useDispatch } from "react-redux";

function UserAdd() {
    const handleException = useCustomException();
    const navigate=useNavigate()
    
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [datadRoles, setDataRoles] = useState([]);
  const [lDatadRoles, setLDataRoles] = useState(false);
  const [claims, setClaims] = useState([]);
  const [datadClaims, setDataClaims] = useState([]);
    const [lSubmit,setLSubmit]=useState(false);
    const [errors,setErrors]=useState({})
    const [comeBack,setComeBack]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLDataRoles(true);
        const response = await userApi.getRoles();
        console.log(response.data);
        setDataRoles(response.data);
        setLDataRoles(false);
      } catch (error) {
        console.error("Error fetching getRoles data: ", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.getClaims();
        console.log(response.data);
        setDataClaims(response.data);
      } catch (error) {
        console.error("Error fetching getRoles data: ", error);
      }
    };
    fetchData();
  }, []);


  const handleCheckBoxChange = (claimType, value) => {
    let updatedFormData = [...claims];
    let found = false;
    updatedFormData = updatedFormData.map((item) => {
      if (item.claimType === claimType) {
        found = true;
        if (item.claimValues.includes(value)) {
          item.claimValues = item.claimValues.filter((v) => v !== value);
        } else {
          item.claimValues.push(value);
        }
      }
      return item;
    });
    if (!found) {
      updatedFormData.push({
        claimType: claimType,
        claimValues: [value],
      });
    }
    setClaims(updatedFormData);
  };
  const handleSubmit=async()=>{
    try{
        setLSubmit(true)
        await validateCUser.validate({firstname,lastname,email,password,confirmPassword,phoneNumber},{abortEarly:false})
        const data={
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            phoneNumber,
            gender,
            roles:selectedRoles,
            claims:selectedRoles.includes(AppRole.Admin)?claims:[]
        }
        const response=await userApi.add(data);
        console.log(response)
        if (response.status === 200) {
            // dispatch(categoryActions.addCategory(response.data.data));
           toast.success(response.data.message);
           if(comeBack){
            navigate('/user')
           }
          
           
        }
    }catch(error){
        console.log(error)
        if (error.response?.status) {
            handleException(error);
          } else {
            const newError = {};
            error.inner.forEach((e) => {
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
             currentPage={"Thêm Tài Khoản"}
             previousPage={"Tài khoản"}
             previousPath={"/user"}
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

              />
              <ShowValiMsg>{errors.email}</ShowValiMsg>

            </div>
            <div className="col-md-6">
              <label htmlFor="password" style={{ display: "block" }}>
                Mật khẩu:
              </label>
              <InputText
                id="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                style={{ width: "90%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              

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
              <label htmlFor="role" style={{ display: "block" }}>
                Quyền:
              </label>
              <MultiSelect
                id="role"
                loading={lDatadRoles}
                value={selectedRoles}
                onChange={(e) => {
                  console.log(selectedRoles);
                  setSelectedRoles(e.value);
                }}
                options={datadRoles}
                optionLabel=""
                filter
                placeholder="Chọn quyền"
                maxSelectedLabels={3}
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-12"></div>
          </div>
          <div className="col-md-12 row">
            { selectedRoles.includes(AppRole.Admin) &&datadClaims &&
              datadClaims.map((item, index) => (
                <div className="col-md-3" key={index}>
                  <label htmlFor={item.claimType} style={{ display: "block" }}>
                    Quyền {item.claimType}:
                  </label>
                  {item.claimValues.map((value, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={value + "_" + item.claimType}
                        name={value}
                        onChange={() =>
                          handleCheckBoxChange(item.claimType, value)
                        }
                        checked={claims.some(
                          (dataItem) =>
                            dataItem.claimType === item.claimType &&
                            dataItem.claimValues.includes(value)
                        )}
                      />
                      <label
                        style={{ cursor: "pointer", userSelect: "none" }}
                        htmlFor={value + "_" + item.claimType}
                      >
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div
            className="col-md-12"
            style={{ display: "flex", justifyContent: "end",alignItems:'center' }}
          >
            <div style={{ display:'flex',alignItems:'center', marginRight: '5px'}}>
            <Checkbox id='comeBack' checked={comeBack} onChange={()=>setComeBack(!comeBack)}/>
            <label htmlFor="comeBack">Quay về danh sách khi </label>
            </div>
            <Button loading={lSubmit} onClick={handleSubmit} severity="success">Thêm</Button>
            

          </div>
        </div>
      </ContentMain>
    </>
  );
}

export default UserAdd;
