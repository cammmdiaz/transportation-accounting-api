import { append, read } from "../database/database_file";
import { Job } from "./job";

const PATH = "./job.json";

class JobModel {
    async create(newJob: Job) {
        await append(PATH, newJob);
    }

    async getOverlappingDateRanges(newFrom: Date, newTo: Date): Promise<Job[]> {
        const jobs: Job[] = await read(PATH) as Job[];

        return jobs.filter(
            ({ from, to }) => newFrom <= new Date(to) && newTo >= new Date(from)
        );
    }
}

export const jobModel = new JobModel();