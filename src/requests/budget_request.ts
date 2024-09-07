export enum CostType {
    FIXED,
    VARIABLE,
}

export enum ResourceType {
    TRUCK,
    MACHINE,
    DRIVER,
    OTHER,
}

export enum UnidType {
    TRIP,
    HOUR,
}

export interface Cost {
    description: string;
    costType: CostType,
    resourceType: ResourceType,
}

export interface CostPerResource {
    amount: number;
    description: string;
}

export interface VariableCost extends Cost {
    unidType: UnidType;
    costs: CostPerResource[];
}

export interface FixedCost extends Cost {
    amount: number;
}

export interface BudgetRequest {
    fixedCosts: FixedCost[];
    variableCost: VariableCost[];
    hoursPerDay: number;
    quantityTripsPerDay?: number;
    totalDays: number;
    unidType: UnidType;
    profitPercentage: number;
}

export interface FinalBudgetRequest extends BudgetRequest {
    from: Date;
    to: Date;
}
