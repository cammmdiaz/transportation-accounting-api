import { BudgetRequest, budgetRequestSchema } from "./budget_request";
import { z } from "zod";

function isValidDateFormat(dateString: string): boolean {
    // Format: YYYY-MM-DD
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };
  
function isFutureDate(dateString: string): boolean {
    const date = new Date(`${dateString}T00:00:00`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
};

const jobRequestSchema = z
    .object({
        from: z
        .string()
        .refine(isValidDateFormat, {
            message: "The 'from' date must be in 'YYYY-MM-DD' format.",
        })
        .refine(isFutureDate, {
            message: "The 'from' date should be greater or equals than the current date.",
        }),
        to: z
        .string()
        .refine(isValidDateFormat, {
            message: "The 'to' date must be in 'YYYY-MM-DD' format.",
        })
        .refine(isFutureDate, {
            message: "The 'to' date should be greater or equals than the current date.",
        }),
        budget: budgetRequestSchema,
        forceCreate: z.boolean().optional(),
    });

export interface JobRequest {
    from: string;
    to: string;
    budget: BudgetRequest;
    forceCreate?: boolean;
}

export function validateJobData(data: {}) {
    return jobRequestSchema.safeParse(data);
}