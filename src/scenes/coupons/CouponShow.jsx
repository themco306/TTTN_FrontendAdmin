import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import couponApi from '../../api/couponApi';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
function CouponShow() {
    const navigate = useNavigate();
    const location = useLocation();
    const couponId = location.state.id;
    const [loading, setLoading] = useState(true);
    const [couponData, setCouponData] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await couponApi.getShowAll(couponId);
          console.log(res);
          if (res.status === 200) {
            setCouponData(res.data);
            setLoading(false);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }, [couponId]);
    const itemTemplate = (data) => {
        return(
            <p><strong>--</strong> Mã đơn hàng: <strong>{data.orderCode}</strong>, lúc: <strong>{new Date(data.usedAt).toLocaleString()}</strong>, được dùng bởi: <strong>{data.userName}</strong>.</p>
        )
    }
    return (
      <>
        <ContentHeader
          currentPage={"Chi Tiết Mã giảm giá"}
          previousPage={"Mã giảm giá"}
          previousPath={"/coupon"}
        />
        <ContentMain>
          {!loading && couponData && (
            <div className="row">
              <div className="col-md-5">
              <p>
                <strong>Mã:</strong> {couponData.code}
              </p>
              <p>
                <strong>Mô tả:</strong> {couponData.description}
              </p>
              <p>
                <strong>Loại:</strong> {couponData.discountType==="FixedAmount"?"Giảm trực tiếp":"Giảm theo %"}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong> {couponData.startDate}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong> {couponData.endDate}
              </p>
              <p>
                <strong>Số lượng ban đầu:</strong> {couponData.usageLimit}
              </p>
              <p>
                <strong>Số lượng còn:</strong> {couponData.usageLimit-couponData.couponUsages.length}
              </p>
              <p>
                <strong>Số lượt dùng/người:</strong> {couponData.usagePerUser}
              </p>
              <p>
                <strong>Trạng thái:</strong> {couponData.status===0?"Ẩn":"Hiện"}
              </p>
              </div>
              <div className="col-md-2">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    icon={PrimeIcons.USER_EDIT}
                    label="Sửa"
                    className="m-3"
                    raised
                    rounded
                    onClick={() =>
                      navigate("/coupon/edit", { state: { id: couponData.id } })
                    }
                  />
                </div>
              

              </div>
              <div className='col-md-5'>
              <DataScroller value={couponData.couponUsages} itemTemplate={itemTemplate} rows={5} buffer={0.5} header="Danh sách mã đã dùng:" />
              </div>
            </div>
          )}
        </ContentMain>
      </>
    );
  }

export default CouponShow
