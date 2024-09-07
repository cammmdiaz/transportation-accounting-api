import { Request, Response, NextFunction } from "express";
import { budgetService } from "../services/budget_service";
import { BudgetRequest, validateBudgetData } from "../requests/budget_request";
import { Budget } from "../utils/entity";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { BudgetResponse } from "../responses/budget_response";

class BudgetController {
    async createDraft(request: Request, response: Response, next: NextFunction) {
        try {
            // todo missing validation
            const schema = {
                fixedCosts: request.body.fixedCosts,
                variableCosts: request.body.variableCosts,
                hoursPerDay: request.body.hoursPerDay,
                quantityTripsPerDay: request.body.quantityTripsPerDay,
                totalDays: request.body.totalDays,
                unitType: request.body.unitType,
                profitPercentage: request.body.profitPercentage,
            }

            const resultValidation = validateBudgetData(schema)
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input: " + JSON.stringify(resultValidation.error));
            }

            const budgetRequest: BudgetRequest = schema as BudgetRequest;
            const budget: Budget = budgetService.createDraft(budgetRequest);
            const budgetResponse: BudgetResponse = {
                amountPerVariableCost: budget.amountPerVariableCost,
                amountPerFixedCost: budget.amountPerFixedCost,
                totalCost: budget.totalCost,
                profit: budget.profit,
                budgetFinalAmount: budget.budgetFinalAmount,
                unitType: budgetRequest.unitType
            }

            response.status(StatusCodes.OK).json({ result: budgetResponse, code: "SUCCESS" });
        } catch (e) {
            next(e)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {

        } catch (e) {
            next(e)
        }
    }
}

export const budgetController = new BudgetController();
