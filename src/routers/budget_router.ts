import { Router,  } from "express";
import { budgetController } from "../controllers/budget_controller";

const budgetsRouter = Router();

budgetsRouter.post("/", budgetController.create);
budgetsRouter.post("/draft", budgetController.createDraft);

export default budgetsRouter;