import { UnitType } from "../utils/entity";

export interface BudgetResponse {
    amountPerVariableCost: number;
    amountPerFixedCost: number;
    totalCost: number;
    profit: number;
    budgetFinalAmount: number;
    unitType: UnitType;
}
