import { FixedCost, UnitType, VariableCost } from "../utils/entity";
import { z } from "zod";

const resourceTypeSchema = z.enum(["TRUCK", "MACHINE", "DRIVER", "OTHER"]); // ResourceType: 'TRUCK', 'MACHINE', 'DRIVER', 'OTHER'
const unitTypeSchema = z.enum(["TRIP", "HOUR"]); // UnitType: 'TRIP' o 'HOUR'

const costPerResourceSchema = z.object({
  amount: z.number().nonnegative(),
  description: z.string(),
});

const costSchema = z.object({
  description: z.string(),
  resourceType: resourceTypeSchema,
});

const variableCostSchema = costSchema.extend({
  costs: z.array(costPerResourceSchema),
});

const fixedCostSchema = costSchema.extend({
  amount: z.number().nonnegative(),
});

const budgetRequestSchema = z.object({
  fixedCosts: z.array(fixedCostSchema),
  variableCosts: z.array(variableCostSchema),
  hoursPerDay: z.number().positive(),
  quantityTripsPerDay: z.number().positive().optional(),
  totalDays: z.number().positive(),
  unitType: unitTypeSchema,
  profitPercentage: z.number().min(0).max(100),
});

export interface BudgetRequest {
    fixedCosts: FixedCost[];
    variableCosts: VariableCost[];
    hoursPerDay: number;
    quantityTripsPerDay?: number;
    totalDays: number;
    unitType: UnitType;
    profitPercentage: number;
}

export interface FinalBudgetRequest extends BudgetRequest {
    from: Date;
    to: Date;
}

export function validateBudgetData(data: {}) {
    return budgetRequestSchema.safeParse(data);
}
