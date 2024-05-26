import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

import { InputText } from "primereact/inputtext";

import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import StaticData from "../../helpers/StaticData";
import { useDispatch, useSelector } from "react-redux";
import categoryApi from "../../api/categoryApi";
import { categoryActions } from "../../state/actions/categoryActions";
import productApi from "../../api/productApi";
import galleryApi from "../../api/galleryApi";
import FileUpload from "../../components/FileUpload";
import { useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import useCustomException from "../../helpers/useCustomException";
import { toast } from "react-toastify";
import { validateCImage, validateCProduct } from "../../validate/validateProduct";
import ShowValiMsg from "../../validate/ShowValiMsg";
import { Checkbox } from "primereact/checkbox";
import TextEditor from "../../components/TextEditor";
import brandApi from "../../api/brandApi";
import { brandActions } from "../../state/actions/brandActions";

function ProductAdd() {
  const stepperRef = useRef(null);
  const handleException = useCustomException();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const { id } = useSelector((state) => state.authReducer.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [status, setStatus] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [images, setImages] = useState([]);
  const [errors,setErrors]=useState({})
  const [comeBack,setComeBack]=useState(true);
  const handleFilesUploaded = (files) => {
    console.log("dataform child 1", files);

    setImages(files);
  };
  const categoryData = useSelector(
    (state) => state.categoryReducers.categories
  );
  const brandData = useSelector(
    (state) => state.brandReducers.brands
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response.data);
        dispatch(categoryActions.listCategory(response.data));
      } catch (error) {
        if(error.response?.status){
          handleException(error)

        }
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await brandApi.getAll();
        console.log(response.data);
        dispatch(brandActions.listBrand(response.data));
      } catch (error) {
        if(error.response?.status){
          handleException(error)

        }
      }
    };
    fetchData();
  }, []);
  const handleUploadImages = async (id) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    

    try {
      const response = await galleryApi.add(id, formData);
      if (response.status === 200) {
        return
      } else {
        toast.error("Bạn chưa nhập đủ thông tin")
      }
    } catch (error) {
      if(error.response?.status){
        handleException(error)
      }
    }
  };
  const handleNext=async()=>{
    try{
      await validateCProduct.validate({name,description,detail,quantity,buyingPrice,comparePrice,salePrice,selectedCategory,selectedBrand},{abortEarly:false})
      stepperRef.current.nextCallback();
    }catch(error){
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setErrors(newError);
    }
  }
  const handleAddProduct = async () => {
    try {
      setLoadingAdd(true);
      await validateCImage.validate({images},{abortEarly:false})
      const data = {
        name,
        description,
        detail,
        quantity,
        buyingPrice,
        comparePrice,
        salePrice,
        status,
        productType: "string",
        note: "string",
        categoryId: selectedCategory?.id ?? null,
        brandId: selectedBrand?.id ?? null,
        createdById: id,
        updatedById: id,
      };
      await new Promise((resolve) => setTimeout(resolve, 400));
      const res = await productApi.add(data);
      console.log('d',res);
      if (res.status === 201) {
        if (images.length > 0) {
          console.log("dataform child 2", images);
          await handleUploadImages(res.data.data.id);
        } 
        setLoadingAdd(false);
        toast.success(res.data.message)
        if(comeBack){
          navigate("/product");
        }
      }
    } catch (error) {
      console.log(error)

      setLoadingAdd(false);
      if(error.response?.status){
        handleException(error)
      }else{
        const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      console.log(newError)
      setErrors(newError);
      }
    }
  };
  return (
    <>
      <ContentHeader
        currentPage={"Thêm Sản phẩm"}
        previousPage={"Sản Phẩm"}
        previousPath={"/product"}
      />
      <ContentMain>
        <div className="card flex justify-content-center">
          <Stepper ref={stepperRef} style={{ flexBasis: "30rem" }}>
            <StepperPanel header="Thông tin cơ bản">
              <div className="row ">
                <div className="row col-md-8">
                  <div className=" col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Tên:
                    </label>
                    <InputText
                      variant="filled"
                      id="name"
                      placeholder="Mô hình Luffy"
                      style={{ width: "100%" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <ShowValiMsg>{errors.name}</ShowValiMsg>
                  </div>
                  <div className=" col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Mô tả ngắn:
                    </label>
                    <InputTextarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      style={{ width: "100%" }}
                    />
                    <ShowValiMsg>{errors.description}</ShowValiMsg>

                  </div>
                  <div className=" col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Mô tả chi tiết:
                    </label>
                    <TextEditor initData={detail} setData={setDetail}/>
                    <ShowValiMsg>{errors.detail}</ShowValiMsg>
                  </div>
                </div>
                <div className="  col-md-4">
                  <div className="col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Số lượng:
                    </label>
                    <InputNumber
                      style={{ width: "100%" }}
                      value={quantity}
                      onValueChange={(e) => setQuantity(e.value)}
                    />
                    <ShowValiMsg>{errors.quantity}</ShowValiMsg>

                  </div>
                  <div className="col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Giá Nhập:
                    </label>
                    <InputNumber
                      style={{ width: "100%" }}
                      value={buyingPrice}
                      onValueChange={(e) => setBuyingPrice(e.value)}
                    />
                    <ShowValiMsg>{errors.buyingPrice}</ShowValiMsg>

                  </div>
                  <div className="col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Giá Bán:
                    </label>
                    <InputNumber
                      style={{ width: "100%" }}
                      value={comparePrice}
                      onValueChange={(e) => setComparePrice(e.value)}
                    />
                    <ShowValiMsg>{errors.comparePrice}</ShowValiMsg>

                  </div>
                  <div className="col-md-12">
                    <label htmlFor="name" style={{ display: "block" }}>
                      Giá Khuyến Mãi:
                    </label>
                    <InputNumber
                      style={{ width: "100%" }}
                      value={salePrice}
                      onValueChange={(e) => setSalePrice(e.value)}
                    />
                    <ShowValiMsg>{errors.salePrice}</ShowValiMsg>

                  </div>
                  <div className="col-md-12">
                    <label htmlFor="cate" style={{ display: "block" }}>
                      Danh mục:
                    </label>
                    <Dropdown
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.value)}
                      options={categoryData}
                      id="cate"
                      optionLabel="name"
                      placeholder="Chọn danh mục"
                      style={{ width: "100%" }}
                      filter
                    />
                    <ShowValiMsg>{errors.selectedCategory}</ShowValiMsg>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="brand" style={{ display: "block" }}>
                      Thương hiệu:
                    </label>
                    <Dropdown
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.value)}
                      options={brandData}
                      id="brand"
                      optionLabel="name"
                      placeholder="Chọn thương hiệu"
                      style={{ width: "100%" }}
                      filter
                    />
                    <ShowValiMsg>{errors.selectedBrand}</ShowValiMsg>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="status" style={{ display: "block" }}>
                      Trạng thái:
                    </label>
                    <Dropdown
                      value={status}
                      onChange={(e) => setStatus(e.value)}
                      options={StaticData.statusData}
                      id="status"
                      optionLabel="name"
                      placeholder="Chọn trạng thái"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex pt-4 justify-content-end">
                <Button
                  label="Tiếp"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={handleNext}
                />
              </div>
            </StepperPanel>
            <StepperPanel header="Hình ảnh">
              <div className="flex flex-column h-12rem">
                <FileUpload onFilesUploaded={handleFilesUploaded} />
                <ShowValiMsg>{errors.images}</ShowValiMsg>
             

              </div>
              <div
                className="pt-4"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Button
                    label="Trở lại"
                    severity="secondary"
                    icon="pi pi-arrow-left"
                    onClick={() => {
                      stepperRef.current.prevCallback();
                    }}
                  />
                </div>
                <div>
                <div style={{ display:'flex',alignItems:'center', marginRight: '5px'}}>
            <Checkbox id='comeBack' checked={comeBack} onChange={()=>setComeBack(!comeBack)}/>
            <label htmlFor="comeBack" className="mr-2">Quay về danh sách khi </label>
            
                  <Button
                    label="Thêm"
                    severity="success"
                    icon="pi pi-save"
                    onClick={handleAddProduct}
                    loading={loadingAdd}
                  />
                  </div>
                </div>
              </div>
            </StepperPanel>
          </Stepper>
        </div>
      </ContentMain>
    </>
  );
}

export default ProductAdd;
