import React, { useEffect, useState } from 'react'
import galleryApi from '../../api/galleryApi';
import { Image } from 'primereact/image';
import appUrl from '../../api/appUrl';

function GalleryList({galleries}) {
  console.log(galleries)
    const [galleryData,setGalleryData]=useState([])
    // useEffect(() => {
    //     const fetchData = async () => {
    //       var response = await galleryApi.getByProductId(productId);
    //       console.log(response.data);
    //       setGalleryData(response.data)
    //     };
    //     fetchData();
    //   }, [productId]);
    useEffect(()=>{
      setGalleryData(galleries)
    },[galleries])
  return (
    <div>
        {galleryData.length>0?
        <Image src={appUrl.imageURL+(galleryData[0].imagePath??galleryData[0].placeholder)} alt="Image" width="100%" preview />
        :
        <Image src="Không tìm thấy" alt="Image" width="100"  />

    }
        
    </div>
  )
}

export default GalleryList
