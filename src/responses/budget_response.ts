import { UnidType } from "../requests/budget_request";

// TODO: see if we can return all the detail for each cost
export interface BudgetResponse {
    amountPerVariableCost: number;
    amountPerFixedCost: number;
    totalCost: number;
    profit: number;
    budgetFinalAmount: number;
    unidType: UnidType;
}

export interface FinalBudgetResponse extends BudgetResponse {
    from: Date;
    to: Date;
}