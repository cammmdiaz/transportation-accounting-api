import { StatusCodes } from "http-status-codes";
import { CompanyException } from "../exceptions/company_exception";
import { Company } from "../models/company";
import { companyModel } from "../models/company_model";
import { CompanyRequest, validateCompany } from "../requests/company_request";
import { CompanyResponse } from "../responses/company_response";

class CompanyController {
    async create(newCompany: {}): Promise<any> {
        const resultValidation = validateCompany(newCompany);
        if (!resultValidation.success) {
            console.log("VALIDACION NO ES SUCCESS")
            throw new CompanyException(StatusCodes.BAD_REQUEST, "Incorrect input: " + resultValidation.error);
        }

        try {
            const result: Company = await companyModel.create(newCompany as CompanyRequest);
            const response: CompanyResponse = { code: result.code, token: result.token }

            return response;
        } catch (e) {
            throw new CompanyException(StatusCodes.INTERNAL_SERVER_ERROR, "Internal error: " + e);
        }        
    }
}

export const companyController = new CompanyController();