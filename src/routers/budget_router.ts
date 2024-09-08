import { Router,  } from "express";
import { budgetController } from "../controllers/budget_controller";

const budgetsRouter = Router();

budgetsRouter.post("/", budgetController.create);

export default budgetsRouter;