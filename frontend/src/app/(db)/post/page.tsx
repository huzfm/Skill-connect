"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type JobForm = {
  name: string;
  Job: string;
  location: string;
  phone: string;
  rate: string;
  mode: string;
};

type Status = {
  message: string;
  loading: boolean;
};

const AddJob = () => {
  const [form, setForm] = useState<JobForm>({
    name: "",
    Job: "Mason",
    location: "",
    phone: "",
    rate: "",
    mode: "Cash",
  });

  const [status, setStatus] = useState<Status>({
    message: "",
    loading: false,
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitJob = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ message: "", loading: true });

    const token = localStorage.getItem("auth_token");
    const userId = localStorage.getItem("user._id");

    if (!token || !userId) {
      setStatus({ message: "You must be logged in.", loading: false });
      return;
    }

    try {
      const response = await api.post(
        "/jobs/create",
        {
          ...form,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        router.push("/user-details");
        // <p>ahh</p>;
      } else {
        setStatus({ message: "Error creating job", loading: false });
      }
    } catch (err: any) {
      setStatus({
        message: err.response?.data?.message || "Failed to create job.",
        loading: false,
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={submitJob}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Post a Job</h1>

        {status.message && (
          <p className="text-red-500 text-center">{status.message}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <select
          name="Job"
          value={form.Job}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="Mason">Mason</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Labour">Labour</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="rate"
          placeholder="Rate (in ₹)"
          value={form.rate}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="Cash">Cash</option>
          <option value="Online/UPI">Online/UPI</option>
        </select>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {status.loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
