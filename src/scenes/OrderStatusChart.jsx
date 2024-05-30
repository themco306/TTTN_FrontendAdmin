import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import dashboardApi from '../api/dashboardApi';
import { Dropdown } from 'primereact/dropdown';

const OrderStatusChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [timeFrame, setTimeFrame] = useState('all');
    const [loading, setLoading] = useState(false);
    const timeFrames = [
        { label: 'Hôm nay', value: 'today' },
        { label: 'Tháng này', value: 'thismonth' },
        { label: 'Từ trước đến giờ', value: 'all' }
    ];
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await dashboardApi.countStatusOrder(timeFrame);
                console.log(response);
                const data = response.data.data;

                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color');
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

                const chartData = {
                    labels: ['Chưa xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã nhận hàng', 'Đã hủy', 'Đã thanh toán online'],
                    datasets: [
                        {
                            label: 'Số lượng đơn hàng',
                            data: [
                                data.PendingUserConfirmation,
                                data.Confirmed,
                                data.Shipped,
                                data.Delivered,
                                data.Received,
                                data.Cancelled,
                                data.PaymentCompleted
                            ],
                            backgroundColor: [
                                documentStyle.getPropertyValue('--yellow-500'),
                                documentStyle.getPropertyValue('--blue-500'),
                                documentStyle.getPropertyValue('--purple-500'),
                                documentStyle.getPropertyValue('--green-500'),
                                documentStyle.getPropertyValue('--orange-500'),
                                documentStyle.getPropertyValue('--red-500'),
                                documentStyle.getPropertyValue('--cyan-500')
                            ],
                            borderColor: [
                                documentStyle.getPropertyValue('--yellow-700'),
                                documentStyle.getPropertyValue('--blue-700'),
                                documentStyle.getPropertyValue('--purple-700'),
                                documentStyle.getPropertyValue('--green-700'),
                                documentStyle.getPropertyValue('--orange-700'),
                                documentStyle.getPropertyValue('--red-700'),
                                documentStyle.getPropertyValue('--cyan-700')
                            ],
                            borderWidth: 1
                        }
                    ]
                };

                const chartOptions = {
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: textColor
                            },
                            grid: {
                                color: surfaceBorder
                            }
                        },
                        y: {
                            ticks: {
                                color: textColor
                            },
                            grid: {
                                color: surfaceBorder
                            }
                        }
                    }
                };

                setChartData(chartData);
                setChartOptions(chartOptions);
            } catch (error) {
                console.error('Failed to fetch order data:', error);
            }
        };

        fetchOrderData();
    }, [timeFrame]);

    return (
        <div className="card">
            <div style={{ display:'flex' }} className='m-2' >
                <label htmlFor="timeFrame" className="mx-2">Thời gian</label>
                    <Dropdown
                        id="timeFrame"
                        value={timeFrame}
                        options={timeFrames}
                        onChange={(e) => setTimeFrame(e.value)}
                        placeholder="Chọn mốc thời gian"
                    />
            </div>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <Chart type="bar" data={chartData} options={chartOptions} />
            )}
        </div>
    );
};

export default OrderStatusChart;
