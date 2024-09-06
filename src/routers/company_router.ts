import { Router, Request, Response, NextFunction } from "express";
import { companyController } from "../controllers/company_controller";
import { CompanyException } from "../exceptions/company_exception";
import { StatusCodes } from "http-status-codes";

const companiesRouter = Router();

companiesRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = companyController.create(request.body)
        response.status(StatusCodes.CREATED).json({ result, code: "SUCCESS" });
    } catch (e) {
        console.log("CAPTURO EL ERROR")
        if (e instanceof CompanyException) {
            response.status(e.getStatusCode()).json({ message: JSON.parse(e.message), code: "ERROR" });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e, code: "ERROR" });
        }
    }
});

export default companiesRouter;