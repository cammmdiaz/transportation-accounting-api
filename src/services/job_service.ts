import { StatusCodes } from "http-status-codes";
import { Company } from "../models/company";
import { Job } from "../models/job";
import { jobModel } from "../models/job_model";
import { JobRequest } from "../requests/job_request";
import { JobResponse } from "../responses/job_response";
import { Budget } from "../utils/entity";
import { budgetService } from "./budget_service";
import { v4 as uuidv4 } from "uuid";
import { companyService } from "./company_service";
import { GeneralError } from "../errors/general_error";
import { ResponseType } from "../utils/general_type";

class JobService {
    async create(jobRequest: JobRequest, companyCode: string): Promise<{
        job?: Job,
        result?: string,
        jobsOverlapping?: any
    }> {
        const from: Date = new Date(jobRequest.from);
        const to: Date = new Date(jobRequest.to);

        const company: Company = await this.getCompany(companyCode);

        if (!jobRequest.forceCreate) {
            const jobs: Job[] = await jobModel.getOverlappingDateRanges(from, to, company.id);
            if (jobs.length > 0) {
                const existingJobs: JobResponse[] = jobs.map(job => ({
                    ...job,
                    result: ResponseType.SUCCESS,
                }));

                return {
                    result: ResponseType.ERROR,
                    jobsOverlapping: existingJobs,
                };
            }
        }

        const budget: Budget = budgetService.createDraft(jobRequest.budget);
        const job: Job = { from, to, budget, id: uuidv4(), companyId: company.id };
        await jobModel.create(job);

        return { job };
    }

    async getById(id: string, companyCode: string): Promise<Job | undefined> {
        const company: Company = await this.getCompany(companyCode);

        return jobModel.getById(id, company.id);
    }

    async getAll(companyCode: string): Promise<Job[]> {
        const company: Company = await this.getCompany(companyCode);

        return jobModel.getAll(company.id);
    }

    private async getCompany(companyCode: string): Promise<Company> {
        const company: Company | undefined = await companyService.getCompanyByCode(companyCode);
        if (!company) {
            throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect company code.");
        }

        return company;
    }
}

export const jobService = new JobService();