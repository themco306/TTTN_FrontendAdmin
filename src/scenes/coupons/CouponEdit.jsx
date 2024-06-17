import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import couponApi from '../../api/couponApi';
import productApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';
import { categoryActions } from '../../state/actions/categoryActions';
import { productActions } from '../../state/actions/productActions';
import { validateCoupon } from '../../validate/validateCoupon';
import ContentHeader from '../../components/ContentHeader';
import ContentMain from '../../components/ContentMain';
import { InputText } from 'primereact/inputtext';
import ShowValiMsg from '../../validate/ShowValiMsg';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import useCustomException from '../../helpers/useCustomException';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import appUrl from '../../api/appUrl';
import { couponActions } from '../../state/actions/couponActions';

function CouponEdit() {
    const location = useLocation();
    const couponId = location.state.id;
    const handleException = useCustomException();
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const productData = useSelector((state) => state.productReducers.products);
    const categoryData = useSelector((state) => state.categoryReducers.categories);
    const couponData=useSelector((state) => state.couponReducers.coupon)
    const [code,setCode]=useState('')
    const [discountType,setDiscountType]=useState('Percentage')
    const [discountValue,setDiscountValue]=useState(0)
    const [startDate,setStartDate]=useState(null)
    const [endDate,setEndDate]=useState(null)
    const [usageLimit,setUsageLimit]=useState(0)
    const [usagePerUser,setUsagePerUser]=useState(0)
    const [minimumOrderValue,setMinimumOrderValue]=useState(0)
    const [check,setCheck]=useState(true);
    const [productIds,setProductIds]=useState([])
    const [categoryIds,setCategoryIds]=useState([])
  const[tempPData,setTempPData]=useState(productData)
    const [lSubmit,setLSubmit]=useState(false);
    const [lFecth,setLFecth]=useState(true);
    const [errors,setErrors]=useState({})
    const [comeBack,setComeBack]=useState(true);
    useEffect(()=>{
        const fetchData =async()=>{
          try{
            setLFecth(true)
            const res=await couponApi.get(couponId);
            if(res.status===200){
                dispatch(couponActions.setCoupon(res.data))
                setLFecth(false)
                
              console.log(res.data)
            }
          }catch(error){
            if(error.response?.status){
              handleException(error)
    
            }
          }
        }
        fetchData()
      },[couponId])
      useEffect(()=>{
        if(!lFecth&&couponData!==null){
            setCode(couponData.code)
            setDiscountType(couponData.discountType)
            setDiscountValue(couponData.discountValue)
            setStartDate(new Date(couponData.startDate))
            setEndDate(new Date(couponData.endDate))
            setUsageLimit(couponData.usageLimit)
            setUsagePerUser(couponData.usagePerUser)
            setMinimumOrderValue(couponData.minimumOrderValue)
            if(couponData.applicableProducts!==null){
                setCheck(false)
            }
        }
      },[couponData,lFecth])
    useEffect(() => {
        const fetchData = async () => {
          const response = await productApi.getAll();
          console.log('ppppppp',response.data);
          dispatch(productActions.listProduct(response.data));
          if(couponData.applicableProducts!==null&&couponData.applicableProducts.productIds.length>0){
            const filteredProducts = response.data.filter(product => 
                couponData.applicableProducts.productIds.includes(product.id)
            );
            setProductIds(filteredProducts)
          }
        };
        if(!lFecth){
            fetchData();
        }
       
      }, [lFecth]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await categoryApi.getActive();
            console.log(response.data);
            dispatch(categoryActions.listCategory(response.data));
            if(couponData.applicableProducts!==null&&couponData.applicableProducts.categoryIds.length>0){
                const filteredProducts = response.data.filter(product => 
                    couponData.applicableProducts.categoryIds.includes(product.id)
                );
                setCategoryIds(filteredProducts)
              }
          } catch (error) {
            if(error.response?.status){
              handleException(error)
    
            }
          }
        };
        if(!lFecth){
            fetchData();
        }
      }, [lFecth]);
      // useEffect(()=>{
      //   const newProductData = productData.filter(item => 
      //     !categoryIds.includes(item.category.id) // Loại bỏ những sản phẩm có category ID nằm trong danh sách đã chọn
      // );
      // setProductIds([])
      // // Giả sử bạn có một hàm để cập nhật dữ liệu sản phẩm đã lọc
      // setTempPData(newProductData);
      // },[productData])
      const countryTemplate = (option) => {
        return (
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <img alt={option.name} src={appUrl.imageURL+option.galleries[0].imagePath} style={{ width: '25px' }} />
                <div style={{ marginLeft:5 }}>{option.name}</div>
                <div style={{ marginLeft:5 }}>-Thuộc danh mục: <span style={{ fontWeight:'bold' }}>{option.category.name}</span></div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = productIds ? productIds.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b>  được chọn.
            </div>
        );
    };
    const handleSelectCategory = (e) => {
      console.log(e.value);
      setCategoryIds(e.value);
  
      const categoryIds = e.value.map(category => category.id); // Lấy danh sách ID của các category đã chọn
  
      const newProductData = productData.filter(item => 
          !categoryIds.includes(item.category.id) // Loại bỏ những sản phẩm có category ID nằm trong danh sách đã chọn
      );
      setProductIds([])
      // Giả sử bạn có một hàm để cập nhật dữ liệu sản phẩm đã lọc
      setTempPData(newProductData);
  }
  const createTempApplicableProducts = () => {
    if (productIds.length === 0 && categoryIds.length === 0) {
        return null;
    } else {
        return {
            categoryIds: categoryIds.map(item=>item.id),
            productIds: productIds.map(item=>item.id)
        };
    }
}
      const handleSubmit=async()=>{
        try {
          setLSubmit(true)
          await validateCoupon.validate({code,startDate,endDate},{abortEarly:false})
          const tempApplicableProducts = createTempApplicableProducts();
          const isoStartDate = new Date(startDate).toISOString();
        const isoEndDate = new Date(endDate).toISOString();
          const data={
            code,
            discountType,
            discountValue,
            startDate:isoStartDate,
            endDate:isoEndDate,
            usageLimit,
            usagePerUser,
            minimumOrderValue,
            applicableProducts:tempApplicableProducts,
            status:0
          }
          console.log(data)
         
          const response=await couponApi.update(couponId,data)
          if(response.status===200){
            toast.success(response.data.message)
            setLSubmit(false)
            if(comeBack){
              navigate('/coupon')
             }
          }
        } catch (error) {
          if (error.response?.status) {
            handleException(error);
          } else {
            const newError = {};
            error.inner.forEach((e) => {
              newError[e.path] = e.message;
            });
            console.log(newError)
            setErrors(newError);
          }
          setLSubmit(false)
        }
      }
  return (
    <>
    <ContentHeader
           currentPage={"Sửa mã giảm giá"}
           previousPage={"Mã giảm giá"}
           previousPath={"/coupon"}
    />
    <ContentMain>
      <div className="row">
        <div className="col-md-8 row">
          <div className="col-md-6">
            <label htmlFor="code" style={{ display: "block" }}>
              Mã:
            </label>
            <InputText
            readOnly
              variant="filled"
              id="code"
              placeholder="GIAM50K"
              style={{ width: "100%" }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <ShowValiMsg>{errors.code}</ShowValiMsg>
          </div>
          <div className="col-md-6">
            <label htmlFor="usageLimit" style={{ display: "block" }}>
              Số lượng mã:
            </label>
            <InputNumber
              variant="filled"
              id="usageLimit"
              style={{ width: "100%" }}
              value={usageLimit}
              onValueChange={(e) => setUsageLimit(e.target.value)}
            />
           

          </div>
         
          <div className="col-md-6">
            <label htmlFor="usagePerUser" style={{ display: "block" }}>
              Lượt dùng/người:
            </label>
            <InputNumber
              variant="filled"
              id="usagePerUser"
              style={{ width: "100%" }}
              value={usagePerUser}
              onValueChange={(e) => setUsagePerUser(e.target.value)}
            />
         

          </div>
          <div className="col-md-6">
            <label htmlFor="minimumOrderValue" style={{ display: "block" }}>
              Giá tối thiểu để dùng (VND):
            </label>
            <InputNumber
              variant="filled"
              id="minimumOrderValue"
              suffix=' VND'
              style={{ width: "100%" }}
              value={minimumOrderValue}
              onValueChange={(e) => setMinimumOrderValue(e.target.value)}
            />
           

          </div>
          <div className="col-md-6">
            <label htmlFor="startDate" style={{ display: "block" }}>
              Ngày bắt đầu:
            </label>
            <Calendar dateFormat="dd/mm/yy"  style={{ width: "100%" }} id="startDate" value={startDate} onChange={(e) => setStartDate(e.value)} showTime hourFormat="12" touchUI minDate={new Date()} />
            <ShowValiMsg>{errors.startDate}</ShowValiMsg>

          </div>
          <div className="col-md-6">
            <label htmlFor="endDate" style={{ display: "block" }}>
              Ngày kết thúc:
            </label>
            <Calendar dateFormat="dd/mm/yy"  style={{ width: "100%" }} id="endDate" value={endDate} onChange={(e) => setEndDate(e.value)} showTime hourFormat="12" touchUI minDate={startDate}  />
            <ShowValiMsg>{errors.endDate}</ShowValiMsg>

          </div>

        </div>
        <div className='col-md-4 row'>
        <div className="col-md-12">
              <label  style={{ display: "block" }}>
                Loại giảm:
              </label>
              <div className="row">
                <div
                  className="col-md-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <RadioButton
                    inputId="Percentage"
                    name="gender"
                    value={"Percentage"}
                    onChange={(e) => {setDiscountType(e.value);setDiscountValue(0)}}
                    checked={discountType==="Percentage"}
                  />
                  <label htmlFor="Percentage" className="ml-2">
                    Theo %
                  </label>
                </div>
                <div
                  className="col-md-6 "
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <RadioButton
                    inputId="FixedAmount"
                    name="gender"
                    value={"FixedAmount"}
                    onChange={(e) => {setDiscountType(e.value);setDiscountValue(0)}}
                    checked={discountType==="FixedAmount"}
                  />
                  <label htmlFor="FixedAmount" className="ml-2">
                    Trực tiếp
                  </label>
                </div>
              </div>
        </div>
            
            {discountType==="Percentage"?(
            <div className="col-md-12">
              <label  style={{ display: "block" }}>
                % Giảm:
              </label>
              <InputNumber
              variant="filled"
              id="discountValue"
              suffix=' %'
              min={0}
              max={100}
              style={{ width: "100%" }}
              value={discountValue}
              onValueChange={(e) => setDiscountValue(e.target.value)}
            />
            <ShowValiMsg>{errors.discountValue}</ShowValiMsg>
            </div>
            ):(
                <div className="col-md-12">
              <label  style={{ display: "block" }}>
                VND Giảm:
              </label>
              <InputNumber
              variant="filled"
              id="discountValue"
              min={0}
              suffix=' VND'
              style={{ width: "100%" }}
              value={discountValue}
              onValueChange={(e) => setDiscountValue(e.target.value)}
            />
            <ShowValiMsg>{errors.discountValue}</ShowValiMsg>
            </div>
            )}
            <div className="col-md-12">

            </div>
            
        </div>
        <div className='col-md-12 '>
        <label style={{ display: "block" }}>
             Sản phẩm áp dụng:
        </label>
        <div className="col-md-12 mb-2">
        Tất cả
             <Checkbox checked={check} onChange={()=>{setCheck(!check)}} style={{ marginLeft:5 }}/>
             </div>
        {!check&&(
        <div className='row'>
              <div className='col-md-4'>
              <MultiSelect loading={lFecth} value={categoryIds} onChange={(e) => handleSelectCategory(e)} options={categoryData} optionLabel="name" 
                filter placeholder="Chọn danh mục" maxSelectedLabels={3} style={{ width:"100%" }} />
              </div>
        <div className='col-md-6'>
        <MultiSelect loading={lFecth} value={productIds} options={tempPData} onChange={(e) => setProductIds(e.value)} optionLabel="name" 
                placeholder="Chọn sản phẩm" itemTemplate={countryTemplate} panelFooterTemplate={panelFooterTemplate} style={{ width:"100%" }} filter />
        </div>
        </div>
        )}
      
        </div>
        <div
          className="col-md-12"
          style={{ display: "flex", justifyContent: "end",alignItems:'center' }}
        >
          <div style={{ display:'flex',alignItems:'center', marginRight: '5px'}}>
          <Checkbox id='comeBack' checked={comeBack} onChange={()=>setComeBack(!comeBack)}/>
          <label htmlFor="comeBack">Quay về danh sách khi </label>
          </div>
          <Button  loading={lSubmit} onClick={handleSubmit} severity="success">Cập nhật</Button>
          

        </div>
      </div>
    </ContentMain>
  </>
  )
}

export default CouponEdit
