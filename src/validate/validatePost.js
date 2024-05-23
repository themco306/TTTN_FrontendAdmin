import * as Yup from 'yup';

const validateCPost = Yup.object({
  name: Yup.string()
    .required('Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được vượt quá 100 ký tự'),
    detail: Yup.string()
    .required('Chi tiết là bắt buộc')
    .min(2, 'Chi tiết phải có ít nhất 2 ký tự')
    .max(50000, 'Chi tiết không được vượt quá 50000 ký tự'),
    image: Yup.mixed()
    .required('Hình ảnh là bắt buộc')
});
const validateUPost = Yup.object({
  name: Yup.string()
    .required('Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được vượt quá 100 ký tự'),
    detail: Yup.string()
    .required('Chi tiết là bắt buộc')
    .min(2, 'Chi tiết phải có ít nhất 2 ký tự')
    .max(50000, 'Chi tiết không được vượt quá 50000 ký tự'),
});

export  {validateCPost,validateUPost};