import { Request, Response, NextFunction } from "express";
import { budgetService } from "../services/budget_service";
import { BudgetRequest, validateBudgetData } from "../requests/budget_request";
import { Budget } from "../utils/entity";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { BudgetResponse } from "../responses/budget_response";

class BudgetController {
    create(request: Request, response: Response, next: NextFunction) {
        try {
            const input = request.body

            const resultValidation = validateBudgetData(input)
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input: " + JSON.stringify(resultValidation.error));
            }

            const budgetRequest: BudgetRequest = input as BudgetRequest;
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
}

export const budgetController = new BudgetController();
