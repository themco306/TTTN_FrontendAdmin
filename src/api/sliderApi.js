import axiosInstance from "./axiosInstance"
const sliderApi={
    getAll(params){
        var url='sliders'
        return axiosInstance.get(url,{params})
    },
    get(id){
        var url='sliders/'+id
        return axiosInstance.get(url)
    },
    getShow(id){
        var url='sliders/'+id+'/show'
        return axiosInstance.get(url)
    },
    add(data){
        var url = 'sliders';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return axiosInstance.post(url, data, config);
    },
    update(id,data){
        var url = 'sliders/'+id;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return axiosInstance.put(url, data, config);
    },
    updateStatus(id){
        var url=`sliders/${id}/status`
        return axiosInstance.put(url)
    },
    delete(id){
        var url='sliders/'+id
        return axiosInstance.delete(url)
    },
    deleteSliders(data){
        var url='sliders/delete-multiple'
        return axiosInstance.delete(url,{data})
    }

}
export default sliderApi