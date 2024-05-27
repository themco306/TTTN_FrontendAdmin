
import * as Yup from "yup";

const validateContent = Yup.object({
  replayContent: Yup.string()
    .required("Nội dung trả lời là bắt buộc")
    .max(3000, "Nội dung trả lời không được vượt quá 3000 ký tự"),
  
});
export {  validateContent };
