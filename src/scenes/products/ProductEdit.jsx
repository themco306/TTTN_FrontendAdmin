import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import FileUpload from '../../components/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from '../../api/categoryApi';
import { categoryActions } from '../../state/actions/categoryActions';
import galleryApi from '../../api/galleryApi';
import productApi from '../../api/productApi';
import StaticData from '../../helpers/StaticData';
import { productActions } from '../../state/actions/productActions';
import { toast } from 'react-toastify';
import { validateCProduct } from '../../validate/validateProduct';
import useCustomException from '../../helpers/useCustomException';
import ShowValiMsg from '../../validate/ShowValiMsg';

function ProductEdit() {
    const location = useLocation();
    const productId = location.state.id;
    const stepperRef = useRef(null);
    const handleException = useCustomException();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingAdd, setLoadingAdd] = useState(false);
    const { id } = useSelector((state) => state.authReducer.user);
    const productData = useSelector(
      (state) => state.productReducers.product
    );
    const categoryData = useSelector(
      (state) => state.categoryReducers.categories
    );
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [comparePrice, setComparePrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [status, setStatus] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [oldImages,setOldImages]=useState([])
    const [errors,setErrors]=useState({})
    useEffect(()=>{
      const fetchData =async()=>{
        try{
          const res=await productApi.get(productId);
          if(res.status===200){
            dispatch(productActions.setProduct(res.data));
            console.log(res.data)
          }
        }catch(error){
          if(error.response?.status){
            handleException(error)
  
          }
        }
      }
      fetchData()
    },[productId])
    const handleFilesUploaded = (files, oldImages) => {
      console.log("data from child", files);
      console.log("old images", oldImages);
    
      // Handle the newly uploaded files and old images here
      setImages(files); // Set the newly uploaded files
      setOldImages(oldImages); // Set the old images
    };
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
      if (productData) {
        setName(productData.name)
        setDescription(productData.description)
        setDetail(productData.detail)
        setQuantity(productData.quantity)
        setBuyingPrice(productData.buyingPrice)
        setComparePrice(productData.comparePrice)
        setSalePrice(productData.salePrice)
        setStatus(productData.status)
        setOldImages(productData.galleries)
        if(categoryData){
          setSelectedCategory(categoryData.find((cate) => cate.id === productData.category?.id));
        }
      }
      
    }, [productData,categoryData]);
    const handleUploadImages = async (id) => {

  
      try {
        const formData = new FormData();
        if(images.length>0){
         images.forEach((image) => {
          formData.append("images", image);
        })}
        if(oldImages.length>0){
          oldImages.forEach((image)=>{
            formData.append("ids",image.id)
          
          });
        }
       
        const response = await galleryApi.update(id, formData);
        
        if (response.status === 204) {
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
        await validateCProduct.validate({name,description,detail,quantity,buyingPrice,comparePrice,salePrice,selectedCategory},{abortEarly:false})
        stepperRef.current.nextCallback();
      }catch(error){
        const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        console.log(newError)
        setErrors(newError);
      }
    }
    const handleUpdateProduct = async () => {
     
      try {
        setLoadingAdd(true);
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
          createdById: id,
          updatedById: id,
        };
        await new Promise((resolve) => setTimeout(resolve, 400));
        const res = await productApi.update(productId,data);
        console.log('dataupdate',res);
        if (res.status === 201) {
          if (images.length > 0||productData.galleries.length!==oldImages.length ) {
           await handleUploadImages(res.data.data.id);
          } 
          dispatch(productActions.updateProduct(res.data.data))
            setLoadingAdd(false);
           toast.success(res.data.message)
          
            navigate("/product");
        }
      } catch (error) {
        if(error.response?.status){
          handleException(error)
  
        }else{
          const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        console.log(newError)
        setErrors(newError);
        setLoadingAdd(false);
        }
      }
    };



  return (
    <>
    <ContentHeader
      currentPage={"Sửa Sản phẩm"}
      previousPage={"Sản Phẩm"}
      previousPath={"/product"}
    />
    <ContentMain>
    {console.log(selectedCategory) }
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
                  <Editor
                    value={detail}
                    onTextChange={(e) => setDetail(e.htmlValue)}
                    style={{ height: "320px" }}
                  />
                     <ShowValiMsg>{errors.detail}</ShowValiMsg>

                  <div dangerouslySetInnerHTML={{ __html: detail }} />
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
                  />
                   <ShowValiMsg>{errors.selectedCategory}</ShowValiMsg>

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
              <FileUpload onFilesUploaded={handleFilesUploaded} showEditData={productData.galleries} />
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
                
                <Button
                  label="Sửa"
                  severity="success"
                  icon="pi pi-save"
                  onClick={handleUpdateProduct}
                  loading={loadingAdd}
                />
              </div>
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </ContentMain>
  </>
  )
}

export default ProductEdit