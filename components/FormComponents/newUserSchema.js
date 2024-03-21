import { z } from "zod";
const UserSchema = z
    .object({
        firstName: z
            .string({ required_error: " Cannot be empty" })
            .min(1, { message: "Cannot be empty" }),
        lastName: z.string(),
        email: z.string().email().min(1),
        phone: z.string().min(10, {message : 'Invalid phone number '}).max(10),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        addressFirst: z.string().min(1),
        addressSecond: z.string(),
        city: z.string().min(1),
        state: z.string().min(1),
        zipCode: z.string().length(5),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export default UserSchema;
