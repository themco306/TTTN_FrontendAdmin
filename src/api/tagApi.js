import axiosInstance from "./axiosInstance"
const tagApi={
    getAll(params){
        var url='tags'
        return axiosInstance.get(url,{params})
    },
    updateName(id,data){
        var url='tags/'+id
        return axiosInstance.put(url,data)
    },   
     updateSort(data){
        var url='tags/sort'
        return axiosInstance.put(url,data)
    },
}
export default tagApi