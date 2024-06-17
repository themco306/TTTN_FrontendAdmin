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
import { Paginator } from "primereact/paginator";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleException = useCustomException();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productData = useSelector((state) => state.productReducers.products);
  // const [productData, setProductData] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [key, setKey] = useState("");
  const [onS, setOnS] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [show, setShow] = useState(null);
  const options = [
    { name: "Mặc định", value: "" },
    { name: "Mới nhất", value: "create-asc" },
    { name: "Cũ nhất", value: "create-desc" },
    // { name: "Mới cập nhật", value: "update-desc" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          key,
          status:show === null ? null : show ? 1 : 0,
          SortOrder:selectOption,
          pageSize: rows,
          pageNumber: currentPage,
        };
        console.log("pấm",params)
        var response = await productApi.getAllPage(params);
        console.log(response.data);
        dispatch(productActions.listProduct(response.data.items));
        setTotalRecords(response.data.totalCount);
        setRows(response.data.pageSize);
        setCurrentPage(response.data.currentPage);
        setFirst((response.data.currentPage - 1) * response.data.pageSize);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, rows, onS,show,selectOption]);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };
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
  const footerTemplate = (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      rowsPerPageOptions={[1, 2, 3, 5, 10, 20, 30, 50, 100]}
      onPageChange={onPageChange}
    />
  );
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Sản phẩm"} previousPage={"Trang chủ"} />
      <ContentMain>
        <div className="card">
          <div className="row  flex justify-content-between  mb-4">
            <div className="col-md-4">
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
            <div className="col-md-8" style={{ display:'flex',alignItems:'center' }}>
              <Dropdown
                value={selectOption}
                onChange={(e) => setSelectOption(e.value)}
                options={options}
                optionLabel="name"
                className="w-full md:w-14rem"
                 placeholder="Sắp xếp"
              />
              <InputText
                value={key}
                onChange={(e) => setKey(e.target.value)}
                style={{ width: "50%" }}
                placeholder="Tìm theo tên, danh mục, thương hiệu..."
              />
              <Button
                onClick={() => setOnS(!onS)}
                tooltip="Nếu muốn tìm tất cả thì nên đặt các thuộc tính khác về mặc định"
                severity="secondary"
                type="button"
              >
                Tìm
              </Button>
              <div className="ml-1" style={{ display: "flex", justifyContent: "space-between",alignItems:'center' }}>
                <TriStateCheckbox
                  value={show}
                  onChange={(e) => setShow(e.value)}
                />
                <label className="ml-1">
                  {show === null ? "Tất cả" : show ? "Hiển thị" : "Ẩn"}
                </label>
              </div>
            </div>
          </div>
          <DataTable
            value={productData}
            selectionMode={false ? null : "checkbox"}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            removableSort
            footer={footerTemplate}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5%" }}
            ></Column>
            <Column
              headerStyle={{ width: "3%" }}
              sortable
              field="id"
              header=""
            ></Column>
            <Column
              headerStyle={{ width: "10%" }}
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
              headerStyle={{ width: "10%" }}
              sortable
              field="category.name"
              header="Danh mục"
            ></Column>
            <Column
              headerStyle={{ width: "10%" }}
              sortable
              field="brand.name"
              header="Thương hiệu"
            ></Column>
            <Column
              headerStyle={{ width: "8%" }}
              sortable
              field="quantity"
              header="Số lượng"
            ></Column>
            {/* <Column
              headerStyle={{ width: "8%" }}
              sortable
              sortField="star"
              header="Đánh giá"
              body={(rowData)=>(<Rating style={{ width:"2em" }} value={rowData.star} readOnly cancel={false} />)}
            ></Column> */}
            <Column
              headerStyle={{ width: "8%" }}
              sortable
              field="totalItemsSold"
              header="Đã bán"
            ></Column>

            <Column
              header="Chức năng"
              headerStyle={{ width: "20%" }}
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
                    tooltip="Xem"
                    raised
                    rounded
                    onClick={() =>
                      navigate("/product/show", { state: { id: rowData.id } })
                    }
                  />
                  <Button
                    icon={PrimeIcons.USER_EDIT}
                    tooltip="Sửa"
                    severity="success"
                    raised
                    rounded
                    onClick={() =>
                      navigate("/product/edit", { state: { id: rowData.id } })
                    }
                  />
                  <Button
                    icon={PrimeIcons.TRASH}
                    tooltip="Xóa"
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
