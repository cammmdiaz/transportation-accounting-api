import { Router } from "express";
import companiesRouter from "./company_router";
import budgetsRouter from "./budget_router";

const indexRouter = Router();

indexRouter.use("/company", companiesRouter);
indexRouter.use("/budget", budgetsRouter);

export default indexRouter;