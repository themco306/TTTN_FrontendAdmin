import React, { useEffect, useState } from 'react';
import dashboardApi from '../api/dashboardApi';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

function NewUser() {
    const [newUserData, setNewUserData] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardApi.getNewUser();
                if (response.status === 200) {
                    setNewUserData(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [refresh]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Message severity="warn" icon={"pi pi-users"} style={{ width:"50%",fontSize:18 }} text="Người dùng mới" />
                <Button onClick={() => setRefresh(!refresh)} severity='danger' icon={"pi pi-refresh"} text tooltip='Nhấn để làm mới' />
            </div>
            <div className='row mt-4'>
                <div className="col-4">
                    <p>
                        Hôm nay: <span style={{ color: newUserData.percentIncreaseToday < 0 ? 'red' : 'green', fontWeight: 'bolder' }}>{newUserData.today}</span>, {newUserData.percentIncreaseToday < 0 ? 'giảm' : 'tăng'} <span style={{ color: newUserData.percentIncreaseToday < 0 ? 'red' : 'green', fontWeight: 'bolder' }}>{Math.abs(newUserData.percentIncreaseToday).toFixed(1)}%</span>
                    </p>
                </div>
                <div className="col-4">
                    <p>
                        Tháng này: <span style={{ color: newUserData.percentIncreaseMonth < 0 ? 'red' : 'green', fontWeight: 'bolder' }}>{newUserData.thisMonth}</span>, {newUserData.percentIncreaseMonth < 0 ? 'giảm' : 'tăng'} <span style={{ color: newUserData.percentIncreaseMonth < 0 ? 'red' : 'green', fontWeight: 'bolder' }}>{Math.abs(newUserData.percentIncreaseMonth).toFixed(1)}%</span>
                    </p>
                </div>
                <div className="col-4">
                    <p>
                        Năm này: <span style={{ color: "green", fontWeight: 'bolder' }}>{newUserData.thisYear}</span> (người mới)
                    </p>
                </div>
            </div>
        </>
    );
}

export default NewUser;
