import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()
// router.route('/register').post(registerUser)
router.route("/greet").post((req, res) => {
    res.json({
        message: "Hello, World!"

    })
})

router.route("/register").post(registerUser)

export default router;