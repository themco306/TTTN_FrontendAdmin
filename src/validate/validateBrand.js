import * as Yup from 'yup';

const validateBrand = Yup.object({
  name: Yup.string()
    .required('Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(30, 'Tên không được vượt quá 30 ký tự'),
});

export default validateBrand;