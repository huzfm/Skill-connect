"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, PenToolIcon as Tool } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;
      const expirationTime = Date.now() + 15 * 60 * 1000;

      if (response.status === 200) {
        localStorage.setItem("auth_token", result.token);
        localStorage.setItem("user._id", result.user._id);
        localStorage.setItem(
          "auth_token_expiration",
          expirationTime.toString()
        );
        router.push("/jobs");
      } else {
        setError("Wrong Credentials");
      }
    } catch (err: any) {
      console.error("Login error:");

      // Handle specific error messages from backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error logging in, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Tool className="h-6 w-6 mr-2" />
          <span className="font-bold">SkillConnect</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Please sign in to your account
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : null}
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
                  role="alert"
                >
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center">
              <Link
                href="/signup"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create an account?
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
