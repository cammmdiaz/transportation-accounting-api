import { StatusCodes } from "http-status-codes";

export class CompanyException extends Error {
    private statusCode: number;
    public message: string;

    constructor(statusCode: StatusCodes, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CompanyException);
        }

        // Object.setPrototypeOf(this, CompanyException.prototype);
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}