"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  PenToolIcon as Tool,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/utils/api";

type FormFields = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type Status = {
  error: string;
  loading: boolean;
  success: boolean;
};

type Visibility = {
  password: boolean;
  passwordConfirm: boolean;
};

const SignupForm = () => {
  const [fields, setFields] = useState<FormFields>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [status, setStatus] = useState<Status>({
    error: "",
    loading: false,
    success: false,
  });

  const [show, setShow] = useState<Visibility>({
    password: false,
    passwordConfirm: false,
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowToggle = (field: keyof Visibility) => {
    setShow((s) => ({ ...s, [field]: !s[field] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ error: "", loading: true, success: false });

    const { email, password, passwordConfirm } = fields;

    if (password.length < 6) {
      setStatus({
        error: "Password must be at least 6 characters.",
        loading: false,
        success: false,
      });
      return;
    }

    if (password !== passwordConfirm) {
      setStatus({
        error: "Passwords do not match.",
        loading: false,
        success: false,
      });
      return;
    }

    try {
      const response = await api.post("users/signup", fields);

      setFields({ email: "", password: "", passwordConfirm: "" });
      setStatus({ error: "", loading: false, success: true });

      setTimeout(() => router.push("/login"), 1800);
    } catch (error: any) {
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred. Please try again.";

      setStatus({
        error:
          errMsg.includes("E11000") || errMsg.includes("duplicate key")
            ? "Email already exists. Please use a different email."
            : errMsg,
        loading: false,
        success: false,
      });
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
      <div className="flex items-center justify-center min-h-screen bg-slate-900 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="shadow-xl rounded-lg p-6 bg-white dark:bg-gray-700">
            <h2 className="text-2xl font-bold text-center font-mono">
              Create an Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* Email */}
              <div className="space-y-2">
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={fields.email}
                  onChange={handleInputChange}
                  required
                  placeholder="huzfm@example.com"
                  disabled={status.loading || status.success}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              {/* Password */}
              <div className="space-y-2 relative">
                <input
                  name="password"
                  type={show.password ? "text" : "password"}
                  id="password"
                  value={fields.password}
                  onChange={handleInputChange}
                  required
                  placeholder="password"
                  disabled={status.loading || status.success}
                  className="w-full px-4 py-2 border rounded-md placeholder:font-mono"
                />
                <button
                  type="button"
                  className="absolute top-3 right-4 transform -translate-y-1/2"
                  onClick={() => handleShowToggle("password")}
                  tabIndex={-1}
                >
                  {show.password ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <input
                  name="passwordConfirm"
                  type={show.passwordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  value={fields.passwordConfirm}
                  onChange={handleInputChange}
                  required
                  placeholder="password"
                  disabled={status.loading || status.success}
                  className="w-full px-4 py-2 border rounded-md placeholder:font-mono"
                />
                <button
                  type="button"
                  className="absolute top-3 right-4 transform -translate-y-1/2"
                  onClick={() => handleShowToggle("passwordConfirm")}
                  tabIndex={-1}
                >
                  {show.passwordConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2 bg-stone-950 text-white rounded-md disabled:opacity-50 font-mono"
                disabled={status.loading || status.success}
              >
                {status.loading ? (
                  <div className="flex items-center justify-center ">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </div>
                ) : status.success ? (
                  "Sign Up Successful!"
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
            <Link href="/login">
              <p className="text-blue-500 text-center pt-5 font-mono">
                Already have an account?
              </p>
            </Link>
            <div className="mt-4 min-h-[24px]">
              <AnimatePresence>
                {status.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-center text-red-500 flex items-center justify-center space-x-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{status.error}</span>
                  </motion.div>
                )}
                {status.success && !status.loading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-center text-green-500 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Sign Up Successful! Redirecting...</span>
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
