import { Router } from "express";
import companiesRouter from "./company_router";

const indexRouter = Router();

indexRouter.use("/company", companiesRouter);

export default indexRouter;