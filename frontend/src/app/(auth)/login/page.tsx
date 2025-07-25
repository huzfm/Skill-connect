"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, PenToolIcon as Tool, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import api from "@/utils/api";

type LoginFields = {
  email: string;
  password: string;
};

type Status = {
  error: string | null;
  loading: boolean;
};

const LoginPage = () => {
  const [fields, setFields] = useState<LoginFields>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<Status>({ error: null, loading: false });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Generic input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!fields.email || !fields.password) {
      setStatus({ ...status, error: "Please fill in all fields" });
      return;
    }

    setStatus({ error: null, loading: true });

    try {
      const response = await api.post("users/login", { ...fields });
      const result = response.data;
      const expirationTime = Date.now() + 15 * 60 * 1000;

      // Successful login
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("user._id", result.user._id);
      localStorage.setItem("auth_token_expiration", expirationTime.toString());

      router.push("/jobs");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error logging in, please try again later.";
      setStatus({ error: msg, loading: false });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center ">
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
            <h1 className="text-3xl font-bold text-center font-mono text-gray-800 dark:text-white">
              Welcome Back
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fields.email}
                  onChange={handleInputChange}
                  required
                  disabled={status.loading}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out placeholder:font-mono"
                />
              </div>

              {/* Password with show/hide */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={fields.password}
                  onChange={handleInputChange}
                  required
                  disabled={status.loading}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out placeholder:font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-6 right-4 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white font-mono bg-stone-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-60"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            <AnimatePresence>
              {status.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
                  role="alert"
                  aria-live="assertive"
                >
                  <p>{status.error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center">
              <Link
                href="/signup"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-mono font-bold"
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
