"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Loader2,
  Users,
  MapPin,
  CreditCard,
  Phone,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import NavJob from "@/components/ui/Job-nav";
import api from "@/utils/api";

// Job interface
interface Job {
  _id: string;
  name: string;
  Job: string;
  rate: string;
  phone: string;
  location: string;
  mode: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const tokenExpiration = localStorage.getItem("auth_token_expiration");

      if (!authToken)
        throw new Error("Your session has expired, please log in again");
      if (!tokenExpiration) throw new Error("Token expiration not found");
      if (Date.now() > parseInt(tokenExpiration)) {
        localStorage.clear();
        throw new Error("Your session has expired, please log in again");
      }

      // Check localStorage for cached jobs
      const cached = localStorage.getItem("cached_jobs");
      const cachedTime = localStorage.getItem("cached_jobs_time");

      if (
        cached &&
        cachedTime &&
        Date.now() - parseInt(cachedTime) < 5 * 60 * 1000
      ) {
        // Less than 5 mins old → use cache
        setJobs(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const res = await api.get("/jobs", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!Array.isArray(res.data)) {
        throw new Error("Server error");
      }

      // Cache to localStorage
      localStorage.setItem("cached_jobs", JSON.stringify(res.data));
      localStorage.setItem("cached_jobs_time", Date.now().toString());

      setJobs(res.data);
      setError("");
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(err.message || "Error fetching jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleJobDetails = (jobId: string) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-10 text-white backdrop-blur-md">
        <NavJob />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="sm:text-4xl lg:text-5xl font-semibold text-center mb-12 text-white font-heading">
          Service Providers Near You
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            {error && toast.error(error)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl text-gray-400">
              No jobs available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-screen-lg">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="bg-gray-800/50 border border-gray-700 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-xl overflow-hidden w-full max-w-sm mx-auto"
              >
                {/* Header */}
                <div className="bg-slate-200 p-4 text-black text-center font-bold text-2xl font-title">
                  {job.Job}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-slate-500" />
                      <p className="text-md text-white font-bold">
                        Posted by: {job.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-500" />
                      <p className="text-md text-white font-bold">
                        Location: {job.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="h-5 w-5 text-blue-700" />
                      <p className="text-md text-white font-bold">
                        Rate: {job.rate} / Day
                      </p>
                    </div>
                  </div>

                  {expandedJobId === job._id && (
                    <div className="space-y-2 mt-4 border-t border-gray-600 pt-4">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-purple-500" />
                        <p className="text-md text-white font-bold">
                          Payment Mode: {job.mode}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-red-500" />
                        <p className="text-md text-white font-bold">
                          Phone: {job.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col items-center p-4 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleJobDetails(job._id)}
                    className="w-full hover:bg-slate-300 transition"
                  >
                    {expandedJobId === job._id ? "Show Less" : "See More"}
                  </Button>
                  <Button
                    className="w-full bg-black hover:bg-neutral-950 text-white"
                    onClick={() => window.open(`tel:${job.phone}`)}
                  >
                    Call Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
