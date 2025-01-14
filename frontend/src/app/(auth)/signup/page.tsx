'use client'
import { useState, FormEvent } from "react";
import { AnimatedBackground } from "@/components/ui/animated-bg";
const SignupForm = () => {
      // Define form state variables
      const [name, setName] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [passwordConfirm, setPasswordConfirm] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(false);
      const [success, setSuccess] = useState<boolean>(false);

      // Handle form submission
      const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError("");

            // Client-side validation for password confirmation
            if (password !== passwordConfirm) {
                  setError("Passwords do not match.");
                  setLoading(false);
                  return;
            }

            // Prepare data to send to the backend
            const userData = {
                  name,
                  email,
                  password,
                  passwordConfirm,
            };

            try {
                  const response = await fetch("http://localhost:8000/api/users/signup", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                  });

                  const result = await response.json();

                  if (response.ok) {
                        setSuccess(true);
                        setName("");
                        setEmail("");
                        setPassword("");
                        setPasswordConfirm("");
                  } else {
                        // Check if the error is related to duplicate email
                        if (result.error && result.error.includes("E11000 duplicate key error")) {
                              setError("Email already exists. Please use a different email.");
                        } else {
                              setError(result.message || "Something went wrong. Please try again.");
                        }
                  }
            } catch (err) {
                  setError("An error occurred. Please try again.");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="max-w-sm mx-auto my-10 p-5 border rounded-md shadow-lg">
                  <AnimatedBackground />
                  <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
                  {error && <p className="text-red-500">{error}</p>}
                  {success && <p className="text-green-500">Sign Up Successful!</p>}
                  <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                              <label htmlFor="name" className="block">Name</label>
                              <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                              />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="email" className="block">Email</label>
                              <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                              />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="password" className="block">Password</label>
                              <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                              />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="passwordConfirm" className="block">Confirm Password</label>
                              <input
                                    type="password"
                                    id="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                              />
                        </div>
                        <button
                              type="submit"
                              className="w-full p-2 bg-blue-500 text-white rounded-md"
                              disabled={loading}
                        >
                              {loading ? "Signing up..." : "Sign Up"}
                        </button>
                  </form>
            </div>
      );
};

export default SignupForm;
