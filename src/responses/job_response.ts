import { BudgetResponse } from "./budget_response";

export interface JobResponse {
    from?: Date;
    to?: Date;
    bugdet?: BudgetResponse;
    result: string;
    jobsOverlapping?: JobResponse[];
}