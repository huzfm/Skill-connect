const express = require('express')
const authController = require('./../controller/authController')
const userController = require('./../controller/userController')
const jobController = require('./../controller/jobController')
const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

// router
//       .route('/')
//       .get(userController.getAllUsers)


router.get('/:id', authController.protect, userController.getUserWithJobs);



router
      .route('/:id')
// .patch(userController.updateUser)
// .delete(userController.deleteUser)


module.exports = router