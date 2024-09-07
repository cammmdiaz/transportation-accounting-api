import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { BudgetRequest } from "../requests/budget_request";
import { Budget, FixedCost, UnitType, VariableCost } from "../utils/entity";

class BudgetService {
    createDraft(budgetRequest: BudgetRequest): Budget {
        // 1. calculate fixed costs
        const totalFixedCosts: number = this.calculateFixedCosts(budgetRequest.fixedCosts);

        // 2. calculate variable costs
        const {
            variableCosts,
            hoursPerDay,
            totalDays,
            unitType,
            quantityTripsPerDay
        } = budgetRequest;
        const totalVariableCosts: number = this.calculateVariableCosts({
            variableCosts,
            hoursPerDay,
            totalDays,
            unitType,
            quantityTripsPerDay
        });

        // 3. calculate total cost
        const totalCost = totalFixedCosts + totalVariableCosts;

        // 4. calculate profite
        const profit = totalCost * (budgetRequest.profitPercentage / 100);

        // 5. calculate final amount
        const totalAmount = totalCost + profit;

        // 6. create response
        return {
            amountPerVariableCost: totalVariableCosts,
            amountPerFixedCost: totalFixedCosts,
            totalCost,
            profit,
            budgetFinalAmount: totalAmount
        } as Budget
    }

    private calculateFixedCosts(fixedCosts: FixedCost[]): number {
        return fixedCosts.reduce((accumulator, item) => accumulator + item.amount, 0);
    }

    private calculateVariableCosts(data: {
        variableCosts: VariableCost[],
        hoursPerDay: number,
        totalDays: number,
        unitType: UnitType,
        quantityTripsPerDay?: number
    }): number {
        if (data.unitType === UnitType.TRIP) {
            if (!data.quantityTripsPerDay) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "quantityTripsPerDay is missing when you want the budget per trip.");
            }

            return data.variableCosts.reduce(
                (accumulator, item) => accumulator + (
                    item.costs.reduce((acc, i) => acc + i.amount, 0)
                ), 0) * data.quantityTripsPerDay * data.totalDays;
        }

        return data.variableCosts.reduce(
            (accumulator, item) => accumulator + (
                item.costs.reduce((acc, i) => acc + i.amount, 0)
            ), 0) * data.totalDays;
    }
}

export const budgetService = new BudgetService();