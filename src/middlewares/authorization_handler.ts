import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";
import { companyService } from "../services/company_service";
import { Company } from "../models/company";

export async function authorizationHandler(request: Request, response: Response, next: NextFunction) {
    const token: string = request.header("X-Authorization") ?? "";
    const code: string = request.header("X-Company-Code") ?? "";

    if (token === "") {
        return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token.", code: "ERROR" });
    }

    if (code === "") {
        return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid company code.", code: "ERROR" });
    }

    const company: Company | undefined = await companyService.getCompanyByCode(code);
    if (!company || company.token !== token) {
        return response.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid company code or token.", code: "ERROR" });
    }

    next();
}