const express = require('express')
const jobController = require('./../controller/jobController')
const authController = require('./../controller/authController')
const router = express.Router()


router.post('/create', authController.protect, jobController.createjob)
router
      .route('/')
      .get(authController.protect, jobController.getAllJobs)


router
      .route('/:id')
      .get(authController.protect, jobController.getJob)
      .patch(authController.protect, jobController.updateJob)
      .delete(authController.protect, jobController.deleteJob)

module.exports = router