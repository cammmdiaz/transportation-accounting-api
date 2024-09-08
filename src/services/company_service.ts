import { Company } from "../models/company";
import { CompanyRequest } from "../requests/company_request";
import { companyModel } from "../models/company_model";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";

class CompanyService {
    async create(companyToCreate: CompanyRequest) {
        try {
            const code: string = this.createCompanyCode(companyToCreate.name);
            const existingCompany: Company | undefined = await companyModel.findByCode(code);
            if (existingCompany) {
                if (existingCompany.password === companyToCreate.password) {
                    return existingCompany;
                }
                
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Invalid company name.");
            }

            const token = uuidv4();

            const companyToSave: Company = { ...companyToCreate, code, token };

            await companyModel.create(companyToSave);

            return companyToSave;
        } catch (error) {
            throw error;
        }
    }

    async getCompanyByCodeAndPassword(data: {code: string, password: string}): Promise<Company | undefined> {
        try {
            return await companyModel.findByCodeAndPassword(data.code, data.password);
        } catch (error) {
            throw error;
        }
    }

    async getCompanyByCode(code: string): Promise<Company | undefined> {
        try {
            return await companyModel.findByCode(code);
        } catch (error) {
            throw error;
        }
    }

    private createCompanyCode(name: string): string {
        return name.replace(/\s+/g, "").toUpperCase();
    }
}

export const companyService = new CompanyService();
