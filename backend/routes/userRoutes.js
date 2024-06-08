import express from "express"
import protectRoute from "../middleware/protectroute.js"
import { getusersforsidebar } from "../controllers/usercontroller.js";
const router =express.Router();

router.get("/",protectRoute,getusersforsidebar);

export default router;
