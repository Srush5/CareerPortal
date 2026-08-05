import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button/Button";

export default function ThankYou() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "5rem 2rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Thank you for applying.
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "1.1rem",
          lineHeight: "1.6",
          marginBottom: "2rem",
        }}
      >
        Our recruitment team will contact you if your profile matches our
        requirements.
      </p>
      <Link to="/jobs">
        <Button>Back to Job Openings</Button>
      </Link>
    </div>
  );
}
