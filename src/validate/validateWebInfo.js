import * as Yup from "yup";

const validateWebInfo = Yup.object({
  shopName: Yup.string()
    .required("Tên cửa hàng là bắt buộc")
    .min(2, "Tên cửa hàng phải có ít nhất 2 ký tự")
    .max(30, "Tên cửa hàng không được vượt quá 30 ký tự"),
  email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  phoneNumber: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d{10,11}$/, "Số điện thoại phải có từ 10 đến 11 chữ số"),
});
export { validateWebInfo };
