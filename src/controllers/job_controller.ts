import { Request, Response, NextFunction } from "express";
import { jobService } from "../services/job_service";
import { Job } from "../models/job";
import { JobRequest, validateJobData } from "../requests/job_request";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { JobResponse } from "../responses/job_response";
import { BudgetResponse } from "../responses/budget_response";

class JobController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const input = request.body;

            const resultValidation = validateJobData(input)
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input: " + JSON.stringify(resultValidation.error));
            }

            const jobRequest: JobRequest = input as JobRequest;
            const result: {
                job?: Job,
                result?: string,
                jobsOverlapping?: any
            } = await jobService.create(jobRequest);
            let budgetResponse: BudgetResponse | undefined = undefined;
            if (result.result !== "ERROR" && result.job) {
                budgetResponse = {
                    amountPerVariableCost: result.job.budget.amountPerVariableCost,
                    amountPerFixedCost: result.job.budget.amountPerFixedCost,
                    totalCost: result.job.budget.totalCost,
                    profit: result.job.budget.profit,
                    budgetFinalAmount: result.job.budget.budgetFinalAmount,
                    unitType: jobRequest.budget.unitType
                }
            }

            const jobResponse: JobResponse = {
                from: result.job?.from,
                to: result.job?.to,
                bugdet: budgetResponse,
                result: result.result ?? "SUCCESS",
                jobsOverlapping: result.jobsOverlapping,
            };

            response.status(StatusCodes.CREATED).json({ result: jobResponse, code: "SUCCESS" });
        } catch (e) {
            next(e)
        }
    }
}

export const jobController = new JobController();
