import { Job } from "../models/job";
import { jobModel } from "../models/job_model";
import { JobRequest } from "../requests/job_request";
import { JobResponse } from "../responses/job_response";
import { Budget } from "../utils/entity";
import { budgetService } from "./budget_service";

class JobService {
    async create(jobRequest: JobRequest): Promise<{
        job?: Job,
        result?: string,
        jobsOverlapping?: any
    }> {
        const from: Date = new Date(jobRequest.from);
        const to: Date = new Date(jobRequest.to);

        if (!jobRequest.forceCreate) {
            const jobs: Job[] = await jobModel.getOverlappingDateRanges(from, to);
            if (jobs.length > 0) {
                const existingJobs: JobResponse[] = jobs.map(job => ({
                    ...job,
                    result: "SUCCESS",
                }));

                return {
                    result: "ERROR",
                    jobsOverlapping: existingJobs,
                };
            }
        }

        const budget: Budget = budgetService.createDraft(jobRequest.budget);
        const job: Job = { from, to, budget };
        await jobModel.create(job);

        return { job };
    }
}

export const jobService = new JobService();