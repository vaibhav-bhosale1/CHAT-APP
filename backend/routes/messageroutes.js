import express from"express"
import { sendmessage,getmessage } from "../controllers/messagecontroller.js";
import protectRoute from "../middleware/protectroute.js"
const router=express.Router();

router.post("/send/:id",protectRoute,sendmessage)
router.get("/:id",protectRoute,getmessage)

export default router;