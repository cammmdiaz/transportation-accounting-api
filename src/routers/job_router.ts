import { Router,  } from "express";
import { jobController } from "../controllers/job_controller";
import { authorizationHandler } from "../middlewares/authorization_handler";

const jobsRouter = Router();

jobsRouter.post("/", authorizationHandler, jobController.create);
jobsRouter.get("/:id", authorizationHandler, jobController.getById);
jobsRouter.get("/all", authorizationHandler, jobController.getAll);

export default jobsRouter;