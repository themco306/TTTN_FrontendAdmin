import React, { useEffect, useState } from 'react';
import appUrl from '../api/appUrl';
import dashboardApi from '../api/dashboardApi';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

function MessageItem({ item ,setCount}) {
  const {user}=useSelector(state=>state.authReducer)
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);
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
  const truncateContent = (content, maxLength) => {
    return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  };
  const footerContent = (
    <div>
        <Button  label="Xóa" severity='danger' icon="pi pi-trash" onClick={() => handleDeleteMessage()}  />
    </div>
);
const handleDialog=()=>{
  handleMakeSeen()
  setVisible(true)
}
const handleDeleteMessage = async () => {
  try {
    await dashboardApi.deleteMessage(item.id);
    
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div key={item.id}>
      <a style={{ cursor: 'pointer' }} onClick={handleDialog} className="dropdown-item">
        <div className="media">
          <img src={appUrl.avatarURL + item.user.avatar} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
          <div className="media-body">
            <h3 className="dropdown-item-title">
              {item.user.firstName + " " + item.user.lastName}
              {user.id==item.userId?( <span className={"float-right text-sm text-success"}>
                Của bạn
              </span>):( <span className={"float-right text-sm " + (seen ? "text-success" : "text-danger")}>
                {seen ? " Đã xem " : " Mới "}
              </span>)}
             
            </h3>
            <p className="text-sm">{truncateContent(item.content,50)}</p>
            <p className="text-sm text-muted"><i className="far fa-clock mr-1" />{new Date(item.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </a>
      <div className="dropdown-divider" />
      <Dialog footer={user.id==item.userId?footerContent:null} header={"Tin nhắn từ: "+item.user.firstName + " " + item.user.lastName+" ("+new Date(item.createdAt).toLocaleString()+")"} visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
      <p>Nội dung: {item.content}</p>
      </Dialog>
    </div>
  );
}

export default MessageItem;
