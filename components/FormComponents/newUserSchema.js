import { z } from "zod";
export const UserSchema = z
    .object({
        firstName: z
            .string({ required_error: "First name cannot be empty" })
            .min(1, { message: "Cannot be empty" }),
        lastName: z.string({ required_error: "Last name cannot be empty" }),
        email: z.string({ required_error: " Email cannot be empty" }).email().min(1),
        phone: z.string().min(10, {message : 'Invalid phone number '}).max(10),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        addressFirst: z.string({ required_error: " Address cannot be empty" }).min(1),
        addressSecond: z.string(),
        city: z.string({ required_error: " City cannot be empty" }).min(1),
        state: z.string().min(1),
        zipCode: z.string({ required_error: " Zip code cannot be empty" }).min(5),
        membership: z.string(),
        gender: z.string(),
        DOB: z.date({ required_error: " Date of birth cannot be empty" })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const giftCardEmails = z.object({
    toEmail : z.string().email().min(1),
    fromEmail : z.string().email().min(1)
});

export const updateUserProfileSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().min(1),
    phone: z.string().min(10, {message : 'Invalid phone number '}).max(10),
    addressFirst: z.string({ required_error: " Address cannot be empty" }).min(1),
    addressSecond: z.string(),
    city: z.string({ required_error: " City cannot be empty" }).min(1),
    state: z.string().min(1),
    zipCode: z.string({ required_error: " Zip code cannot be empty" }).min(5)
});

export const newToolSchema = z.object({
    category: z.string().min(1),
    type: z.string().min(1),
});

export const newToolDigitsSchema = z.object({
    weight: z.number().min(0),
    size: z.number().min(0),
    loanFee: z.number().multipleOf(0.01).min(0),
    loanLength: z.number().min(0),
    renewal: z.number().min(0),
    replacementCost: z.number().multipleOf(0.01).min(0)
});