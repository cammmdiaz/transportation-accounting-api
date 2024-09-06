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

const companyRequestGetToken = z.object({
    code: z.string({
        required_error: "code is required",
        }),
    password: z.string({
        required_error: "Password is required",
    }),
});

export interface CompanyRequest {
    name: string,
    password: string,
}

export function validateCompany(schema: {}) {
    return companyRequestSchema.safeParse(schema);
}

export function validateGetTokenData(data: {}) {
    return companyRequestGetToken.safeParse(data);
}