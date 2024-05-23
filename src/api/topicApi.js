import axiosInstance from "./axiosInstance"
const topicApi={
    getAll(params){
        var url='topics'
        return axiosInstance.get(url,{params})
    },
    getAllActive(){
        var url='topics/active'
        return axiosInstance.get(url,)
    },
    get(id){
        var url='topics/'+id
        return axiosInstance.get(url)
    },
    getParents(id){
        var url='topics/parent/'+id
        return axiosInstance.get(url)
    },
    add(data){
        var url='topics'
        return axiosInstance.post(url,data)
    },
    update(id,data){
        var url='topics/'+id
        return axiosInstance.put(url,data)
    },
    updateStatus(id){
        var url=`topics/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='topics/'+id
        return axiosInstance.delete(url)
    },
    deleteTopics(data){
        var url='topics/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default topicApi