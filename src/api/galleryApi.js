import axiosInstance from "./axiosInstance"

const galleryApi = {
    getByProductId(id) {
        var url = 'galleries/' + id;
        return axiosInstance.get(url);
    },
    add(id, data) {
        var url = 'galleries/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.post(url, data, config);
    },
    update(id, data) {
        var url = 'galleries/' + id;
        // Thiết lập tiêu đề 'Content-Type' là 'multipart/form-data' cho yêu cầu POST
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // Gửi yêu cầu POST với tiêu đề mới được cấu hình
        return axiosInstance.put(url, data, config);
    }
};

export default galleryApi;
