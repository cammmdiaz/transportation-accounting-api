import { StatusCodes } from "http-status-codes";
import { Company } from "../models/company";
import { CompanyRequest } from "../requests/company_request";
import { CompanyResponse } from "../responses/company_response";
import { Request, Response, NextFunction } from "express";
import { companyService } from "../services/company_service";

class CompanyController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newCompany = request.body ?? {};

            const result: Company = await companyService.create(newCompany as CompanyRequest);
            const companyResponse: CompanyResponse = { code: result.code, token: result.token };

            response.status(StatusCodes.CREATED).json({ result: companyResponse, code: "SUCCESS" });
        } catch (e) {
            next(e)
        }
    }

    async getTokenByCode(request: Request, response: Response, next: NextFunction) {
        try {
            const codeQuery = request.query?.code ?? "";
            const code = codeQuery as string;
            const password = request.header("password") ?? "";

            const existingCompany: Company | undefined = await companyService.getCompanyByCode({code, password});

            response.status(StatusCodes.OK).json({ result: { token: existingCompany?.token }, code: "SUCCESS" });
        } catch (e) {
            next(e)
        }
    }
}

export const companyController = new CompanyController();