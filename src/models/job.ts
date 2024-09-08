import { Budget } from "../utils/entity";

export interface Job {
    from: Date;
    to: Date;
    budget: Budget;
}