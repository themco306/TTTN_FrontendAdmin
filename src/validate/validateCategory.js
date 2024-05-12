import * as Yup from 'yup';

const validateCategory = Yup.object({
  name: Yup.string()
    .required('Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(30, 'Tên không được vượt quá 30 ký tự'),
  description: Yup.string()
    .required('Mô tả là bắt buộc')
    .max(200, 'Mô tả không được quá 200 ký tự'),
});

export default validateCategory;