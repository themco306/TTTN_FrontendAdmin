import axiosInstance from "./axiosInstance"
const menuApi={
    getAll(params){
        var url='menus'
        return axiosInstance.get(url,{params})
    },
    get(id,params){
        var url='menus/'+id
        return axiosInstance.get(url,{params})
    },
    add(data){
        var url='menus'
        return axiosInstance.post(url,data)
    },
    addCustom(data){
        var url='menus/custom'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='menus/'+id
        return axiosInstance.put(url,data)
    },
    updateStatus(id){
        var url=`menus/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='menus/'+id
        return axiosInstance.delete(url)
    },
    deleteMenus(data){
        var url='menus/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default menuApi