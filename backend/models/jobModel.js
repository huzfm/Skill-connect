// const mongoose = require('mongoose')
// const User = require('./userModel')
// // Schema in Dataase
// const jobSchema = new mongoose.Schema({
//       name: {
//             type: String,
//             required: [true, 'User must have a name'],
//       },

//       Job: {

//             type: String,
//             required: [true, 'Please provide a Job'],
//       },
//       location: {
//             type: String,
//             required: [true, 'User must have a location'],
//       },

//       user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: [true, 'Job must be associated with a user'], // Ensure job is associated with a user
//       },
// },

//       {
//             toJSON: {
//                   virtuals: true
//             },
//             toObject: {
//                   virtuals: true
//             }
//       }

// );
// ;


// const Job = mongoose.model('Job', jobSchema);
// module.exports = Job




const mongoose = require('mongoose');
const User = require('./userModel');

// Schema for Job
const jobSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, 'User must have a name'],
      },
      Job: {
            type: String,
            required: [true, 'Please provide a Job'],
            enum: ["Plumber", "Electrician", "Mason", "Labour", "Carpenter"]
      },
      location: {
            type: String,
            required: [true, 'User must have a location'],
      },
      phone: {
            type: String,
            required: [true, 'User must have a Number'],
            minlength: [10, 'Phone number must be 10 digits long'],
            maxlength: [10, 'Phone number must be 10 digits long'],
            match: [/^\d{10}$/, 'Phone number must contain exactly 10 digits']

      },
      rate: {
            type: String,
            required: [true, 'User must have a Rate'],
            minlength: [3, 'Rate should not be less than 3 digits'],
            maxlength: [4, 'Rate should not be more than 4 digits'],
      },
      mode: {
            type: String,
            required: [true, 'User must have a Rate'],
            enum: ["Cash", "Online/UPI"]
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Job must be associated with a user'],
      },
}, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
});

// Create the Job model using the schema
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
