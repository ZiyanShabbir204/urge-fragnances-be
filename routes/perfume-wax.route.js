const express = require("express")

const {createPerfumeWax,getPerfumeWax,getPerfumeWaxByName} = require("../perfume-wax/perfume-wax.controller")

const router = express.Router()

router.post("/",createPerfumeWax)
router.get("/",getPerfumeWax)
router.get("/:name",getPerfumeWaxByName)

module.exports = router