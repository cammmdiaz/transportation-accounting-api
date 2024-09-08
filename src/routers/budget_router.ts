import { Router,  } from "express";
import { budgetController } from "../controllers/budget_controller";
import { authorizationHandler } from "../middlewares/authorization_handler";

const budgetsRouter = Router();

budgetsRouter.post("/", authorizationHandler, budgetController.create);

export default budgetsRouter;