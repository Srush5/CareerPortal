import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jobService } from "../services/jobService";
import Loader from "../components/common/Loader/Loader";
import ErrorState from "../components/common/ErrorState/ErrorState";
import Button from "../components/common/Button/Button";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    jobService
      .getJobById(id)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div style={{ padding: "2rem", maxWidth: "850px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "1px solid var(--border-color)",
          padding: "0.4rem 1rem",
          borderRadius: "var(--radius)",
          cursor: "pointer",
          color: "var(--text-main)",
          marginBottom: "1.5rem",
          fontWeight: 500,
        }}
      >
        Back to Jobs
      </button>

      <div
        style={{
          background: "var(--card-bg)",
          padding: "2.5rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {job.title}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              {job.company} • {job.location} ({job.remoteType})
            </p>
          </div>
          <Link to={`/apply/${job.id}`}>
            <Button>Apply for this Position</Button>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            padding: "1rem 0",
            borderTop: "1px solid var(--border-color)",
            borderBottom: "1px solid var(--border-color)",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            <strong>Experience:</strong> {job.experience}
          </div>
          <div>
            <strong>Employment Type:</strong> {job.type}
          </div>
          {job.salary && (
            <div>
              <strong>Salary:</strong> {job.salary}
            </div>
          )}
          <div>
            <strong>Posted On:</strong> {job.postedDate}
          </div>
        </div>

        <section style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "0.75rem" }}>Job Description</h3>
          <p style={{ lineHeight: "1.6", color: "var(--text-muted)" }}>
            {job.description}
          </p>
        </section>

        {job.responsibilities && job.responsibilities.length > 0 && (
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Key Responsibilities</h3>
            <ul
              style={{
                paddingLeft: "1.2rem",
                lineHeight: "1.6",
                color: "var(--text-muted)",
              }}
            >
              {job.responsibilities.map((res, index) => (
                <li key={index} style={{ marginBottom: "0.4rem" }}>
                  {res}
                </li>
              ))}
            </ul>
          </section>
        )}

        {job.skills && job.skills.length > 0 && (
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Required Skills</h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "var(--primary)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "6px",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {job.benefits && job.benefits.length > 0 && (
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Perks & Benefits</h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {job.benefits.map((benefit, index) => (
                <span
                  key={index}
                  style={{
                    background: "var(--border-color)",
                    color: "var(--text-main)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  }}
                >
                  ✨ {benefit}
                </span>
              ))}
            </div>
          </section>
        )}

        {job.companyInfo && (
          <section
            style={{
              padding: "1.5rem",
              background: "var(--bg-color)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>About {job.company}</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.5" }}>
              {job.companyInfo}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
