import axiosInstance from "./axiosInstance"
const hubUserApi={
    
    getCount(){
        var url='hubUser/count'
        return axiosInstance.get(url)
    }

}
export default hubUserApi