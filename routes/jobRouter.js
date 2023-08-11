/******************* IMPORT ************************************************/
import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  createJob,
  getJob,
  editJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js ";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

/******************* ROUTER ************************************************/
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

/******************* EXPORT ************************************************/
export default router;
