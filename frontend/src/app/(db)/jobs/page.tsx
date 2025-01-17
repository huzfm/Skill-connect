"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Users,
  MapPin,
  DollarSign,
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

  const logout = () => {
    Cookie.remove("jwt");
    localStorage.clear();
    router.push("/");
  };

  const fetchJobs = async () => {
    try {
      const authToken = localStorage.getItem("auth_token");
      if (!authToken) {
        throw new Error("No auth token found");
      }

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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-10 text-white backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Tool className="h-6 w-6" />
            <span className="font-bold text-lg tracking-wide">
              SkillConnect
            </span>
          </Link>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/user-details" className="bg-white text-black">
                My Jobs
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/post" className="bg-white text-black">
                Post an Ad
              </Link>
            </Button>
            <Button
              variant="secondary"
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-600 transition"
            >
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-center mb-12 text-white font-heading">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[100px] lg:m-[100px] m-[50px]">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="bg-gray-800/50 border border-gray-700 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-xl overflow-hidden w-[300px]"
              >
                {/* Job Banner */}
                <div className="bg-slate-200 p-4 text-black text-center font-bold text-xl">
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
                    <div className="space-y-2">
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

                <CardFooter className="flex flex-col items-center p-4">
                  <Button
                    variant="outline"
                    onClick={() => toggleJobDetails(job._id)}
                    className="w-full mb-2"
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
