"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Edit2, Trash2, X } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

interface Job {
  _id: string;
  name: string;
  location: string;
  Job: string;
  rate: string;
  mode: string;
  phone: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  jobs: Job[];
}

interface Name {
  name: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const [jobUpdates, setJobUpdates] = useState<Partial<Job>>({});
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user._id");

    if (userId) {
      fetchUserData(userId);
    } else {
      setError("Not authorized");
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        setError("You must be logged in to fetch user data");
        setLoading(false);
        return;
      }

      const response = await api.get(`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response);

      if (response.data) {
        setUser(response.data);
        setLoading(false);
      } else {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
      console.error(error);
    }
  };
  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    try {
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        alert("You must be logged in to update a job");
        return;
      }

      const response = await api.patch(`/jobs/${jobId}`, updates, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        const updatedJob = response.data; // Assumes API returns the updated job

        if (user) {
          const updatedJobs = user.jobs.map((job) =>
            job._id === jobId ? updatedJob : job
          );
          setUser({ ...user, jobs: updatedJobs });
        }

        setDialogOpen(false);
      } else {
        alert("Failed to update the job");
      }
    } catch (error) {
      alert("Error updating the job");
      console.error(error);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        alert("You must be logged in to delete a job");
        return;
      }

      const response = await api.delete(`/jobs/${jobId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        if (user) {
          const updatedJobs = user.jobs.filter((job) => job._id !== jobId);
          setUser({ ...user, jobs: updatedJobs });
        }
        alert("Job deleted successfully");
      } else {
        alert("Failed to delete the job");
      }
    } catch (error) {
      alert("Error deleting the job");
      console.error(error);
    }
  };

  const openUpdateDialog = (job: Job) => {
    setJobToEdit(job);
    setJobUpdates({
      name: job.name,
      location: job.location,
      Job: job.Job,
      rate: job.rate,
      mode: job.mode,
      phone: job.phone,
    });
    setDialogOpen(true);
  };

  const handleInputChange = (field: keyof Job, value: string) => {
    setJobUpdates({ ...jobUpdates, [field]: value });
  };

  const handleUpdateSubmit = () => {
    const { name, location, Job, rate, phone, mode } = jobUpdates;

    if (!name || !location || !Job || !rate || !phone || !mode) {
      alert("All fields are required.");
      return;
    }

    // Validate phone number
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      alert("Phone number must be exactly 10 numeric digits.");
      return;
    }

    if (jobToEdit) {
      // Call the update API
      updateJob(jobToEdit._id, jobUpdates);
    } else {
      alert("No job selected for update.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center py-10 px-6 bg-white shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-white ">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-800 hover:text-black transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <h1 className="text-4xl font-bold text-black text-center font-title">
              My Services
            </h1>
          </div>
          {user ? (
            <>
              <div className="px-4 py-5 sm:p-6">
                {user.jobs && user.jobs.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.jobs.map((job) => (
                      <motion.li
                        key={job._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <h4 className="text-2xl bg- rounded-lg w-auto    mb-2 text-black font-details font-bold">
                          Service : {job.Job}
                        </h4>
                        <p className="text-gray-600 mb-4 font-title">
                          <span className="font-medium text-gray-800">
                            Name:
                          </span>{" "}
                          {job.name}
                        </p>
                        <p className="text-gray-600 mb-4 font-title">
                          <span className="font-medium text-gray-800">
                            Location:
                          </span>{" "}
                          {job.location}
                        </p>
                        <p className="text-gray-600 mb-4 font-title">
                          <span className="font-medium text-gray-800">
                            Rate Per Day:
                          </span>{" "}
                          {job.rate}
                        </p>
                        <p className="text-gray-600 mb-4 font-title">
                          <span className="font-medium text-gray-800">
                            Phone Number:
                          </span>{" "}
                          {job.phone}
                        </p>
                        <p className="text-gray-600 mb-4 font-title">
                          <span className="font-medium text-gray-800">
                            Mode of Payment:
                          </span>{" "}
                          {job.mode}
                        </p>
                        <div className="flex space-x-4">
                          <button
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-950 transition-colors duration-300 flex items-center"
                            onClick={() => openUpdateDialog(job)}
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Update
                          </button>
                          <button
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-950 transition-colors duration-300 flex items-center"
                            onClick={() => deleteJob(job._id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No jobs available</p>
                )}
              </div>
            </>
          ) : (
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500 italic">No user data available</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isDialogOpen && jobToEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Edit Job
                </h2>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobUpdates.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobUpdates.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobUpdates.Job || ""}
                    onChange={(e) => handleInputChange("Job", e.target.value)}
                  >
                    <option value="" disabled>
                      Select a Job Description
                    </option>
                    <option value="Mason">Mason</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Labour">Labour</option>
                    <option value="Carpenter">Carpenter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rate Per Day
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    minLength={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobUpdates.rate || ""}
                    onChange={(e) => handleInputChange("rate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    minLength={10}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobUpdates.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mode of Payment
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobUpdates.mode || ""}
                    onChange={(e) => handleInputChange("mode", e.target.value)}
                  >
                    <option value="" disabled>
                      Select Mode of Payment
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Online/UPI</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSubmit}
                    className="px-4 py-2 bg-black text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
