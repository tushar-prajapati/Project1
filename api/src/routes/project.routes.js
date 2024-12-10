import { Router } from "express";
import { createProject, getUserProjects, getSingleProject } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createProject").post(verifyJWT, createProject);
router.get("/getProjects", verifyJWT, getUserProjects);
router.get("/singleProject/:projectId", verifyJWT, getSingleProject);


export default router;
