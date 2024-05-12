import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../auth/AuthContext";
import { userApi } from "../../api/userApi";
import { login } from "../../state/actions/authActions";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import useCustomException from "../../helpers/useCustomException";
function Login() {
  const { loginContext } = useAuth();
  const navigate = useNavigate();
  const handleException = useCustomException();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (userData) => {
    try {
      // Gọi API đăng nhập
      const response = await userApi.login(userData);
      console.log(response);
      if (response.status == 200) {
          navigate("/");
          loginContext(response.data)
        
      }
    } catch (error) {
      if(error.response){
        handleException(error)
      }
      // console.error("Đăng nhập không thành công:", error);
      // Xử lý lỗi nếu cần
    }
  };

  // Xử lý sự kiện submit form đăng nhập
  const handleSubmit = (event) => {
    event.preventDefault();

    handleLogin({ emailOrUsername, password });
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
      
      {/* Nội dung của div */}
      <h4>Đăng Nhập Admin</h4>

      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="form2Example1"
            className="form-control"
            name="email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
          <label className="form-label" htmlFor="form2Example1">
            Email{" "}
          </label>
        </div>
        {/* Password input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="form2Example2"
            className="form-control"
          />
          <label className="form-label" htmlFor="form2Example2">
            Mật Khẩu
          </label>
        </div>
        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="form2Example31"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="form2Example31">
                Lưu đăng nhập{" "}
              </label>
            </div>
          </div>
          <div className="col">
            {/* Simple link */}
            <a href="#!">Quên mật khẩu?</a>
          </div>
        </div>
        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4"
        >
          Đăng nhập
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;
