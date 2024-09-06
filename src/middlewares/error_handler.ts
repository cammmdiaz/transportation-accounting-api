import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { GeneralError } from "../errors/general_error";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof GeneralError) {
        console.log("entro al middleware por la excepcion")
        response.status(error?.getStatusCode() || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
        console.log("entro al middleware NO por la excepcion")
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}