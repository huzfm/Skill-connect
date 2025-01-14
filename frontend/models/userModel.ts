import mongoose, { MongooseError } from "mongoose";
import Job from "./jobModel";
const userSchema = new mongoose.Schema({

name: {
  type: String,
  required: true,
},
email: {
  type: String,
  required: true,
  unique: true,
},
// jobs:[
//   {
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Job"
//   }
// ]

})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
