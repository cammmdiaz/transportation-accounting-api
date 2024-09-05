import { Router } from "express";
import { companyController } from "../controllers/company_controller";

const companiesRouter = Router();

companiesRouter.post("/", (request, response) => {
    const result = companyController.create(request.body)

    // TODO: add logic to response
    response.json({ result: "company created" })
});

export default companiesRouter;