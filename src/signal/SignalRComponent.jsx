import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useDispatch, useSelector } from 'react-redux';
import { signalrAction } from '../state/actions/signalrAction';

const SignalRComponent = ({children}) => {
    const jwtToken = useSelector(state => state.authReducer.token);
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const dispatch=useDispatch()
    const [connection, setConnection] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        console.log(111)
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5279/chatHub", {
                accessTokenFactory: () => {
                    return jwtToken;
                }
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        
    }, [jwtToken]);

    useEffect(() => {
        if (connection && isLoggedIn) { // Chỉ bắt đầu kết nối khi isLoggedIn là true
            connection.start()
                .then(result => {
                    console.log("Kết nối thành công!");

                    // Lắng nghe sự kiện từ server
                    connection.on("UserCountUpdated", message => {
                        console.log("trả vể",message)
                        dispatch(signalrAction.setCUserOnline(message))
                        
                    });

                    // Lấy số lượng người dùng trực tuyến
                    connection.invoke("GetOnlineUserCount")
                        .then(count => {
                            dispatch(signalrAction.setCUserOnline(count))
                        });
                })
                .catch(e => console.log("Kết nối thất bại: ", e));
    
            // Log trạng thái kết nối
            connection.onclose(() => {
                console.log("Kết nối đã đóng.");
            });
        }
        
        // Ngắt kết nối khi isLoggedIn là false
        if (!isLoggedIn) {
            console.log("gọi cl")
            if (connection) {
                connection.stop();
            }
        }
    }, [connection, isLoggedIn]);

    return (
       children
    );
}

export default SignalRComponent;
