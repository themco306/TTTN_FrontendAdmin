
import axiosInstance from "./axiosInstance"
const dashboardApi={
    getNewUser(){
        var url='account/newUser'
        return axiosInstance.get(url,)
    },
    countStatusOrder(timeFrame) {
        const url = 'orders/countStatus';
        return axiosInstance.get(url, { params: { timeFrame } });
    },
    summaryOrder(datetimeQuery) {
        const url = 'orders/summary';
        return axiosInstance.get(url, { params: datetimeQuery });
    },
    sendMessage(data){
        var url='notifications/send-message'
        return axiosInstance.post(url,data)
    },
    checkRead(data){
        var url='notifications/mark-as-read'
        return axiosInstance.post(url,data)
    },
    isRead(data){
        var url='notifications/is-read'
        return axiosInstance.post(url,data)
    }

    

}
export default dashboardApi