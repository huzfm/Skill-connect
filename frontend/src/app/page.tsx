import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { AnimatedBackground } from "@/components/ui/animated-bg"; // Import the AnimatedBackground component
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Search,
  PenToolIcon as Tool,
  Users,
} from "lucide-react";

import Navbar from "@/components/ui/responsive-nav";

export default function Home() {
  return (
    <>
      {/* Background Animation */}
      <AnimatedBackground />

      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />

        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 h-[90vh]">
            <div className=" px-4 md:px-6 h-full flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl z-50">
                    Connect with Skilled Professionals
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-900 md:text-xl dark:text-gray-400">
                    SkillConnect brings together skilled tradespeople and
                    clients. Post your services or find the right professional
                    for your job.
                  </p>
                </div>
                <div className="space-x-4 flex flex-col sm:flex-row justify-center items-center">
                  <Button className="w-full sm:w-auto">
                    <Link href="/login">Get Started</Link>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a href="#how-it-works">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto mt-4 sm:mt-0"
                    >
                      Learn More
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className=" px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Key Features
              </h2>
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                {/* Card 1 */}
                <div className="flex flex-col  h-[500px] items-center justify-center bg-white dark:bg-gray-700 shadow-lg space-y-4 p-6 rounded-2xl">
                  <Users className="h-12 w-12 text-blue-500" />
                  <h3 className="text-xl font-bold">
                    Service Provider Profiles
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-center">
                    Create detailed profiles showcasing your skills and
                    experience.
                  </p>
                </div>
                {/* Card 2 */}
                <div className="flex flex-col  h-[500px] items-center justify-center bg-white dark:bg-gray-700 shadow-lg space-y-4 p-6 rounded-2xl">
                  <Search className="h-12 w-12 text-blue-500" />
                  <h3 className="text-xl font-bold">Easy Search</h3>
                  <p className="text-gray-500 dark:text-gray-300 text-center">
                    Find the right professional for your job with our powerful
                    search tools.
                  </p>
                </div>
                {/* Card 3 */}
                <div className="flex flex-col  h-[500px] items-center justify-center bg-white dark:bg-gray-700 shadow-lg space-y-4 p-6 rounded-2xl">
                  <MessageSquare className="h-12 w-12 text-blue-500" />
                  <h3 className="text-xl font-bold">Direct Communication</h3>
                  <p className="text-gray-500 dark:text-gray-300 text-center">
                    Connect directly with service providers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className=" px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                How It Works
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Create a Profile</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Sign up and create your account.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Post or Search</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Post your services or search for professionals in your area.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Connect and Hire</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Communicate, agree on terms, and get the job done!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="cta"
            className="w-full py-12 md:py-24 lg:py-32 bg-blue-500 text-white"
          >
            <div className=" px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Get Started?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                    Join SkillConnect today and start connecting with skilled
                    professionals or finding new clients for your services.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button className="text-white border-white hover:bg-black bg-black font-semibold">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>

            <footer className=" text-center lg:text-left">
              <div className="flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg mt-10">
                  <div className="flex items-center justify-center space-x-5">
                    <Link
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 transition-colors"
                    >
                      <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
            <div className="p-4 text-center text-surface text-black font-mono">
              <a href="https://huzaifmushtaq.netlify.app">huzfm</a> ©{" "}
              {new Date().getFullYear()}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
