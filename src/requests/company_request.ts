import { z } from "zod";

const companyRequestSchema = z.object({
    name: z.string({
            required_error: "Name is required",
        })
        .min(4, { message: "Name should have to minimum 4 characters" }),
    password: z.string({
        required_error: "Password is required",
    })
    .min(6, { message: "Name should have to minimum 6 characters" }),
});

export interface CompanyRequest {
    name: string,
    password: string,
}

export function validateCompany(schema: {}) {
    return companyRequestSchema.safeParse(schema);
}