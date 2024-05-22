import axiosInstance from "./axiosInstance"
const postApi={
    getAll(params){
        var url='posts'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='posts/'+id
        return axiosInstance.get(url)
    },
    getShow(id){
        var url='posts/'+id+'/show'
        return axiosInstance.get(url)
    },
    addPage(data){
        var url = 'posts';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return axiosInstance.post(url, data, config);
    },
    update(id,data){
        var url = 'posts/'+id;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return axiosInstance.put(url, data, config);
    },
    updateStatus(id){
        var url=`posts/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='posts/'+id
        return axiosInstance.delete(url)
    },
    deleteSliders(data){
        var url='posts/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default postApi