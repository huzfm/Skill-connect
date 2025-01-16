const express = require('express')
const jobController = require('./../controller/jobController')
const authController = require('./../controller/authController')
const router = express.Router()


router.post('/create', authController.protect, jobController.createjob)
router
      .route('/')
      .get(jobController.getAllJobs)


router
      .route('/:id')
      .get(jobController.getJob)
      .patch(jobController.updateJob)
      .delete(jobController.deleteJob)

module.exports = router