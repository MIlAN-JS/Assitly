import { Router } from "express";
import checkUser from "../middlewares/auth.middleware.js";
import { dashboardDataController } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router()


dashboardRouter.get("/get-data", checkUser,dashboardDataController)




export default dashboardRouter