import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';

const TOKEN="pk.eyJ1IjoibmN0azYwNjMwNiIsImEiOiJjbHcxa2I3eGowNm9lMmlvMHpkNG91cHppIn0.Vu_d0gFgzQrw7biATT7H9A"

export default function MyMap() {
  const [viewPort,setViewPort]=useState({
    latitude: 21.0285,
    longitude: 105.8542,
    zoom: 10
  })

  return (
    <div style={{ width:"100vw",height:"100vh"}}>
      <ReactMapGL
      {...viewPort}
      mapboxAccessToken={TOKEN}
      width='100%'
      height="100%"
      mapStyle={"mapbox://styles/nctk606306/clw1lp4os02e101qrbvji494j"}
      >

      </ReactMapGL>
    </div>
  );
}