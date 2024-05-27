import axiosInstance from "./axiosInstance"
const contactApi={
    getAll(params){
        var url='contacts'
        return axiosInstance.get(url,{params})
    },
    get(id,params){
        var url='contacts/'+id
        return axiosInstance.get(url,{params})
    },
    getShowAll(id){
        var url='contacts/showAll/'+id
        return axiosInstance.get(url)
    },
    sendReplay(email,data){
        var url='contacts/sendReplay/'+email
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='contacts/'+id
        return axiosInstance.put(url,data)
    },
    delete(id){
        var url='contacts/'+id
        return axiosInstance.delete(url)
    },
    deleteProducts(data){
        var url='contacts/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default contactApi