import { z } from "zod";

const companyRequestSchema = z.object({
    name: z.string({
            required_error: "Name is required",
        })
        .length(4),
    password: z.string({
        required_error: "Password is required",
    })
    .length(6),
});

export interface CompanyRequest {
    name: string,
    password: string,
}

export function validateCompany(schema: {}) {
    return companyRequestSchema.safeParse(schema);
}