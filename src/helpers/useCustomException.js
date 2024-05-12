import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';

function useCustomException() {
    const { logoutContext } = useAuth();

    const handleException = (error) => {
        switch (error.response.status) {
            case 401:
                toast.error(error.response.data.error);
                logoutContext();
                break;
            case 403:
                if(!error.response.data){
                    toast.warn('Bạn không có quyền làm điều này!!')
                }else{
                    toast.warn(error.response.data.error)
                }
                break;
            default:
                toast.error(error.response.data.error);
                break;
        }
        console.error("Error:", error);
    };

    return handleException;
}

export default useCustomException;
