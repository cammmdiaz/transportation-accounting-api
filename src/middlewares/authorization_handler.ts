import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { companyService } from "../services/company_service";
import { Company } from "../models/company";
import { HeaderType, ResponseType } from "../utils/general_type";

export async function authorizationHandler(request: Request, response: Response, next: NextFunction) {
    const token: string = request.header(HeaderType.X_AUTHORIZATION) ?? "";
    const code: string = request.header(HeaderType.X_COMPANY_CODE) ?? "";

    if (token === "") {
        return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token.", code: ResponseType.ERROR });
    }

    if (code === "") {
        return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid company code.", code: ResponseType.ERROR });
    }

    const company: Company | undefined = await companyService.getCompanyByCode(code);
    if (!company || company.token !== token) {
        return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid company code or token.", code: ResponseType.ERROR });
    }

    next();
}