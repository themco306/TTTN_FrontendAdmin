import axiosInstance from "./axiosInstance"
const brandApi={
    getAll(params){
        var url='brands'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='brands/'+id
        return axiosInstance.get(url)
    },
    add(data){
        var url='brands'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='brands/'+id
        return axiosInstance.put(url,data)
    },
    updateStatus(id){
        var url=`brands/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='brands/'+id
        return axiosInstance.delete(url)
    },
    deleteBrands(data){
        var url='brands/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default brandApi