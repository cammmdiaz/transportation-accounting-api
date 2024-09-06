import { StatusCodes } from "http-status-codes";
import { Company } from "../models/company";
import { CompanyRequest, validateCompany } from "../requests/company_request";
import { CompanyResponse } from "../responses/company_response";
import { Request, Response, NextFunction } from "express";
import { companyService } from "../services/company_service";

class CompanyController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newCompany = request.body ?? {}

            const result: Company = await companyService.create(newCompany as CompanyRequest);
            const companyResponse: CompanyResponse = { code: result.code, token: result.token }

            response.status(StatusCodes.CREATED).json({ result: companyResponse, code: "SUCCESS" });
        } catch (e) {
            next(e)
        }
    }
}

export const companyController = new CompanyController();