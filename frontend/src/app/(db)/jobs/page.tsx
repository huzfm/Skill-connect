"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Users,
  MapPin,
  CreditCard,
  Phone,
  IndianRupee,
  PenToolIcon as Tool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedBackground } from "@/components/ui/animated-bg";
import Navbar from "@/components/ui/Job-nav";
import NavJob from "@/components/ui/Job-nav";

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
      const userId = localStorage.getItem("user._id");

      if (!authToken) {
        throw new Error("No auth token found");
      }
      if (!tokenExpiration) {
        throw new Error("Token expiration not found");
      }
      const currentTime = Date.now();
      if (currentTime > parseInt(tokenExpiration)) {
        // Token expired
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_expiration");
        localStorage.removeItem("user._id");
        throw new Error("Token expired, please log in again");
      }

      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching jobs:");
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
    <div className="min-h-screen bg-slate-900 text-white ">
      <header className="border-b border-gray-800 sticky top-0 z-10 text-white backdrop-blur-md">
        <NavJob />
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="sm:text-4xl lg:text-5xl font-semibold  text-center mb-12 text-white font-heading">
          Services Providers Near You
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500 text-2xl">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl text-gray-400">
              No jobs available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mx-[100px]">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="bg-gray-800/50 border border-gray-700 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-xl overflow-hidden w-[350px] sm:w-[300px] "
              >
                {/* Header Banner */}
                <div className="bg-slate-200 p-4 text-black  text-center font-bold text-2xl font-title">
                  {job.Job}
                </div>

                <CardContent className="p-10 space-y-4 ">
                  {/* Job Details */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-slate-500" />
                      <p className="text-md text-white font-bold font-details">
                        Posted by: {job.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-500" />
                      <p className="text-md text-white font-bold font-details">
                        Location: {job.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="h-5 w-5 text-blue-700" />
                      <p className="text-md text-white font-bold font-details">
                        Rate: {job.rate} / Day
                      </p>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {expandedJobId === job._id && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-purple-500" />
                        <p className="text-md text-white font-bold font-details">
                          Payment Mode: {job.mode}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-red-500" />
                        <p className="text-md text-white font-bold font-details">
                          Phone: {job.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="flex flex-col items-center p-4">
                  <Button
                    variant="outline"
                    onClick={() => toggleJobDetails(job._id)}
                    className="w-full mb-2 hover:bg-slate-300  transition"
                  >
                    {expandedJobId === job._id ? "Show Less" : "See More"}
                  </Button>
                  <Button
                    //variant="solid"
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
