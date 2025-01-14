'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios
import {AnimatedBackground} from '@/components/ui/animated-bg'

const LoginPage = () => {
      const [email, setEmail] = useState<string>('');
      const [password, setPassword] = useState<string>('');
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const router = useRouter();

      const handleLogin = async (event: React.FormEvent) => {
            event.preventDefault();

            if (!email || !password) {
                  setError('Please fill in all fields');
                  return;
            }

            setLoading(true);
            setError(null);

            try {
                  // Axios POST request to the backend API
                  const response = await axios.post(
                        'http://localhost:8000/api/users/login',
                        { email, password },
                        {
                              headers: {
                                    'Content-Type': 'application/json',
                              },
                              withCredentials: true, // Include cookies (JWT token)
                        }
                  );

                  const result = response.data; // Get the response data

                  console.log(result);

                  if (response.status === 200) {
                        // Optionally, store the token in localStorage or cookies
                        localStorage.setItem('auth_token', result.token);
                        localStorage.setItem('user._id' ,result.user._id);  // to store _id of user to fetch user's ads and details
                       router.push('/jobs'); // Redirect to the dashboard page after successful login
                        console.log('logged in');
                  } else {
                        setError('Invalid email or password');
                  }
            } catch (err) {
                  console.error('Login error:', err);
                  setError('Error logging in, please try again later.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div  className='flex items-center justify-center h-[80vh] w-full z-10  0'> 

            <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg ">
<AnimatedBackground />
                  <h1 className="text-xl font-semibold text-white text-center mb-4">Login</h1>
                  <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                              <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email
                              </label>
                              <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                    />
                        </div>

                        <div>
                              <label htmlFor="password" className="block text-sm font-medium text-white">
                                    Password
                              </label>
                              <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                                    />
                        </div>

                        <div className="flex justify-center">
                              <button
                                    type="submit"
                                    className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                    >
                                    {loading ? 'Logging in...' : 'Login'}
                              </button>
                        </div>
                  </form>

                  {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </div>
                                    </div>
      );
};

export default LoginPage;
