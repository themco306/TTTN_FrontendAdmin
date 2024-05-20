import axiosInstance from "./axiosInstance"
const orderApi={
    getAll(params){
        var url='orders'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='orders/'+id
        return axiosInstance.get(url)
    },
    updateStatus(id,data){
        var url=`orders/${id}`
        return axiosInstance.put(url,data)
    },
    delete(id){
        var url='products/'+id
        return axiosInstance.delete(url)
    },
    deleteProducts(data){
        var url='products/delete-multiple'
        return axiosInstance.delete(url,{data})
    }
 
}
export default orderApi