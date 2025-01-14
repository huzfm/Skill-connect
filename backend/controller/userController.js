const User = require('../models/userModel');

// userController.js

// Function to get user with jobs
exports.getUserWithJobs = async (req, res) => {
      try {
            const userId = req.params.id; // Get userId from the request parameters
            const user = await User.findById(userId).populate('jobs'); // Fetch user with jobs
            if (!user) {
                  return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user); // Send the user data back to the client
      } catch (err) {
            res.status(500).json({ message: 'Error fetching user with jobs', error: err });
      }
};

// PATCH Request: Update job details
exports.updateJob = async (req, res) => {
      try {
            const jobId = req.params.id; // Get jobId from the request parameters
            const updates = req.body; // Get the updates from the request body

            const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
                  new: true, // Return the updated document
                  runValidators: true, // Validate data before applying updates
            });

            if (!updatedJob) {
                  return res.status(404).json({ message: 'Job not found' });
            }

            res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
      } catch (err) {
            res.status(500).json({ message: 'Error updating job', error: err });
      }
};

// DELETE Request: Delete a specific job
exports.deleteJob = async (req, res) => {
      try {
            const jobId = req.params.id; // Get jobId from the request parameters

            // Find and delete the job
            const deletedJob = await Job.findByIdAndDelete(jobId);

            if (!deletedJob) {
                  return res.status(404).json({ message: 'Job not found' });
            }

            // Optionally, remove the job reference from the associated user
            await User.findByIdAndUpdate(deletedJob.user, {
                  $pull: { jobs: jobId }, // Remove the job ID from the user's jobs array
            });

            res.status(200).json({ message: 'Job deleted successfully' });
      } catch (err) {
            res.status(500).json({ message: 'Error deleting job', error: err });
      }
};





// POST
exports.getAllUsers = async (req, res) => {
      try {
            const user = await User.find().populate('jobs')
            res.status(201).json(user)
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// POST with ID
exports.getUser = async (req, res) => {
      try {
            const user = await User.findById(req.params.id).populate('jobs')
            res.status(201).json(user)
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// PATCH 
exports.updateUser = async (req, res) => {
      try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
                  runValidators: true
            })
            res.status(201).json({ user })
      } catch (err) {
            res.status(404).json(err.message)
      }
}

// delete
exports.deleteUser = async (req, res) => {
      try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(201).json("user has been deleted")
      } catch (err) {
            res.status(404).json(err.message)
      }
}
