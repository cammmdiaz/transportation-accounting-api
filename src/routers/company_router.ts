import { Router,  } from "express";
import { companyController } from "../controllers/company_controller";

const companiesRouter = Router();

companiesRouter.post("/", companyController.create);
companiesRouter.get("/token", companyController.getTokenByCode);

export default companiesRouter;