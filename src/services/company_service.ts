import { Company } from "../models/company";
import { CompanyRequest } from "../requests/company_request";
import { companyModel } from "../models/company_model";
import { v4 as uuidv4 } from "uuid";

class CompanyService {
    async create(companyToCreate: CompanyRequest) {
        try {
            const code: string = this.createCompanyCode(companyToCreate.name);
            const existingCompany: Company | undefined = await companyModel.findByCode(code);
            // TODO: then check if we need to include the password (or not => update the next service)
            if (existingCompany) {
                return existingCompany;
            }

            const token = uuidv4();

            const companyToSave: Company = { ...companyToCreate, code, token };

            await companyModel.create(companyToSave);

            return companyToSave;
        } catch (error) {
            throw error;
        }
    }

    async getCompanyByCode(data: {code: string, password: string}): Promise<Company | undefined> {
        try {
            return await companyModel.findByCodeAndPassword(data.code, data.password);
        } catch (error) {
            throw error;
        }
    }

    private createCompanyCode(name: string): string {
        return name.replace(/\s+/g, "").toUpperCase();
    }
}

export const companyService = new CompanyService();
