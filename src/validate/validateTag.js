import * as Yup from "yup";



const validateUtag = Yup.object({
    name: Yup.string()
      .required("Tên là bắt buộc")
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được vượt quá 50 ký tự"),

  });

  export { validateUtag };
  