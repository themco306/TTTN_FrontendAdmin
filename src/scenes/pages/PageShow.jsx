import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
import { pageActions } from '../../state/actions/pageActions';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

function PageShow() {
    const location = useLocation();
    const pageId = location.state.id;
    const navigate = useNavigate();
    const [pageData,setPageData]=useState({})
    const [loading, setLoading] = useState(true);
  
    useEffect(()=>{
        const fetchData =async()=>{
          try{
            const res=await postApi.get(pageId);
            if(res.status===200){
             setPageData(res.data)
             setLoading(false)
              console.log(res.data)
            }
          }catch(error){
          }
        }
        fetchData()
      },[pageId])
  return (
    <>
    <ContentHeader
      currentPage={"Chi Tiết Trang Đơn"}
      previousPage={"Trang Đơn"}
      previousPath={"/page"}
    />
    <ContentMain>
      {!loading && pageData && (
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Tên trang đơn:</strong> {pageData.name}
            </p>
            <p>
              <strong>Slug:</strong> {pageData.slug}
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
                  navigate("/page/edit", { state: { id: pageData.id } })
                }
              />
            </div>
          </div>
          <div className="col-md-8">
            
            <ScrollPanel style={{ width: '100%', height: '500px' }}>
                <div dangerouslySetInnerHTML={{ __html: pageData.detail }}></div>
            </ScrollPanel>
          </div>
        </div>
      )}
    </ContentMain>
  </>
  )
}

export default PageShow
