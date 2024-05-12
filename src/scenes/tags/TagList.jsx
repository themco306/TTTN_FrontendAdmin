import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import tagApi from "../../api/tagApi";
import useCustomException from "../../helpers/useCustomException";
import { OrderList } from "primereact/orderlist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { validateUtag } from "../../validate/validateTag";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { Checkbox } from "primereact/checkbox";

function TagList() {
  const [tags, setTags] = useState([]);
  const [selectTag, setSelectTag] = useState(null);
  const [name, setName] = useState("");
  const [status,setStatus]=useState(false)
  const [errors, setErrors] = useState({});
  const handleException = useCustomException();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tagApi.getAll();
        console.log(response);
        setTags(response.data);
        setSelectTag(response.data[0]);
        setName(response.data[0].name);
        setStatus(response.data[0].status);
      } catch (error) {
        if (error.response?.status) {
          handleException(error);
        }
      }
    };
    fetchData();
  }, []);

  const handleTagNameChange = (id, newName,newStatus) => {
    const updatedTags = tags.map((tag) => {
      if (tag.id === id) {
        return { ...tag, name: newName,status:newStatus };
      }
      return tag;
    });
    setTags(updatedTags);
  };
  const handleSubmitChangeSort = async () => {
    console.log(tags);
    try {
      const data = {
        ids: tags.map((tag) => tag.id),
      };
      const response = await tagApi.updateSort(data);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      handleException(error);
    }
  };
  const handleSubmitChangeName = async () => {
    try {
      await validateUtag.validate({ name }, { abortEarly: false });
      const data = {
        name,
        status,
      };
      console.log(data);
      const response = await tagApi.updateName(selectTag.id, data);
      console.log("llll", response);
      if (response.status === 200) {
        handleTagNameChange(selectTag.id, response.data.data.name,response.data.data.status);
        setSelectTag(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response?.status) {
        handleException(error);
      } else {
        const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        setErrors(newError);
      }
    }
  };
  const itemTemplate = (item) => {
    return (
      <div className="row " style={{ display: "flex", alignItems: "center" }}>
        <div className="col-md-4">
          <span>
            Tên hiển thị:{" "}
            <span style={{ fontWeight: "bold" }}>{item.name}</span>{" "}
          </span>
        </div>
        <div className="col-md-8">
          <span style={{ fontSize: 15 }}>
            Công dụng: <span style={{ color: "red" }}>{item.description}</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <ContentHeader
        currentPage={"Vị trí sản phẩm"}
        previousPage={"Trang chủ"}
      />
      <ContentMain>
        <div className="row">
          <div className="col-md-8 p-2 row">
            <div className="col-md-8">
              <h5>
                Kéo thả và nhấn{" "}
                <span style={{ color: "green" }}>Lưu vị trí</span> để cập nhật
              </h5>
            </div>

            <div
              className="col-md-4"
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                icon="pi pi-edit"
                severity="success"
                onClick={handleSubmitChangeSort}
              >
                Lưu vị trí
              </Button>
            </div>
          </div>
          <div className="col-md-6 "></div>
          <div className="col-md-8">
            <OrderList
              dataKey="id"
              value={tags}
              onChange={(e) => {
                setTags(e.value);
              }}
              itemTemplate={itemTemplate}
              dragdrop
            ></OrderList>
          </div>
          <div className="col-md-4">
            <div className="row m-3">
              <div className="col-md-12 row">
                <div className="col-md-8 ">
                  <Dropdown
                    value={selectTag}
                    onChange={(e) => {
                      setSelectTag(e.value);
                      setName(e.value.name);
                      setStatus(e.value.status)
                    }}
                    options={tags}
                    optionLabel="name"
                    placeholder="Chọn thẻ để sửa"
                  />
                </div>
                <div
                  className="col-md-4 "
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label className="mr-1">Hiển thị: </label>
                  <Checkbox checked={status} onChange={()=>setStatus(!status)}/>
                </div>
              </div>
              <div className="col-md-12">
                <InputText
                  style={{ width: "80%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <ShowValiMsg>{errors.name}</ShowValiMsg>
              </div>
            </div>
            <Button label="Sửa" onClick={handleSubmitChangeName} />
          </div>
        </div>
      </ContentMain>
    </>
  );
}

export default TagList;
