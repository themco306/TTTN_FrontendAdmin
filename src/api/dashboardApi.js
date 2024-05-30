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
    }
    

}
export default dashboardApi