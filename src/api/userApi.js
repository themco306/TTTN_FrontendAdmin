import axiosInstance from "./axiosInstance"
export const userApi = {
    login(data) {
        var url = 'account/signinAdmin'
        return axiosInstance.post(url, data)
    },
    sendEmailConfirm(id,data){
        var url='account/sendEmailConfirm/'+id
        return axiosInstance.post(url,data)
    },
    confirmEmail(id,data){
        var url='account/confirmEmail/'+id
        return axiosInstance.post(url,data)
    },
    getAll(params){
        var url='account'
        return axiosInstance.get(url,{params})
    },
    getAllCustomer(params){
        var url='account/customer'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='account/'+id
        return axiosInstance.get(url)
    },
    getMe(){
        var url='account/myEdit'
        return axiosInstance.get(url)
    },
    getRoles(){
        var url='account/roles'
        return axiosInstance.get(url)
    },
    getClaims(){
        var url='claims'
        return axiosInstance.get(url)
    },
    add(data){
        var url='account'
        return axiosInstance.post(url,data)
    },
    update(id, data) {
        var url = 'account/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.put(url, data, config);
    },
    myUpdate(id, data) {
        var url = 'account/my/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.put(url, data, config);
    },
    updateStatus(id){
        var url=`account/statusEmail/${id}`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='account/'+id
        return axiosInstance.delete(url)
    },
    deleteUsers(data){
        var url='account/delete-multiple'
        return axiosInstance.delete(url,{data})
    }
}