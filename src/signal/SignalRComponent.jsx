import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useDispatch, useSelector } from 'react-redux';
import { signalrAction } from '../state/actions/signalrAction';

const SignalRComponent = ({ children }) => {
    const jwtToken = useSelector(state => state.authReducer.token);
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const dispatch = useDispatch();
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5279/chatHub", {
                accessTokenFactory: () => jwtToken,
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [jwtToken]);

    useEffect(() => {
        if (connection && isLoggedIn) {
            connection.start()
                .then(() => {
                    console.log("Kết nối thành công!");

                    // Lắng nghe sự kiện từ server
                    connection.on("UserCountUpdated", message => {
                        console.log("trả vể", message);
                        dispatch(signalrAction.setCUserOnline(message));
                    });

                    // Lắng nghe sự kiện nhận tin nhắn từ server
                    connection.on("ReceiveMessage", message => {
                        console.log("Tin nhắn nhận được: ", message);
                        dispatch(signalrAction.setMessage(message))
                    });

                    // Lấy số lượng người dùng trực tuyến
                    connection.invoke("GetOnlineUserCount")
                        .then(count => {
                            dispatch(signalrAction.setCUserOnline(count));
                        });
                })
                .catch(e => console.log("Kết nối thất bại: ", e));

            connection.onclose(() => {
                console.log("Kết nối đã đóng.");
            });

            connection.onreconnecting(() => {
                console.log("Đang kết nối lại...");
            });

            connection.onreconnected(() => {
                console.log("Kết nối lại thành công.");
            });

            return () => {
                if (connection) {
                    connection.stop()
                        .then(() => console.log("Ngắt kết nối thành công."))
                        .catch(e => console.log("Ngắt kết nối thất bại: ", e));
                }
            };
        }
    }, [connection, isLoggedIn, dispatch]);

    return (
            children
    );
}

export default SignalRComponent;
