import React, { useEffect, useState } from 'react';
import appUrl from '../api/appUrl';
import dashboardApi from '../api/dashboardApi';

function MessageItem({ item ,setCount}) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = {
          MessageId: item.id
        };
        const response = await dashboardApi.isRead(data);
        console.log("read " + item.id, response);
        if (response.status === 200) {
          setSeen(response.data.isRead);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [item.id]);

  const handleMakeSeen = async () => {
    try {
      const data = {
        MessageId: item.id
      };
      const response = await dashboardApi.checkRead(data);
      console.log("seen " + item.id, response);
      if (response.status === 200) {
        setSeen(true);
        setCount(pre=>pre-1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={item.id}>
      <a style={{ cursor: 'pointer' }} onClick={handleMakeSeen} className="dropdown-item">
        <div className="media">
          <img src={appUrl.avatarURL + item.user.avatar} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
          <div className="media-body">
            <h3 className="dropdown-item-title">
              {item.user.firstName + " " + item.user.lastName}
              <span className={"float-right text-sm " + (seen ? "text-success" : "text-danger")}>
                {seen ? " Đã xem " : " Mới "}
              </span>
            </h3>
            <p className="text-sm">{item.content}</p>
            <p className="text-sm text-muted"><i className="far fa-clock mr-1" />{new Date(item.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </a>
      <div className="dropdown-divider" />
    </div>
  );
}

export default MessageItem;
