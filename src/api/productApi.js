import axiosInstance from "./axiosInstance"
const productApi={
    getAll(params){
        var url='products'
        return axiosInstance.get(url,{params})
    },
    getAllPage(params){
        var url='products/page'
        return axiosInstance.get(url,{params})
    },
    get(id,params){
        var url='products/'+id
        return axiosInstance.get(url,{params})
    },
    add(data){
        var url='products'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='products/'+id
        return axiosInstance.put(url,data)
    },
    updateStatus(id){
        var url=`products/${id}/status`
        return axiosInstance.put(url)
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
export default productApi