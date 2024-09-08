import { Budget } from "../utils/entity";

export interface Job {
    id: string;
    companyId: string;
    from: Date;
    to: Date;
    budget: Budget;
}