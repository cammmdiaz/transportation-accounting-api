import { CompanyRequest } from "../requests/company_request";
import { Company } from "./company";

class CompanyModel {
    async create(newCompany: CompanyRequest): Promise<Company> {
        // TODO: add logic
        return {} as Company;
    }
}

export const companyModel = new CompanyModel();