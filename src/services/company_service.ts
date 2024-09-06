import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { Company } from "../models/company";
import { CompanyRequest, validateCompany } from "../requests/company_request";
import { companyModel } from "../models/company_model";
import { v4 as uuidv4 } from "uuid";

class CompanyService {
    async create(companyToCreate: CompanyRequest) {
        try {
            const resultValidation = validateCompany(companyToCreate)
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input: " + JSON.stringify(resultValidation.error));
            }

            const code: string = this.createCompanyCode(companyToCreate.name);
            const existingCompany: Company | undefined = await companyModel.findByCode(code);
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

    private createCompanyCode(name: string): string {
        return name.replace(/\s+/g, "").toUpperCase();
    }
}

export const companyService = new CompanyService();
