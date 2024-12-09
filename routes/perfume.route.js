const express = require("express")
const {createPerfume,getPerfume,getPefumeByName} = require("../perfumes/perfumes.controller")


const router = express.Router()

router.post("/",createPerfume)
router.get("/",getPerfume)
router.get("/:name",getPefumeByName)

module.exports = router