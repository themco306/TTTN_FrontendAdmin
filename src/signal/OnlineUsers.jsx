import React, { useEffect, useState } from 'react';
import hubUserApi from '../api/hubUserApi';

const OnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await hubUserApi.getCount()
                console.log(response)
                if (response.status===200) {
                    setOnlineUsers(response.data);
                } else {
                    console.error('Failed to fetch online users');
                }
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };

        fetchOnlineUsers();
    }, []);

    return (
        <div>
            <h2>Người dùng trực tuyến</h2>
                {onlineUsers}
          
        </div>
    );
};

export default OnlineUsers;
