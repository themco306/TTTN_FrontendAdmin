
import * as Yup from "yup";

const validateCoupon = Yup.object({
  code: Yup.string()
    .required("Mã là bắt buộc")
    .min(5, "Họ phải có ít nhất 5 ký tự")
    .max(10, "Họ không được vượt quá 10 ký tự"),
    startDate: Yup.string()
    .required("Ngày bắt đầu là bắt buộc"),
    endDate: Yup.string()
    .required("Ngày kết thúc là bắt buộc")
  
});
export {  validateCoupon };
