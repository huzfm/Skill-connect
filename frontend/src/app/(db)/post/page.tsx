"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface JobData {
  name: string;
  Job: string;
  location: string;
  phone: string;
  rate: string;
  mode: string;
  user: string;
}

const AddJob = () => {
  const [name, setName] = useState<string>("");
  const [Job, setJob] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [phone, setPhone] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const router = useRouter();

  // Submit job to API
  const submitJob = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Safely retrieve the authToken and userId from localStorage
    const authToken = localStorage.getItem("auth_token");
    const userId = localStorage.getItem("user._id");

    // Check if authToken or userId is missing
    if (!authToken || !userId) {
      setMessage("No authentication token or user ID found. Please log in.");
      setLoading(false);
      return; // Exit early if these values are not present
    }

    const jobData: JobData = {
      name,
      Job,
      location,
      phone,
      rate,
      mode,
      user: userId, // Safely use userId here
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(jobData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Job created successfully!");
        setName("");
        setJob("");
        setLocation("");
        setPhone("");
        setRate("");
        setMode("");
        router.push("/user-details");
      } else {
        const errorMessage = result.message || "Something went wrong.";
        const specificMessage = errorMessage.includes(":")
          ? errorMessage.split(":").pop()?.trim()
          : errorMessage;

        setMessage(specificMessage || "An error occurred.");
      }
    } catch (error) {
      setMessage("Server error, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" min-h-screen p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-800 hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="max-w-sm  my-5 p-5 border rounded-md shadow-lg mx-5 lg:mx-auto sm:mx-5 ">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Create a New Job
          </h1>
          <form onSubmit={submitJob} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="job"
                className="block text-sm font-medium text-black"
              >
                Select Service
              </label>
              <select
                id="job"
                value={Job}
                onChange={(e) => setJob(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a Service</option>
                <option value="Mason">Mason</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Labour">Labour</option>
                <option value="Carpenter">Carpenter</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-black"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="Number"
                className="block text-sm font-medium text-black"
              >
                Number
              </label>
              <input
                id="number"
                type="number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="Rate"
                className="block text-sm font-medium text-black"
              >
                Rate Per Day
              </label>
              <input
                id="Rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="job"
                className="block text-sm font-medium text-black"
              >
                Select Payment Mode
              </label>
              <select
                id="job"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Mode</option>
                <option value="Cash">Cash</option>
                <option value="Online/UPI">Online/UPI</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`mt-4 px-6 py-2 bg-neutral-800 text-white rounded-2xl shadow-md hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />{" "}
                    {/* Spinning loader */}
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
          {message && (
            <p className="mt-4 text-center text-md text-black font-sans">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddJob;
