


"use client";
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-bg';

const AddJob = () => {
      const [name, setName] = useState('');
      const [Job, setJob] = useState('');
      const [location, setLocation] = useState('');
      const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(false); // To handle loading state

      // Submit job to API
      const submitJob = async (e: React.FormEvent) => {
            e.preventDefault(); // Prevent the form from refreshing the page
            setLoading(true); // Set loading to true when the submission starts
            const jobData = { name, Job, location };

            // Get the authToken and userId from localStorage
            const authToken = localStorage.getItem('auth_token');
            const userId = localStorage.getItem('user._id'); // Retrieve the userId from localStorage

            if (!authToken || !userId) {
                  setMessage('No authentication token or user ID found. Please log in.');
                  setLoading(false);
                  return;
            }

            // Add the userId to the jobData
            jobData.user = userId;

            try {
                  const response = await fetch('http://localhost:8000/api/jobs/create', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${authToken}`, // Include the authToken in the headers
                        },
                        body: JSON.stringify(jobData),
                  });

                  const result = await response.json();
                  console.log(result)

                  if (response.ok) {
                        setMessage('Job created successfully!');
                        setName('');
                        setJob('');
                        setLocation('');
                  } else {
                        setMessage(result.message || 'Something went wrong.');
                  }
            } catch (error) {
                  setMessage('Server error, try again later.');
            } finally {
                  setLoading(false); // Reset loading state after submission
            }
      };

      return (
            <>
                  <AnimatedBackground />
                  <div className="max-w-sm mx-auto my-10 p-5 border rounded-md shadow-lg">
                        <h1 className="text-2xl font-semibold mb-4 text-center">Create a New Job</h1>
                        <form onSubmit={submitJob} className="space-y-4 ">
                              <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-black">
                                          Name
                                    </label>
                                    <input
                                          id="name"
                                          type="text"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          required
                                          className="mt-1 block w-full px-4 py-2
                                    border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500  "
                                    />
                              </div>

                              <div>
                                    <label htmlFor="job" className="block text-sm font-medium text-black">
                                          Select Job
                                    </label>
                                    <input
                                          id="job"
                                          type="text"
                                          value={Job}
                                          onChange={(e) => setJob(e.target.value)}
                                          required
                                          className="mt-1 block w-full px-4 py-2
                                     border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500  "
                                    />
                              </div>

                              <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-black">
                                          Job Location
                                    </label>
                                    <input
                                          id="location"
                                          type="text"
                                          value={location}
                                          onChange={(e) => setLocation(e.target.value)}
                                          required
                                          className="mt-1 block w-full px-4 py-2
                                     border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500  "
                                    />
                              </div>

                              <div className="flex justify-center">
                                    <button
                                          type="submit"
                                          className={`mt-4 px-6 py-2 bg-slate-100 text-black rounded-2xl shadow-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          disabled={loading} // Disable the button while loading
                                    >
                                          {loading ? (
                                                <div className="flex items-center justify-center space-x-2">
                                                      <Loader2 className="w-5 h-5 animate-spin" /> {/* Spinning loader */}
                                                      <span>Submitting...</span>
                                                </div>
                                          ) : (
                                                'Submit'
                                          )}
                                    </button>
                              </div>
                        </form>

                        {message && <p className="mt-4 text-center text-md text-black font-sans">{message}</p>}
                  </div>
            </>
      );
};

export default AddJob;
