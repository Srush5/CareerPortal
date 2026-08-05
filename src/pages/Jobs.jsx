import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { jobService } from "../services/jobService";
import Loader from "../components/common/Loader/Loader";
import ErrorState from "../components/common/ErrorState/ErrorState";
import EmptyState from "../components/common/EmptyState/EmptyState";
import Input from "../components/common/Input/Input";
import { filterAndSortJobs } from "../utils/filterJobs";
import { useBookmarks } from "../context/BookmarkContext";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const locationSearch = useLocation();
  const queryParams = new URLSearchParams(locationSearch.search);
  const initialSearch = queryParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const [remoteType, setRemoteType] = useState("");
  const [sort, setSort] = useState("latest");

  const { toggleBookmark, isBookmarked } = useBookmarks();

  const fetchJobs = () => {
    setLoading(true);
    jobService
      .getJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const qParam = new URLSearchParams(locationSearch.search).get("search");
    if (qParam !== null) {
      setSearch(qParam);
    }
  }, [locationSearch.search]);

  const filteredJobs = filterAndSortJobs(jobs, {
    search,
    location,
    experience,
    type,
    remoteType,
    sort,
  });

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={fetchJobs} />;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Explore Career Opportunities</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
          background: "var(--card-bg)",
          padding: "1.5rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border-color)",
        }}
      >
        <Input
          placeholder="Search title, company, skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Locations</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Experience</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="2-4 Years">2-4 Years</option>
          <option value="3-5 Years">3-5 Years</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={selectStyle}
        >
          <option value="">Employment Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          value={remoteType}
          onChange={(e) => setRemoteType(e.target.value)}
          style={selectStyle}
        >
          <option value="">Workplace Type</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Office">Office</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={selectStyle}
        >
          <option value="latest">Sort: Latest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="salary">Sort: Salary</option>
          <option value="experience">Sort: Experience</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <EmptyState message="No jobs match your selected filter criteria." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "var(--card-bg)",
                padding: "1.5rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ flex: 1, minWidth: "280px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.2rem" }}>
                    <Link
                      to={`/jobs/${job.id}`}
                      style={{ color: "var(--primary)" }}
                    >
                      {job.title}
                    </Link>
                  </h3>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      background: "var(--border-color)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {job.remoteType}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginBottom: "0.8rem",
                  }}
                >
                  {job.company} • {job.location}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.2rem",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span>💼 {job.experience}</span>
                  <span>⏱️ {job.type}</span>
                  {job.salary && <span>💰 {job.salary}</span>}
                  <span>📅 Posted: {job.postedDate}</span>
                </div>

                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.75rem",
                        background: "rgba(37, 99, 235, 0.1)",
                        color: "var(--primary)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={() => toggleBookmark(job)}
                  title="Bookmark Job"
                  style={{
                    background: "none",
                    border: "1px solid var(--border-color)",
                    padding: "0.5rem 0.7rem",
                    borderRadius: "var(--radius)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                >
                  {isBookmarked(job.id) ? "❤️" : "🤍"}
                </button>
                <Link
                  to={`/jobs/${job.id}`}
                  style={{
                    border: "1px solid var(--primary)",
                    color: "var(--primary)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  Details
                </Link>
                <Link
                  to={`/apply/${job.id}`}
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "var(--radius)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const selectStyle = {
  padding: "0.6rem",
  borderRadius: "var(--radius)",
  border: "1px solid var(--border-color)",
  background: "var(--card-bg)",
  color: "var(--text-main)",
  height: "42px",
  width: "100%",
  outline: "none",
};
