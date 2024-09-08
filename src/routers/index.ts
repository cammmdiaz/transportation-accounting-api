import { Router } from "express";
import companiesRouter from "./company_router";
import budgetsRouter from "./budget_router";
import jobsRouter from "./job_router";

const indexRouter = Router();

indexRouter.use("/budget", budgetsRouter);
indexRouter.use("/company", companiesRouter);
indexRouter.use("/job", jobsRouter);

export default indexRouter;