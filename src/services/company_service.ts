import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { Company } from "../models/company";
import { CompanyRequest, validateCompany } from "../requests/company_request";
import { companyModel } from "../models/company_model";

class CompanyService {
    async create(companyToCreate: CompanyRequest) {
        try {
            const resultValidation = validateCompany(companyToCreate)
            if (!resultValidation.success) {
                console.log("VALIDACION NO ES SUCCESS")
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input: "/* + JSON.stringify(resultValidation.error)*/);
                // customError({})
            }

            const result: Company = await companyModel.create(companyToCreate as CompanyRequest);

            return result;
        } catch (error) {
            throw error;
        }

    }
}

export const companyService = new CompanyService();
