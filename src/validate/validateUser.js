import * as Yup from "yup";

const validateCUser = Yup.object({
  firstname: Yup.string()
    .required("Họ là bắt buộc")
    .min(2, "Họ phải có ít nhất 2 ký tự")
    .max(10, "Họ không được vượt quá 10 ký tự"),
  lastname: Yup.string()
    .required("Tên là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(20, "Tên không được vượt quá 20 ký tự"),

  email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
    ),
  confirmPassword: Yup.string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu xác nhận phải giống với mật khẩu"
    ),
  phoneNumber: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d{10,11}$/, "Số điện thoại phải có từ 10 đến 11 chữ số"),
});
const validateUUser = Yup.object({
  firstname: Yup.string()
    .required("Họ là bắt buộc")
    .min(2, "Họ phải có ít nhất 2 ký tự")
    .max(10, "Họ không được vượt quá 10 ký tự"),
  lastname: Yup.string()
    .required("Tên là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(20, "Tên không được vượt quá 20 ký tự"),
  username: Yup.string()
  .required("Tên tài khoản là bắt buộc")
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(30, "Tên không được vượt quá 30 ký tự")
  .matches(
    /^[a-zA-Z0-9]+$/,
    "Tên tài khoản không được có đấu hoặc ký tự đặc biệt"
  ),
  email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  password: Yup.string()
  .nullable()
  .when([], { // Use an empty array to avoid referencing the "password" field
    is: (val) => !!val,
    then: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
      ),
  }),
confirmPassword: Yup.string().when("password", {
  is: (password, schema) => password && schema.password, // Validate if "password" field is truthy and exists
  then: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu xác nhận phải giống với mật khẩu"
  ),
}),
  phoneNumber: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d{10,11}$/, "Số điện thoại phải có từ 10 đến 11 chữ số"),
});
export { validateCUser, validateUUser };
