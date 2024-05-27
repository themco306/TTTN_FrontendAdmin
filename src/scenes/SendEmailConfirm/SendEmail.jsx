import React, { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useCustomException from "../../helpers/useCustomException";
import { useAuth } from "../../auth/AuthContext";
import { Button } from "primereact/button";

function SendEmail() {
  const navigate = useNavigate();
  const handleException = useCustomException();
   const {logoutContext}=useAuth()
  const user = useSelector((state) => state.authReducer.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user !== null && user.emailConfirmed) {
      navigate("/");
    }
    if(user===null){
      navigate("/login")
    }
  }, [user,loading]);

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const currentHost = window.location.origin;
      const response = await userApi.sendEmailConfirm(
        user.id,
        currentHost + "/confirm-email"
      );
      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status) {
        handleException(error);
      }
      setLoading(false);
    }
  };
  return (
    <><ToastContainer />
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: 500,
      }}
    >
      <h2>Bạn chưa xác thực email</h2>
      <div>
        <p>
          {!loading ? (
            <span
              onClick={handleSendMail}
              style={{ color: "green", cursor: "pointer" }}
            >
              Nhấn vào đây!
            </span>
          ) : (
            <span style={{ color: "black", cursor: "pointer" }}>
              Nhấn vào đây!
              <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i>
            </span>
          )}{" "}
          để gửi liên kết về Email {user?.email}
        </p>
        <div >Hoặc <Button disabled={loading} label="Đăng xuất" onClick={()=>{ setLoading(true); logoutContext();setLoading(false)}} text/> nếu Email này không phải của bạn</div>
        
      </div>
    </div>
    </>
  );
}

export default SendEmail;
