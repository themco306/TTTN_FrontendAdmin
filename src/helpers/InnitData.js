
import { useDispatch } from "react-redux";
import { userApi } from "../api/userApi";
import { authActions } from "../state/actions/authActions";

const fetchDataFromBackend = async () => {
  const dispatch=useDispatch()
    const user =  JSON.parse(localStorage.getItem('user'));
    if (user) {
      try {
        // Gửi yêu cầu tới backend để lấy dữ liệu người dùng
        const response = await userApi.get(user.id)
  
        if (response.status===200) {
          dispatch(authActions.login(response.data.user))

        } else {
          // Xử lý lỗi khi không thể lấy dữ liệu từ backend
          console.error('Failed to fetch user data from backend');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  export default fetchDataFromBackend;