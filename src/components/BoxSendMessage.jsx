import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AppRole from '../helpers/AppRole';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import dashboardApi from '../api/dashboardApi';
import { toast } from 'react-toastify';
function BoxSendMessage() {
    const { user } = useSelector(state => state.authReducer);
    const [message,setMessage]=useState('')
    const [visible, setVisible] = useState(false);
    const [loading,setLoading]=useState(false)
    const handleSendMessage=async()=>{
        try {
        setLoading(true)
            const data={
                message
            }
            const response=await dashboardApi.sendMessage(data)
            console.log(response)
            if(response.status===200){
                toast.success(response.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const footerContent = (
        <div>
            <Button label="Thoát" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button  loading={loading} label="Gửi" icon="pi pi-check" onClick={handleSendMessage} autoFocus />
        </div>
    );
  return (
    <> {user.roles.includes(AppRole.SuperAdmin)&&(
        <li className="nav-item d-none d-sm-inline-block">
        <Button severity='success' text onClick={() => setVisible(true)} className="nav-link">Gửi thông báo</Button>
        <Dialog footer={footerContent} header="Gửi thông báo" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
        <InputTextarea style={{ width:'100%' }} autoResize value={message} onChange={(e) => setMessage(e.target.value)} rows={5} cols={30} />

         </Dialog>
      </li>
     )}</>
  )
}

export default BoxSendMessage