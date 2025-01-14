"use client";

import { AnimatedBackground } from "@/components/ui/animated-bg";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  _id: string;
  name: string;
  Job: string;
}

const HomePage = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // State to store jobs data
  const [error, setError] = useState<string>(""); // State to store error messages

  const router = useRouter(); // Initialize the useRouter hook

  const logout = () => {
    // Remove all cookies
    Cookie.remove("jwt"); // Add all cookie names you need to remove

    // Clear local storage
    localStorage.clear();

    // Redirect to the login page
    router.push("/");
  };

  const fetchJobs = async () => {
    try {
      // Retrieve the auth token from localStorage using the correct key
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        throw new Error("No auth token found");
      }

      // Fetch protected data from the backend
      const res = await fetch("http://localhost:8000/api/jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`, // Include token in headers
        },
        credentials: "include", // Automatically send the JWT cookie
      });

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await res.json();
      setJobs(data); // Update the state with the fetched jobs data
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching jobs:", err);
    }
  };

  // Use useEffect to call fetchJobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-6 text-white">
      <AnimatedBackground />
      <button>
        <Link href="/user-details" className="text-black">
          My jobs
        </Link>
      </button>
      <button onClick={logout} className="text-3xl text-black">
        Logout
      </button>
      <h1 className="text-3xl font-bold text-center mb-6">Jobs</h1>
      {error && (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-red-500 text-5xl font-mono">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-2">{job.name}</h2>
            <p className="text-gray-300">{job.Job}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
