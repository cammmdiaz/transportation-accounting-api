export enum ResourceType {
    TRUCK,
    MACHINE,
    DRIVER,
    OTHER,
}

export enum UnitType {
    TRIP,
    HOUR,
}

export interface Cost {
    description: string;
    resourceType: ResourceType,
}

export interface CostPerResource {
    amount: number;
    description: string;
}

export interface VariableCost extends Cost {
    costs: CostPerResource[];
}

export interface FixedCost extends Cost {
    amount: number;
}

export interface Budget {
    amountPerVariableCost: number;
    amountPerFixedCost: number;
    totalCost: number;
    profit: number;
    budgetFinalAmount: number;
}