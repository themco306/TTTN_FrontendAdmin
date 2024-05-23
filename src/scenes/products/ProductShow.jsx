import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { useLocation, useNavigate } from "react-router-dom";
import { productActions } from "../../state/actions/productActions";
import productApi from "../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { Galleria } from "primereact/galleria";
import appUrl from "../../api/appUrl";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";

function ProductShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state.id;
  const [productData, setProductData] = useState({});
  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productApi.get(productId);
        if (res.status === 200) {
          setProductData(res.data);
          console.log(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [productId]);

  const itemTemplate = (item) => {
    return (
      <img
        src={appUrl.imageURL + item.imagePath}
        alt={item.imageName}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={appUrl.imageURL + item.imagePath}
        alt={item.imageName}
        style={{ display: "block", height: 50 }}
      />
    );
  };
  return (
    <>
      <ContentHeader
        currentPage={"Chi Tiết Sản phẩm"}
        previousPage={"Sản Phẩm"}
        previousPath={"/product"}
      />
      <ContentMain>
        {productData && (
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>Tên:</strong> {productData.name}
              </p>
              <p>
                <strong>Slug:</strong> {productData.slug}
              </p>
              <p>
                <strong>Danh mục:</strong> {productData.category?.name}
              </p>
              <p>
                <strong>Thương hiệu:</strong> {productData.brand?.name}
              </p>
              <p>
                <strong>Số lượng:</strong> {productData.quantity}
              </p>
              <p>
                <strong>Giá mua:</strong> {productData.buyingPrice}
              </p>
              <p>
                <strong>Giá Bán:</strong> {productData.comparePrice}
              </p>
              <p>
                <strong>Giá Khuyến Mãi:</strong> {productData.salePrice}
              </p>
              <p>
                <strong>Mô tả:</strong> {productData.description}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {productData.status === 1 ? "Hiển thị" : "Ẩn"}
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(productData.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Người tạo:</strong> {productData.createdBy?.userName}
              </p>
              <p>
                <strong>Ngày cập nhật:</strong>{" "}
                {new Date(productData.updatedAt).toLocaleString()}
              </p>
              <p>
                <strong>Người cập nhật:</strong>{" "}
                {productData.updatedBy?.userName}
              </p>
            </div>
            <div className="col-md-4">
            <ScrollPanel style={{ width: '100%', height: '500px' }}>
                <div dangerouslySetInnerHTML={{ __html: productData.description }}></div>
            </ScrollPanel>
            </div>
            <div className="col-md-4">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  label="Sửa"
                  className="m-3"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/product/edit", { state: { id: productData.id } })
                  }
                />
              </div>
              <Galleria
                value={productData.galleries}
                responsiveOptions={responsiveOptions}
                numVisible={5}
                circular
                style={{ maxWidth: "640px" }}
                showItemNavigators
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />
            </div>
          </div>
        )}
      </ContentMain>
    </>
  );
}

export default ProductShow;
