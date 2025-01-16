// const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const Job = require('./jobModel')

// // Defining the schema for the User data in the database
// const userSchema = new mongoose.Schema({
//       email: {
//             type: String,
//             unique: true, // Ensures the email is unique across the collection
//             required: [true, 'User must have an email'],
//             validate: [validator.isEmail, 'Please provide a valid email'], // Email validation
//       },
//       password: {
//             type: String,
//             required: [true, 'User must have a password'],
//             //  minlength: [8, 'Password must be at least 8 characters long'], // Minimum length for password
//       },
//       passwordConfirm: {
//             type: String,
//             required: [true, 'User must confirm the password'],
//             validate: {
//                   // Validates that passwordConfirm matches password
//                   validator: function (val) {
//                         return val === this.password; // Check if the password and confirm password are equal
//                   },
//                   message: 'Passwords must match', // Error message if validation fails
//             },
//       },
//       // Add a reference to the Job model
//       jobs: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Job',
//       }],
// });

// // Middleware to hash the password before saving the user document
// userSchema.pre('save', async function (next) {
//       if (!this.isModified('password')) return next(); // Only hash if password is modified

//       // Hash the password using bcrypt with a salt rounds of 12
//       this.password = await bcrypt.hash(this.password, 12);

//       // Remove the `passwordConfirm` field from the database (we don't store it)
//       this.passwordConfirm = undefined;

//       next(); // Continue the save operation
// });

// // Static method to compare password with the hashed password stored in the database
// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//       return await bcrypt.compare(candidatePassword, userPassword);
// };

// // Create the User model using the schema
// const User = mongoose.model('User', userSchema);

// module.exports = User;



const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Job = require('./jobModel');

// Defining the schema for the User data in the database
const userSchema = new mongoose.Schema({
      email: {
            type: String,
            unique: true,
            required: [true, 'User must have an email'],
            validate: [validator.isEmail, 'Please provide a valid email'],
      },
      password: {
            type: String,
            required: [true, 'User must have a password'],
            minlength: [6, 'Password must be at least 6 characters long'], // Minimum length of password

      },
      passwordConfirm: {
            type: String,
            required: [true, 'User must confirm the password'],
            validate: {
                  validator: function (val) {
                        return val === this.password;
                  },
                  message: 'Passwords must match',
            },
      },
}, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
});

// Virtual to populate jobs created by the user
userSchema.virtual('jobs', {
      ref: 'Job', // The model to reference
      localField: '_id', // Field in the User model to match
      foreignField: 'user', // Field in the Job model to match
});

// Middleware to hash the password before saving the user document
userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();

      this.password = await bcrypt.hash(this.password, 12);
      this.passwordConfirm = undefined;

      next();
});

// Static method to compare password with the hashed password stored in the database
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
      return await bcrypt.compare(candidatePassword, userPassword);
};

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
