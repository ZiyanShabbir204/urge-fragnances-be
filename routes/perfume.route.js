const express = require("express")
const {createPerfume,getPerfume,getPefumeByName,updatePerfume} = require("../perfumes/perfumes.controller")


const router = express.Router()

router.post("/",createPerfume)
router.get("/",getPerfume)
// router.get("/",getPerfumeCategory)
router.get("/:name",getPefumeByName)
router.put("/:name",updatePerfume)

module.exports = router