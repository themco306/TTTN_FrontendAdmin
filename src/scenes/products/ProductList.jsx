import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import productApi from "../../api/productApi";
import { PrimeIcons } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import GalleryList from "./GalleryList";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { confirmPopup } from "primereact/confirmpopup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../state/actions/productActions";
import useCustomException from "../../helpers/useCustomException";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const productData = useSelector((state) => state.productReducers.products);
  // const [productData, setProductData] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await productApi.getAll();
        console.log(response.data);
        dispatch(productActions.listProduct(response.data));
      } catch (error) {
        console.log(error)
      }
     
    };
    fetchData();
  }, []);
  const handleDelete = async (productId) => {
    if (!confirmPopup()) return;
    try {
      let res = await productApi.delete(productId);
      if (res.status === 204) {
        dispatch(productActions.deleteProduct(productId));
        toast.success(`Xóa thành công ID: ${productId}`);
      }
      return;
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
    }
  };

  const handleConfirmDelete = (productId) => {
    confirmDialog({
      message: "Bạn có thực sự muốn xóa?",
      header: "Xóa",
      acceptLabel: "Có",
      rejectLabel: "Không",
      icon: "pi pi-info-circle",
      position: "right",
      accept: () => handleDelete(productId),
      reject: () => {},
    });
  };
  const handleDeleteSelected = async () => {
    if (!confirmPopup()) return;
    try {
      const ids = selectedProducts.map((p) => p.id);
      const data = {
        ids: ids,
      };
      console.log(data);
      let res = await productApi.deleteProducts(data);
      console.log(res);
      if (res.status === 200) {
        const updatedSelected = selectedProducts.filter(
          (p) => !ids.includes(p.id)
        );
        setSelectedProducts(updatedSelected);
        dispatch(productActions.deleteProducts(ids));
        toast.success(`Xóa thành công ID: ${ids}`);
      }
      return;
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
    }
  };

  const handleConfirmDeleteSelected = () => {
    if (selectedProducts.length > 0) {
      confirmDialog({
        message: "Bạn có thực sự muốn xóa?",
        header: "Xóa",
        acceptLabel: "Có",
        rejectLabel: "Không",
        icon: "pi pi-info-circle",
        position: "top-left",
        accept: handleDeleteSelected,
        reject: () => {},
      });
    } else {
      toast.info("Bạn chưa chọn gì để xóa!");
    }
  };
  const handleChangeStatus = async (id) => {
    try {
      const response = await productApi.updateStatus(id);
      if (response.status === 200) {
        dispatch(productActions.updateProduct(response.data));
      }
      console.log(response);
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
    }
  };
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Sản phẩm"} previousPage={"Trang chủ"} />
      <ContentMain>
        <div className="card">
          <div className="row  flex justify-content-between  mb-4">
            <div className="col-md-6">
              <Button
                icon={PrimeIcons.TRASH}
                label="Xóa đã chọn"
                onClick={handleConfirmDeleteSelected}
                severity="danger"
                raised
                disabled={selectedProducts.length === 0}
              />

              <Button
                icon={PrimeIcons.PLUS}
                label="Thêm"
                severity="success"
                raised
                onClick={() => navigate("/product/create")}
              />
            </div>
          </div>
          <DataTable
            value={productData}
            selectionMode={false ? null : "checkbox"}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            removableSort
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
           
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5%" }}
            ></Column>
            <Column
              headerStyle={{ width: "5%" }}
              sortable
              field="id"
              header="Mã"
            ></Column>
            <Column
              headerStyle={{ width: "15%" }}
              header="Ảnh"
              body={(rowData) => (
                <GalleryList
                  productId={rowData.id}
                  galleries={rowData.galleries}
                />
              )}
            ></Column>
            <Column
              headerStyle={{ width: "20%" }}
              sortable
              field="name"
              header="Tên"
            ></Column>
            <Column
              headerStyle={{ width: "8%" }}
              sortable
              field="quantity"
              header="Số lượng"
            ></Column>
            <Column
              header="Chức năng"
              headerStyle={{ width: "30%" }}
              body={(rowData) => (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  key={rowData.id}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InputSwitch
                      checked={rowData.status === 1 ? true : false}
                      onChange={() => handleChangeStatus(rowData.id)}
                    />
                  </div>
                  <Button
                    icon={PrimeIcons.EYE}
                    label="Xem"
                    raised
                    rounded
                    onClick={() =>
                      navigate("/product/show", { state: { id: rowData.id } })
                    }
                  />
                  <Button
                    icon={PrimeIcons.USER_EDIT}
                    label="Sửa"
                    raised
                    rounded
                    onClick={() =>
                      navigate("/product/edit", { state: { id: rowData.id } })
                    }
                  />
                  <Button
                    icon={PrimeIcons.TRASH}
                    label="Xóa"
                    severity="danger"
                    onClick={() => handleConfirmDelete(rowData.id)}
                    raised
                    rounded
                  />
                </div>
              )}
            ></Column>
          </DataTable>
        </div>
      </ContentMain>
    </>
  );
}

export default ProductList;
