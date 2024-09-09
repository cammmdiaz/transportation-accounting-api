import { Request, Response, NextFunction } from "express";
import { jobService } from "../services/job_service";
import { Job } from "../models/job";
import { JobRequest, validateJobData } from "../requests/job_request";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { JobResponse } from "../responses/job_response";
import { BudgetResponse } from "../responses/budget_response";
import { HeaderType, ResponseType } from "../utils/general_type";

class JobController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const input = request.body;

            const resultValidation = validateJobData(input)
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input for job: " + JSON.stringify(resultValidation.error));
            }

            const companyCode: string = request.header(HeaderType.X_COMPANY_CODE) ?? "";
            const jobRequest: JobRequest = input as JobRequest;

            const result: {
                job?: Job,
                result?: string,
                jobsOverlapping?: any
            } = await jobService.create(jobRequest, companyCode);
            let budgetResponse: BudgetResponse | undefined = undefined;
            if (result.result !== ResponseType.ERROR && result.job) {
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
                id: result.job?.id,
                from: result.job?.from,
                to: result.job?.to,
                bugdet: budgetResponse,
                result: result.result ?? ResponseType.SUCCESS,
                jobsOverlapping: result.jobsOverlapping,
            };

            response.status(result.jobsOverlapping ? StatusCodes.OK : StatusCodes.CREATED).json({ result: jobResponse, code: ResponseType.SUCCESS });
        } catch (e) {
            next(e)
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const jobId: string = request.params?.id ?? "";
            const companyCode: string = request.header(HeaderType.X_COMPANY_CODE) ?? "";

            const result: Job | undefined = await jobService.getById(jobId, companyCode);

            response.status(StatusCodes.OK).json({ result, code: ResponseType.SUCCESS });
        } catch (e) {
            next(e)
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const companyCode: string = request.header(HeaderType.X_COMPANY_CODE) ?? "";

            const result: Job[] = await jobService.getAll(companyCode);

            response.status(StatusCodes.OK).json({ result, code: ResponseType.SUCCESS });
        } catch (e) {
            next(e)
        }
    }
}

export const jobController = new JobController();
