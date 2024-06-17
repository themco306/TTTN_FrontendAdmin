import React, { useEffect, useState } from 'react';
import ContentMain from '../../components/ContentMain';
import ContentHeader from '../../components/ContentHeader';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { InputText } from 'primereact/inputtext';
import webInfoApi from '../../api/webInfoApi';
import useCustomException from '../../helpers/useCustomException';
import { Button } from 'primereact/button';
import appUrl from '../../api/appUrl';
import { Image } from 'primereact/image';
import { PrimeIcons } from 'primereact/api';
import { validateWebInfo } from '../../validate/validateWebInfo';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { webInfoActions } from '../../state/actions/webInfoActions';

function WebInfoEdit() {
    const dispacth=useDispatch()
    const [loading,setLoading]=useState(false)
    const [errors, setErrors] = useState({});
    const [id,setId]=useState(0);
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState("");
    const [selectAvatar, setSelectAvatar] = useState(null);
    const [data, setData] = useState({
        shopName: "",
        description: "",
        phoneNumber: "",
        email: "",
        address: "",
        workingHours: "",
        facebookLink: "",
        instagramLink: "",
        twitterLink: "",
        googleMap: ""
    });
    
    const handleException = useCustomException();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await webInfoApi.getFirst();
                console.log(res)
                if (res.status === 200) {
                    const webInfoData = res.data;
                    setData(webInfoData);
                    setPreviewAvatar(webInfoData.icon)
                    setId(webInfoData.id)
                }
            } catch (error) {
                if (error.response?.status) {
                    handleException(error);
                }
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
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
      const handleSubmit = async()=>{
        try {
            setLoading(true)
            await validateWebInfo.validate( {
                shopName: data.shopName,
                email: data.email,
                phoneNumber: data.phoneNumber
              },{abortEarly:false})
            const formData=new FormData();
            formData.append("icon", avatar);
formData.append("shopName", data.shopName);
formData.append("description", data.description);
formData.append("phoneNumber", data.phoneNumber);
formData.append("email", data.email);
formData.append("address", data.address);
formData.append("workingHours", data.workingHours);
formData.append("facebookLink", data.facebookLink);
formData.append("instagramLink", data.instagramLink);
formData.append("twitterLink", data.twitterLink);
formData.append("googleMap", data.googleMap);
            const response=await webInfoApi.update(id,formData)
            if(response.status===200){
                dispacth(webInfoActions.listInfo(response.data.data))
                toast.success(response.data.message)
                setErrors({})
                setAvatar(null)
                setLoading(false)
            }
        } catch (error) {
            if (error.response?.status) {
                handleException(error);
              } else {
                const newError = {};
                error.inner?.forEach((e) => {
                  newError[e.path] = e.message;
                });
                setErrors(newError);
              }
            setLoading(false)
        }
      }
    return (
        <>
            <ContentHeader
                currentPage={"Thông tin website"}
                previousPage={"Trang chủ"}
            />
            <ContentMain>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="shopName" style={{ display: "block" }}>
                            Tên website:
                        </label>
                        <InputText
                            variant="filled"
                            id="shopName"
                            style={{ width: "100%" }}
                            name="shopName"
                            value={data.shopName}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.shopName}</ShowValiMsg>
                    </div>
                  
                    <div className='col-md-6'>
                        <label htmlFor="description" style={{ display: "block" }}>
                            Mô tả:
                        </label>
                        <InputText
                            variant="filled"
                            id="description"
                            style={{ width: "100%" }}
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.description}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="phone" style={{ display: "block" }}>
                            Điện thoại:
                        </label>
                        <InputText
                            variant="filled"
                            id="phone"
                            style={{ width: "100%" }}
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.phoneNumber}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="email" style={{ display: "block" }}>
                            Email:
                        </label>
                        <InputText
                            variant="filled"
                            id="email"
                            style={{ width: "100%" }}
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.email}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="address" style={{ display: "block" }}>
                            Địa chỉ cửa hàng:
                        </label>
                        <InputText
                            variant="filled"
                            id="address"
                            style={{ width: "100%" }}
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.address}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="workingHours" style={{ display: "block" }}>
                            Thời gian làm việc tại cửa hàng:
                        </label>
                        <InputText
                            variant="filled"
                            id="workingHours"
                            style={{ width: "100%" }}
                            name="workingHours"
                            value={data.workingHours}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.workingHours}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="facebookLink" style={{ display: "block" }}>
                            Liên kết Facebook:
                        </label>
                        <InputText
                            variant="filled"
                            id="facebookLink"
                            style={{ width: "100%" }}
                            name="facebookLink"
                            value={data.facebookLink}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.facebookLink}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="instagramLink" style={{ display: "block" }}>
                            Liên kết Instagram:
                        </label>
                        <InputText
                            variant="filled"
                            id="instagramLink"
                            style={{ width: "100%" }}
                            name="instagramLink"
                            value={data.instagramLink}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.instagramLink}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="twitterLink" style={{ display: "block" }}>
                            Liên kết Twitter:
                        </label>
                        <InputText
                            variant="filled"
                            id="twitterLink"
                            style={{ width: "100%" }}
                            name="twitterLink"
                            value={data.twitterLink}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.twitterLink}</ShowValiMsg>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="googleMap" style={{ display: "block" }}>
                            Liên kết GoogleMap:
                        </label>
                        <InputText
                            variant="filled"
                            id="googleMap"
                            style={{ width: "100%" }}
                            name="googleMap"
                            value={data.googleMap}
                            onChange={handleChange}
                        />
                        <ShowValiMsg>{errors.googleMap}</ShowValiMsg>
                    </div>
                    <div className="col-md-6">
              <label htmlFor="avatar" style={{ display: "block" }}>
                Logo website:
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
                      src={previewAvatar && appUrl.logoURL + previewAvatar}
                      width={100}
                      preview
                    />
                  )}
                </div>
              </div>
            </div>
                    <div className='col-md-12' style={{ display:'flex',justifyContent:'end' }}>
                       <Button loading={loading} label='Lưu' severity='success' onClick={handleSubmit}/>
                    </div>
                </div>
            </ContentMain>
        </>
    );
}

export default WebInfoEdit;
