import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import menuApi from '../../api/menuApi';
import ContentHeader from '../../components/ContentHeader';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import ContentMain from '../../components/ContentMain';

function MenuShow() {
    const location = useLocation();
    const menuId = location.state.id;
    const navigate = useNavigate();
    const [pageData,setPageData]=useState({})
    const [loading, setLoading] = useState(true);
  
    useEffect(()=>{
        const fetchData =async()=>{
          try{
            const res=await menuApi.get(menuId);
            if(res.status===200){
             setPageData(res.data)
             setLoading(false)
              console.log(res.data)
            }
          }catch(error){
          }
        }
        fetchData()
      },[menuId])
  return (
    <>
    <ContentHeader
      currentPage={"Chi Tiết Menu"}
      previousPage={"Menu"}
      previousPath={"/menu"}
    />
    <ContentMain>
      {!loading && pageData && (
        <div className="row">
          <div className="col-md-12">
            <p>
              <strong>Tên:</strong> {pageData.name}
            </p>
            <p>
              <strong>Liên kết:</strong> {pageData.link}
            </p>
            <p>
              <strong>Cấp cha:</strong> {pageData.parent?.name}
            </p>
            <p>
              <strong>Vị trí:</strong> {pageData.sortOrder}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {pageData.status===1 ? "Hiển thị" : "Ẩn"}
            </p>
            <p>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(pageData.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Người tạo:</strong> {pageData.createdBy?.userName}
              </p>
              <p>
                <strong>Ngày cập nhật:</strong>{" "}
                {new Date(pageData.updatedAt).toLocaleString()}
              </p>
              <p>
                <strong>Người cập nhật:</strong>{" "}
                {pageData.updatedBy?.userName}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                icon={PrimeIcons.USER_EDIT}
                label="Sửa"
                className="m-3"
                raised
                rounded
                onClick={() =>
                  navigate("/menu/edit", { state: { id: pageData.id } })
                }
              />
            </div>
          </div>
        </div>
      )}
    </ContentMain>
  </>
  )
}

export default MenuShow
