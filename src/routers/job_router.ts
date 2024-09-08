import { Router,  } from "express";
import { jobController } from "../controllers/job_controller";

const jobsRouter = Router();

jobsRouter.post("/", jobController.create);

export default jobsRouter;