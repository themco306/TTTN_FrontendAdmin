import * as Yup from "yup";



const validateCProduct = Yup.object({
    name: Yup.string()
      .required("Tên là bắt buộc")
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(200, "Tên không được vượt quá 200 ký tự"),
    description: Yup.string()
      .required("Mô tả là bắt buộc")
      .max(2000, "Mô tả không được vượt quá 2000 ký tự"),
    detail: Yup.string()
    .required("Chi tiết là bắt buộc")
      .max(5000, "Chi tiết không được vượt quá 5000 ký tự"),
    quantity: Yup.number()
    .required("Số lượng là bắt buộc")
      .typeError("Số lượng phải là một số")
      .integer("Số lượng phải là một số nguyên")
      .min(0, "Số lượng không được nhỏ hơn 0"),
    buyingPrice: Yup.number()
    .required("Giá mua là bắt buộc")
      .typeError("Giá mua phải là một số")
      .min(0, "Giá mua không được nhỏ hơn 0"),
    comparePrice: Yup.number()
    .required("Giá so sánh là bắt buộc")

      .typeError("Giá so sánh phải là một số")
      .min(0, "Giá so sánh không được nhỏ hơn 0"),
    salePrice: Yup.number()
    .required("Giá bán  là bắt buộc")

      .typeError("Giá bán phải là một số")
      .min(0, "Giá bán không được nhỏ hơn 0"),
      selectedCategory: Yup.object()
    .required("Vui lòng chọn ít nhất một danh mục"), 
    selectedBrand: Yup.object()
    .required("Vui lòng chọn ít nhất một thương hiệu"), 

  });
  const validateCImage = Yup.object({
    images: Yup.array()
    .min(1, "Phải chọn ít nhất một hình ảnh")



  });
  export { validateCProduct,validateCImage };
  