import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the JOB
interface JOB  {
 name:string;
  location: string;
  worktype:string
}

// Define the schema for 
const jobSchema: Schema = new Schema<JOB>({
      name: {
        type: String,
        required: true,
      },
      worktype: {
            type: String,
            required: true,
            enum: ["Plumber", "Electrician", "Carpenter", "Painter", "Mason"],
      },        
      location: {
        type: String,
        required: true,
      },
});

// Create and export the Job model
const Job = mongoose.models.Job || mongoose.model<JOB>("Job", jobSchema);
export default Job;
