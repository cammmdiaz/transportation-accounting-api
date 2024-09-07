import { append, read } from "../database/database_file";
import { Company } from "./company";

const PATH = "./company.json";

class CompanyModel {
    async create(newCompany: Company) {
        await append(PATH, newCompany);
    }

    async findByCode(code: string): Promise<Company | undefined> {
        const companies: Company[] = await read(PATH) as Company[];

        return companies.find(c => c.code === code);
    }

    async findByCodeAndPassword(code: string, password: string): Promise<Company | undefined> {
        const companies: Company[] = await read(PATH) as Company[];

        return companies.find(c => c.code === code && c.password === password);
    }
}

export const companyModel = new CompanyModel();