
'use client';
import { useEffect, useState } from 'react';
import { AnimatedBackground } from '@/components/ui/animated-bg';

interface Job {
  _id: string;
  name: string;
  location: string;
  Job: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  jobs: Job[];
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const [jobUpdates, setJobUpdates] = useState<Partial<Job>>({});

  useEffect(() => {
    const userId = localStorage.getItem('user._id');
    if (userId) {
      fetchUserData(userId);
    } else {
      setError('Not authorized');
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`);
      if (response.ok) {
        const data: User = await response.json();
        setUser(data);
        setLoading(false);
      } else {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedJob: Job = await response.json();

        if (user) {
          const updatedJobs = user.jobs.map((job) =>
            job._id === jobId ? updatedJob : job
          );
          setUser({ ...user, jobs: updatedJobs });
        }
        setDialogOpen(false); // Close dialog after success
      } else {
        alert('Failed to update the job');
      }
    } catch (error) {
      alert('Error updating the job');
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        if (user) {
          const updatedJobs = user.jobs.filter((job) => job._id !== jobId);
          setUser({ ...user, jobs: updatedJobs });
        }
        alert('Job deleted successfully');
      } else {
        alert('Failed to delete the job');
      }
    } catch (error) {
      alert('Error deleting the job');
    }
  };

  const openUpdateDialog = (job: Job) => {
    setJobToEdit(job);
    setJobUpdates({ name: job.name, location: job.location, Job: job.Job });
    setDialogOpen(true);
  };

  const handleInputChange = (field: keyof Job, value: string) => {
    setJobUpdates({ ...jobUpdates, [field]: value });
  };

  const handleUpdateSubmit = () => {
    if (jobToEdit && jobUpdates) {
      updateJob(jobToEdit._id, jobUpdates);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <AnimatedBackground />
      <h1 className="text-3xl font-semibold mb-6">User Profile</h1>

      {user ? (
        <div>
          <div className="mb-6">
            <p className="text-lg font-medium">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg font-medium">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Jobs</h3>
          {user.jobs && user.jobs.length > 0 ? (
            <ul className="space-y-4">
              {user.jobs.map((job) => (
                <li key={job._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-lg">
                    <strong>Job Name:</strong> {job.name}
                  </p>
                  <p className="text-lg">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="text-lg">
                    <strong>Job Description:</strong> {job.Job}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => openUpdateDialog(job)}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No jobs available</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No user data available</p>
      )}

      {isDialogOpen && jobToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Job Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={jobUpdates.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={jobUpdates.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Job Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={jobUpdates.Job || ''}
                onChange={(e) => handleInputChange('Job', e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleUpdateSubmit}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
