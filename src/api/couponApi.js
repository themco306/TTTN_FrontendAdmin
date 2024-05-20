import axiosInstance from "./axiosInstance"
const couponApi={
    getAll(params){
        var url='coupons'
        return axiosInstance.get(url,{params})
    },
    get(id,params){
        var url='coupons/'+id
        return axiosInstance.get(url,{params})
    },
    getShowAll(id){
        var url='coupons/showAll/'+id
        return axiosInstance.get(url)
    },
    add(data){
        var url='coupons'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='coupons/'+id
        return axiosInstance.put(url,data)
    },
    updateStatus(id){
        var url=`coupons/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='coupons/'+id
        return axiosInstance.delete(url)
    },
    deleteProducts(data){
        var url='coupons/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default couponApi