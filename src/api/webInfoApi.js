import axiosInstance from "./axiosInstance"
const webInfoApi={
    getFirst(params){
        var url='web-infos'
        return axiosInstance.get(url,{params})
    },
    update(id,data){
        var url = 'web-infos/'+id;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return axiosInstance.put(url, data, config);
    },
}
export default webInfoApi