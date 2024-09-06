import { Router,  } from "express";
import { companyController } from "../controllers/company_controller";
import { GeneralError } from "../errors/general_error";
import { StatusCodes } from "http-status-codes";

const companiesRouter = Router();

companiesRouter.post("/", companyController.create);

export default companiesRouter;