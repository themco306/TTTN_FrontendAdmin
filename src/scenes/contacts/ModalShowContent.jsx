import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ModalShowContent({content,id,replayContent}) {
    const navigate=useNavigate()
    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div>
            <Button label="Thoát" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Trả lời" icon="pi pi-check" onClick={() =>
                      navigate("/contact/edit", { state: { id: id } })
                    } autoFocus />
        </div>
    );
  return (
    <>
      <Button
                    icon={PrimeIcons.EYE}
                    tooltip="Nhấn để xem nội dung"
                    tooltipOptions={{ position:'top' }}
                    raised
                    rounded
                    onClick={() =>
                      setVisible(true)
                    }
                  />
                   <Dialog header="Nội dung" visible={visible} position={"right"} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}  resizable={false} maximizable >
                    <div className="row">
                        <div className="col-12">
                            <p>{content}</p>
                        </div>
                        <div className="col-12">
                            <h4>Nội dung trả lời</h4>
                            <div dangerouslySetInnerHTML={{ __html:replayContent }}></div>
                        </div>
                    </div>
                  </Dialog>
    </>
  )
}

export default ModalShowContent
