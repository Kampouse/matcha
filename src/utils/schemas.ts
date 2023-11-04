
import z from 'zod';
import { zfd } from "zod-form-data";
export const registerFormSchema = zfd.formData({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(5).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/),
  re_password: z.string().min(5).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/),
}).refine(data => data.password === data.re_password,
  { message: "passwords do not match", path: ["password", "re_password"] }).refine(data => data.email !== data.username,
    { message: "email and username cannot be the same", path: ["email", "username"], })



