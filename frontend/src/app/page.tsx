import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, MessageSquare, Search, PenToolIcon as Tool, Users } from 'lucide-react'
import {AnimatedBackground} from '@/components/ui/animated-bg'
import Navbar from '@/components/ui/responsive-nav'
export default function Home() {

  return (
    <> 
    <div className="flex flex-col min-h-screen ">
  <Navbar />
      <AnimatedBackground />
      <main className="flex-1">

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 h-[90vh]">
          <div className="container px-4 md:px-6 h-full flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl  z-50">
                  Connect with Skilled Professionals
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-900 md:text-xl dark:text-gray-400">
                  SkillConnect brings together skilled tradespeople and clients. Post your services or find the right professional for your job.
                </p>
              </div>
              <div className="space-x-4 flex justify-center">
                <Button>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a href="#how-it-works">
                  <Button variant="outline">Learn More</Button>
                </a>
              </div>
            </div>
          </div>
        </section>



        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Service Provider Profiles</h3>
                <p className="text-gray-500 dark:text-gray-900 text-center">Create detailed profiles showcasing your skills and experience.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Search className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Easy Search</h3>
                <p className="text-gray-500 dark:text-gray-900 text-center">Find the right professional for your job with our powerful search tools.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <MessageSquare className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Direct Communication</h3>
                <p className="text-gray-500 dark:text-gray-900 text-center">Connect directly with service providers through our messaging system.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-bold">Create a Profile</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Sign up and create your account.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-bold">Post or Search</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Post your services or search for professionals in your area.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-bold">Connect and Hire</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Communicate, agree on terms, and get the job done!</p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-blue-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                  Join SkillConnect today and start connecting with skilled professionals or finding new clients for your services.
                </p>
              </div>
              <div className="space-x-4">
              

                <Button className="text-white border-white hover:bg-black bg-black font-semibold">Contact Us</Button>
                
              </div>
            </div>
          </div>
        </section>
      </main>
     
    </div>
    </>
  )
}

