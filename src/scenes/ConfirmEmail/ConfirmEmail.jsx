import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { userApi } from '../../api/userApi';
import useCustomException from '../../helpers/useCustomException';
import { authActions } from '../../state/actions/authActions';
import { useAuth } from '../../auth/AuthContext';
import { Button } from 'primereact/button';

function ConfirmEmail() {
    const navigate = useNavigate();
    const {logoutContext}=useAuth()
    const handleException = useCustomException();
    const { userId, confirmEmailToken } = useParams();
    const [loading,setLoading]=useState(false)
    const user = useSelector((state) => state.authReducer.user);
    let decodedToken = decodeURIComponent(confirmEmailToken);
    useEffect(() => {
        if(user!==null&&(user.id!==userId)){
            toast.error("Liên kết này không phù hợp với tài khoản của bạn")
            navigate("/")
        }
       
      }, [user,userId]);
      const handleConfirm=async ()=>{
        try {
            setLoading(true)
            const response=await userApi.confirmEmail(userId,decodedToken)
            console.log(response)
            if(response.status===200){
                toast.success(response.data.message)
                setTimeout(() => {
                    logoutContext(); // Perform any logout actions if needed
                    setLoading(false); // Set loading state to false if needed
                    navigate("/login"); // Redirect to login page after 3 seconds
                  }, 3000); // 3000 milliseconds = 3 seconds
            }
        } catch (error) {
            if(error.response.status){
                handleException(error)
            }
            setLoading(false)

        }
      }
   
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
     <Button loading={loading} onClick={handleConfirm}>Nhấn vào để xác thực</Button>
    </div>
    </>
  )
}

export default ConfirmEmail
