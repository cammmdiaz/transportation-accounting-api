import { StatusCodes } from "http-status-codes";
import { Company } from "../models/company";
import { CompanyRequest, validateCompany, validateGetTokenData } from "../requests/company_request";
import { CompanyResponse } from "../responses/company_response";
import { Request, Response, NextFunction } from "express";
import { companyService } from "../services/company_service";
import { GeneralError } from "../errors/general_error";
import { HeaderType, ResponseType } from "../utils/general_type";

class CompanyController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newCompany = request.body ?? {};

            const resultValidation = validateCompany(newCompany)
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect input for company: " + JSON.stringify(resultValidation.error));
            }

            const result: Company = await companyService.create(newCompany as CompanyRequest);
            const companyResponse: CompanyResponse = { code: result.code, token: result.token };

            response.status(StatusCodes.CREATED).json({ result: companyResponse, code: ResponseType.SUCCESS });
        } catch (e) {
            next(e)
        }
    }

    async getTokenByCode(request: Request, response: Response, next: NextFunction) {
        try {
            const codeQuery = request.query?.code ?? "";
            const code = codeQuery as string;
            const password = request.header(HeaderType.PASSWORD) ?? "";

            const resultValidation = validateGetTokenData({code, password});
            if (!resultValidation.success) {
                throw new GeneralError(StatusCodes.BAD_REQUEST, "Incorrect data: " + JSON.stringify(resultValidation.error));
            }

            const existingCompany: Company | undefined = await companyService.getCompanyByCodeAndPassword({code, password});

            response.status(StatusCodes.OK).json({ result: { token: existingCompany?.token }, code: ResponseType.SUCCESS });
        } catch (e) {
            next(e)
        }
    }
}

export const companyController = new CompanyController();