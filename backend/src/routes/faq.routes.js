import e, {Router} from "express"
import checkUser from "../middlewares/auth.middleware.js";
import { createFaqController } from "../controllers/createFaq.controller.js";

const faqRouter = Router()

faqRouter.post("/create-faq/:botId",checkUser, createFaqController );



export default faqRouter