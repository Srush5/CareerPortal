import jobsData from "../assets/data/jobs.json";

export const jobService = {
  getJobs: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(jobsData);
      }, 500);
    });
  },
  getJobById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const job = jobsData.find((j) => j.id === Number(id));
        if (job) resolve(job);
        else reject(new Error("Job not found"));
      }, 300);
    });
  },
};
