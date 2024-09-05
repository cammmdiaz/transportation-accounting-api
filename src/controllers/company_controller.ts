import { Company } from "../models/company";
import { companyModel } from "../models/company_model";
import { CompanyRequest, validateCompany } from "../requests/company_request";
import { CompanyResponse } from "../responses/company_response";

class CompanyController {
    async create(newCompany: {}): Promise<any> {
        try {
            const resultValidation = validateCompany(newCompany);
            if (!resultValidation.success) {
                // TODO: add exception
            }

            const result: Company = await companyModel.create(newCompany as CompanyRequest);
            const response: CompanyResponse = { code: result.code, token: result.token }

            return response;
        } catch (e) {
            // TODO: add exception
        }        
    }
}

export const companyController = new CompanyController();