"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye, // Eye icon for show password
  EyeOff, // Eye off icon for hide password
  PenToolIcon as Tool,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for showing password
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false); // State for confirming password visibility
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset any previous errors

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const userData = {
      email,
      password,
      passwordConfirm,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json(); // Parse the JSON response

      if (!response.ok) {
        // Check if the response status is not ok (not in the 2xx range)
        if (result.error) {
          setError(result.error); // Display the error message from the API
          if (result.error.includes("E11000 duplicate key error")) {
            setError("Email already exists. Please use a different email.");
          } else {
            setError(
              result.message || "Something went wrong. Please try again."
            );
          }
        }
      } else {
        // If sign up is successful
        setSuccess(true);
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        router.push("/login"); // Redirect to login page
      }
    } catch (err) {
      // Catch network errors or other unexpected issues
      setError("An error occurred. Please try again.");
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
      <div className="flex items-center justify-center min-h-screen bg-slate-200 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="shadow-xl rounded-lg p-6 bg-white dark:bg-gray-700">
            <h2 className="text-2xl font-bold text-center">
              Create an Account
            </h2>
            <p className="text-center">Sign up to get started</p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="huzfm@example.com"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-11 right-4 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="passwordConfirm" className="block">
                  Confirm Password
                </label>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-11 right-4 transform -translate-y-1/2"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <div className="mt-4">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-center text-red-500 flex items-center justify-center space-x-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-center text-green-500 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Sign Up Successful!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignupForm;
