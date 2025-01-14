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
      },
      location: {
            type: String,
            required: [true, 'User must have a location'],
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
