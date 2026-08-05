import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jobService } from "../services/jobService";
import Button from "../components/common/Button/Button";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    jobService
      .getJobs()
      .then((data) => setJobs(data))
      .catch(() => {});
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/jobs");
    }
  };

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <section
        style={{
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.02) 100%)",
          padding: "5rem 2rem",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              background: "rgba(37, 99, 235, 0.1)",
              color: "var(--primary)",
              padding: "0.4rem 1rem",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Your Next Big Career Move Starts Here
          </span>
          <h1 style={{ fontSize: "2.8rem", margin: "1rem 0", fontWeight: 800 }}>
            Find Your Dream Job Today
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.1rem",
              marginBottom: "2rem",
            }}
          >
            Explore thousands of job listings from top-tier companies, ranging
            from remote startups to global tech giants.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: "flex",
              gap: "0.5rem",
              maxWidth: "600px",
              margin: "0 auto",
              background: "var(--card-bg)",
              padding: "0.5rem",
              borderRadius: "calc(var(--radius) + 4px)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <input
              type="text"
              placeholder="Job title, keywords, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                padding: "0.75rem",
                outline: "none",
                color: "var(--text-main)",
                fontSize: "1rem",
              }}
            />
            <Button type="submit">Search Jobs</Button>
          </form>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              padding: "2rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2
              style={{
                color: "var(--primary)",
                fontSize: "2.2rem",
                marginBottom: "0.3rem",
              }}
            >
              10k+
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Active Job Openings
            </p>
          </div>
          <div
            style={{
              background: "var(--card-bg)",
              padding: "2rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2
              style={{
                color: "var(--primary)",
                fontSize: "2.2rem",
                marginBottom: "0.3rem",
              }}
            >
              500+
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Partner Companies
            </p>
          </div>
          <div
            style={{
              background: "var(--card-bg)",
              padding: "2rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2
              style={{
                color: "var(--primary)",
                fontSize: "2.2rem",
                marginBottom: "0.3rem",
              }}
            >
              95%
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Candidate Success Rate
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2>Featured Job Openings</h2>
          <Link
            to="/jobs"
            style={{
              color: "var(--primary)",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            View All Jobs →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "var(--card-bg)",
                padding: "1.8rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.1rem" }}>
                    <Link
                      to={`/jobs/${job.id}`}
                      style={{ color: "var(--text-main)" }}
                    >
                      {job.title}
                    </Link>
                  </h3>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      background: "var(--border-color)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    {job.remoteType}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {job.company} • {job.location}
                </p>
                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  {job.skills?.map((skill, i) => (
                    <span
                      key={i}
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "1rem",
                  marginTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                  }}
                >
                  {job.salary || "Competitive"}
                </span>
                <Link
                  to={`/apply/${job.id}`}
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    padding: "0.4rem 1rem",
                    borderRadius: "var(--radius)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "var(--card-bg)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2>Why Choose CareerPortal?</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
              We make job searching seamless, transparent and direct.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            <div style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🛡️</div>
              <h3 style={{ marginBottom: "0.5rem" }}>Verified Employers</h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
              >
                Every job listing is manually vetted to ensure authenticity and
                secure hiring pipelines.
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
              <h3 style={{ marginBottom: "0.5rem" }}>Instant Applications</h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
              >
                Apply to top openings seamlessly with structured form tracking
                and rapid response loops.
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📈</div>
              <h3 style={{ marginBottom: "0.5rem" }}>Career Growth Support</h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
              >
                Access tailored skill requirements and salary insights to
                negotiate your true market value.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
