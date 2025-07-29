import { Router } from "express";

import v0Routes from "./v0/index"


const router = Router()

router.get("/ckeck", (req, res) => {
    res.status(200).json({
        status: "true",
        message: "Accessing the v0 routes",
        timestamp: new Date().toISOString()
    });
    return
})

router.use("/v0", v0Routes)

export default router


