import * as Yup from 'yup';

const validatePage = Yup.object({
  name: Yup.string()
    .required('Tên là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được vượt quá 100 ký tự'),
    detail: Yup.string()
    .required('Chi tiết là bắt buộc')
    .min(2, 'Chi tiết phải có ít nhất 2 ký tự')
    .max(5000, 'Chi tiết không được vượt quá 5000 ký tự'),
});

export default validatePage;