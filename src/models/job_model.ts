import { append, read } from "../database/database_file";
import { Job } from "./job";

const PATH = "./job.json";

class JobModel {
    async create(newJob: Job) {
        await append(PATH, newJob);
    }

    async getOverlappingDateRanges(newFrom: Date, newTo: Date, companyIdToSearch: string): Promise<Job[]> {
        const jobs: Job[] = await read(PATH) as Job[];

        return jobs.filter(
            ({ from, to, companyId }) => newFrom <= new Date(to) && newTo >= new Date(from) && companyId == companyIdToSearch
        );
    }

    async getById(idToSearch: string, companyIdToSearch: string): Promise<Job | undefined> {
        const jobs: Job[] = await read(PATH) as Job[];
        
        return jobs.find(({ id, companyId }) => id === idToSearch && companyId === companyIdToSearch);
    }

    async getAll(companyIdToSearch: string): Promise<Job[]> {
        const jobs: Job[] = await read(PATH) as Job[];
        
        return jobs.filter(({ companyId }) => companyId === companyIdToSearch);
    }
}

export const jobModel = new JobModel();