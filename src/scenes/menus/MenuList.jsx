import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../state/actions/menuActions";
import menuApi from "../../api/menuApi";
import { PrimeIcons } from "primereact/api";
import { confirmPopup } from "primereact/confirmpopup";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Accordion, AccordionTab } from "primereact/accordion";
import categoryApi from "../../api/categoryApi";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import StaticData from "../../helpers/StaticData";
import { Dropdown } from "primereact/dropdown";
import validateMenu from "../../validate/validateMenu";
import useCustomException from "../../helpers/useCustomException";
import ShowValiMsg from "../../validate/ShowValiMsg";
import brandApi from "../../api/brandApi";
import postApi from "../../api/postApi";
import topicApi from "../../api/topicApi";

function MenuList() {
  const getType = (type) => {
    switch (type) {
      case "category":
        return "Danh mục";
      case "brand":
        return "Thương hiệu";
      case "page":
        return "Trang đơn";
      case "post":
        return "Bài viết";
      default:
        return "Tùy biến";
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleException = useCustomException();

  const menuData = useSelector((state) => state.menuReducers.menus);
  const [position, setPosition] = useState("mainmenu");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [categoryData, setCateGoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [categorySelect, setCategorySelect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await menuApi.getAll();
      console.log(response);
      dispatch(menuActions.listMenu(response.data));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response.data);
        setCateGoryData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await brandApi.getAll();
        console.log(response.data);
        setBrandData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await topicApi.getAllActive();
        console.log(response.data);
        setPostData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getAllPage();
        console.log(response.data);
        setPageData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const handleDelete = async (productId) => {
    if (!confirmPopup()) return;
    try {
      let res = await menuApi.delete(productId);
      if (res.status === 200) {
        dispatch(menuActions.deleteMenu(productId));
        toast.success(res.data.message);
      }
      return;
    } catch (err) {
      console.log(err);
      toast.error("Không thể xóa bản ghi này!");
      return;
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
      const ids = selectedMenus.map((p) => p.id);
      const data = {
        ids: ids,
      };
      console.log(data);
      let res = await menuApi.deleteMenus(data);
      console.log(res);
      if (res.status === 200) {
        const updatedSelected = selectedMenus.filter(
          (p) => !ids.includes(p.id)
        );
        setSelectedMenus(updatedSelected);
        dispatch(menuActions.deleteMenus(ids));
        toast.success(`Xóa thành công ID: ${ids}`);
      }
      return;
    } catch (err) {
      console.log(err);

      toast.error("Không thể xóa bản ghi này!");
      return;
    }
  };

  const handleConfirmDeleteSelected = () => {
    if (selectedMenus.length > 0) {
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
      const response = await menuApi.updateStatus(id);
      if (response.status === 200) {
        dispatch(menuActions.updateStatusMenu(id));
      }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  const handleCheckCategory = (item) => {
    if (categorySelect == null) {
      setCategorySelect(item);
      return;
    }
    if (categorySelect !== null) {
      if (categorySelect === item) {
        setCategorySelect(null);
      } else {
        setCategorySelect(item);
      }
    }
  };
  const handleAdd = async (type) => {
    try {
      if (categorySelect === null) {
        return;
      }
      setLoading(true);
      setErrors({});
      const data = {
        type: type,
        tableId: categorySelect.id,
        position,
      };
      const response = await menuApi.add(data);
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(menuActions.addMenu(response.data.data));
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      }
      setLoading(false);
    }
  };
  const handleAddCustom = async () => {
    try {
      setLoading(true);
      await validateMenu.validate({ name, link }, { abortEarly: false });
      setErrors({});
      const data = {
        name,
        link,
        position,
      };
      const response = await menuApi.addCustom(data);
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(menuActions.addMenu(response.data.data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status) {
        handleException(error);
      } else {
        const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        console.log(newError);
        setErrors(newError);
      }
    }
  };
  return (
    <>
      <ConfirmDialog />
      <ContentHeader currentPage={"Quản lý menu"} previousPage={"Trang chủ"} />
      <ContentMain>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="position" style={{ display: "block" }}>
                Vị trí:
              </label>
              <Dropdown
                value={position}
                onChange={(e) => setPosition(e.value)}
                options={[
                  { name: "Menu chính", value: "mainmenu" },
                  { name: "Menu cuối trang", value: "footermenu" },
                ]}
                id="position"
                optionLabel="name"
                style={{ width: "100%" }}
              />
            </div>
            <Accordion activeIndex={4}>
              <AccordionTab header="Danh mục">
                <div className="row">
                  {categoryData.length > 0 &&
                    categoryData.map((item) => (
                      <div
                        className="col-md-12"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Checkbox
                          checked={categorySelect?.id === item.id}
                          onChange={() => handleCheckCategory(item)}
                        />
                        <div className="ml-2">
                          <strong>{item.name}</strong>
                        </div>
                      </div>
                    ))}
                  <div className="col-md-12 mt-2">
                    <Button
                      loading={loading}
                      onClick={() => handleAdd("category")}
                      style={{ width: "100%" }}
                      label="Thêm"
                      severity="success"
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Thương hiệu">
                <div className="row">
                  {brandData.length > 0 &&
                    brandData.map((item) => (
                      <div
                        className="col-md-12"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Checkbox
                          checked={categorySelect === item}
                          onChange={() => handleCheckCategory(item)}
                        />
                        <div className="ml-2">
                          <strong>{item.name}</strong>
                        </div>
                      </div>
                    ))}
                  <div className="col-md-12 mt-2">
                    <Button
                      loading={loading}
                      onClick={() => handleAdd("brand")}
                      style={{ width: "100%" }}
                      label="Thêm"
                      severity="success"
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Trang đơn">
                <div className="row">
                  {pageData.length > 0 &&
                    pageData.map((item) => (
                      <div
                        className="col-md-12"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Checkbox
                          checked={categorySelect === item}
                          onChange={() => handleCheckCategory(item)}
                        />
                        <div className="ml-2">
                          <strong>{item.name}</strong>
                        </div>
                      </div>
                    ))}
                  <div className="col-md-12 mt-2">
                    <Button
                      loading={loading}
                      onClick={() => handleAdd("page")}
                      style={{ width: "100%" }}
                      label="Thêm"
                      severity="success"
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Chủ đề bài viết">
                <div className="row">
                  {postData.length > 0 &&
                    postData.map((item) => (
                      <div
                        className="col-md-12"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Checkbox
                          checked={categorySelect === item}
                          onChange={() => handleCheckCategory(item)}
                        />
                        <div className="ml-2">
                          <strong>{item.name}</strong>
                        </div>
                      </div>
                    ))}
                  <div className="col-md-12 mt-2">
                    <Button
                      loading={loading}
                      onClick={() => handleAdd("topic")}
                      style={{ width: "100%" }}
                      label="Thêm"
                      severity="success"
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Tùy biến liên kết">
                <label htmlFor="name">Tên menu</label>
                <InputText
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  style={{ width: "100%" }}
                />
                <ShowValiMsg>{errors.name}</ShowValiMsg>
                <label htmlFor="link">Liên kết</label>
                <InputText
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  id="link"
                  style={{ width: "100%" }}
                />
                <ShowValiMsg>{errors.link}</ShowValiMsg>

                <Button
                  loading={loading}
                  onClick={handleAddCustom}
                  style={{ width: "100%", marginTop: 10 }}
                  label="Thêm"
                  severity="success"
                />
              </AccordionTab>
            </Accordion>
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="row  flex justify-content-between  mb-4">
                <div className="col-md-6">
                  <Button
                    icon={PrimeIcons.TRASH}
                    label="Xóa đã chọn"
                    onClick={handleConfirmDeleteSelected}
                    severity="danger"
                    raised
                    disabled={selectedMenus.length === 0}
                  />
                </div>
              </div>
              <DataTable
                value={menuData}
                selectionMode={false ? null : "checkbox"}
                selection={selectedMenus}
                onSelectionChange={(e) => setSelectedMenus(e.value)}
                dataKey="id"
                paginator
                removableSort
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "40rem" }}
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "5%" }}
                ></Column>
                <Column
                  headerStyle={{ width: "5%" }}
                  sortable
                  field="id"
                  header="STT"
                ></Column>
                <Column
                  sortable
                  sortField="name"
                  headerStyle={{ width: "25%" }}
                  header="Tên/Liên kết"
                  body={(rowData) => (
                    <div>
                      <div>
                        <strong>{rowData.name}</strong>
                      </div>
                      <div>
                        <span>{rowData.link}</span>
                      </div>
                    </div>
                  )}
                ></Column>
                <Column
                  headerStyle={{ width: "15%" }}
                  sortable
                  sortField="position"
                  header="Vị trí"
                  body={(rowData) => (
                    <span>
                      {rowData.position === "mainmenu"
                        ? "menu trên"
                        : "menu dưới"}
                    </span>
                  )}
                ></Column>
                <Column
                  headerStyle={{ width: "15%" }}
                  sortable
                  sortField="type"
                  header="Loại"
                  body={(rowData) => <span>{getType(rowData.type)}</span>}
                ></Column>
                <Column
                  header="Chức năng"
                  headerStyle={{ width: "30%" }}
                  body={(rowData) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
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
                        tooltip="Xem chi tiết"
                        raised
                        rounded
                        onClick={() =>
                          navigate("/menu/show", { state: { id: rowData.id } })
                        }
                      />
                      <Button
                        icon={PrimeIcons.USER_EDIT}
                        tooltip="Sửa"
                        raised
                        rounded
                        onClick={() =>
                          navigate("/menu/edit", { state: { id: rowData.id } })
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
          </div>
        </div>
      </ContentMain>
    </>
  );
}

export default MenuList;
