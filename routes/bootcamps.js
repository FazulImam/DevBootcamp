const express = require("express");
const {protect} = require("../middlewares/auth");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require("../controllers/bootcamps");

const router = express.Router();

router.get("/",getBootcamps);

router.get("/:id",getBootcamp);

router.post("/",createBootcamp);

router.put("/:id",updateBootcamp);

router.delete("/:id",deleteBootcamp);

router.get('/radius/:zipcode/:distance',getBootcampsInRadius); 

module.exports = router;