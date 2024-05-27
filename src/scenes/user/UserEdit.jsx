import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { InputText } from "primereact/inputtext";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { useLocation, useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { userActions } from "../../state/actions/userActions";
import useCustomException from "../../helpers/useCustomException";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import appUrl from "../../api/appUrl";
import { MultiSelect } from "primereact/multiselect";
import AppRole from "../../helpers/AppRole";
import { toast } from "react-toastify";
import { validateUUser } from "../../validate/validateUser";
import { Image } from "primereact/image";
import { PrimeIcons } from "primereact/api";

function UserEdit() {
  const handleException = useCustomException();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.id;
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
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [datadRoles, setDataRoles] = useState([]);
  const [lDatadRoles, setLDataRoles] = useState(false);
  const [claims, setClaims] = useState([]);
  const [datadClaims, setDataClaims] = useState([]);
  const [lSubmit, setLSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [comeBack, setComeBack] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.get(userId);
        if (res.status === 200) {
          dispatch(userActions.setUser(res.data));
          setFirstname(res.data.firstName);
          setLastname(res.data.lastName);
          setUsername(res.data.userName);
          setPreviewAvatar(res.data.avatar);
          setEmail(res.data.email);
          setPhoneNumber(res.data.phoneNumber);
          setGender(res.data.gender);
          setSelectedRoles(res.data.roles);
          setClaims(res.data.claims);
          console.log(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [userId]);
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
    console.log(claims);
    setClaims(updatedFormData);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    try {
      setLSubmit(true);

      await validateUUser.validate(
        {
          firstname,
          lastname,
          username,
          password,
          confirmPassword,
          email,
          phoneNumber,
        },
        { abortEarly: false }
      );
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("avatar", avatar);
      selectedRoles.forEach((role) => {
        formData.append("roles", role);
      });
      if (selectedRoles.includes(AppRole.Admin)) {
        claims.forEach((claim, index) => {
          formData.append(`claims[${index}][claimType]`, claim.claimType);
          claim.claimValues.forEach((value, valueIndex) => {
            formData.append(
              `claims[${index}][claimValues][${valueIndex}]`,
              value
            );
          });
        });
      } else {
        formData.append("claims", null);
      }
      const response = await userApi.update(userId, formData);
      console.log(response);
      if (response.status === 200) {
        // dispatch(categoryActions.addCategory(response.data.data));
        setErrors({})
        setAvatar(null)
        toast.success(response.data.message);
        if (comeBack) {
          navigate("/user");
        }
      }
    } catch (error) {
      console.log("ee", error);
      if (error.response?.status) {
        handleException(error);
      } else {
        const newError = {};
        error.inner?.forEach((e) => {
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
        currentPage={"Sửa Tài Khoản"}
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
              />
              <ShowValiMsg>{errors.username}</ShowValiMsg>
            </div>
            <div className="col-md-6"></div>
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
              <div style={{ overflow: "hidden" }}>
                <label
                  htmlFor="avatar"
                  style={{ cursor: "pointer", fontSize: 20 }}
                >
                  Chọn ảnh
                </label>
                {avatar!==null&&(<Button icon={PrimeIcons.REFRESH} style={{ marginLeft:5 }}
              onClick={()=>{setAvatar(null);setSelectAvatar(null)}}
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
                  {selectAvatar !== null ? (
                    <Image
                      src={selectAvatar}
                      alt="Selected Avatar"
                      width={100}
                      preview
                    />
                  ) : (
                    <Image
                      src={previewAvatar && appUrl.avatarURL + previewAvatar}
                      width={100}
                      preview
                    />
                  )}
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
          </div>
          <div className="col-md-12 row">
            {selectedRoles.includes(AppRole.Admin) &&
              datadClaims &&
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

export default UserEdit;
