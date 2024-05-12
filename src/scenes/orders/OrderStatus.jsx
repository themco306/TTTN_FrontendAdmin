import { PrimeIcons } from 'primereact/api'
import { Message } from 'primereact/message'
import { Tooltip } from 'primereact/tooltip'
import React from 'react'

function OrderStatus({id,data}) {
    
  return (
    <div  className='card flex justify-content-center' style={{ cursor:'pointer' }} > 
    <Tooltip target={`#v${id}`} mouseTrack mouseTrackLeft={10} content={data.tooltip}/>
    <Message id={`v${id}`}   icon={data.icon} severity={data.type} text={data.text} ></Message>

</div>
  )
}

export default OrderStatus
