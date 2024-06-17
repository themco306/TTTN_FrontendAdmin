import axiosInstance from "./axiosInstance"
const categoryApi={
    getAll(params){
        var url='categories'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='categories/'+id
        return axiosInstance.get(url)
    },
    getActive(){
        var url='categories/active'
        return axiosInstance.get(url)
    },
    getParents(id){
        var url='categories/parent/'+id
        return axiosInstance.get(url)
    },
    add(data){
        var url='categories'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='categories/'+id
        return axiosInstance.put(url,data)
    },
    updateStatus(id){
        var url=`categories/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='categories/'+id
        return axiosInstance.delete(url)
    },
    deleteCategories(data){
        var url='categories/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default categoryApi