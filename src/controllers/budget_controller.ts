import { Request, Response, NextFunction } from "express";

class BudgetController {
    async createDraft(request: Request, response: Response, next: NextFunction) {
        try {

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
