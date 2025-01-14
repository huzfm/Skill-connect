const express = require('express')
const authController = require('./../controller/authController')
const userController = require('./../controller/userController')
const jobController = require('./../controller/jobController')
const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router
      .route('/')
      .get(userController.getAllUsers)


router.get('/:id', userController.getUserWithJobs);



router
      .route('/:id')
      .get(userController.getUser)
      .patch(userController.updateUser)
      .delete(userController.deleteUser)
      .patch(userController.updateJob)
      .delete(userController.deleteJob)

module.exports = router