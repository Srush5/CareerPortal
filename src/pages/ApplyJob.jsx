import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input/Input";
import Button from "../components/common/Button/Button";
import { validateApplication } from "../utils/validation";

export default function ApplyJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    experience: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    resume: null,
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateApplication(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/thank-you");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <button
        type="button"
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
        ← Back
      </button>

      <div
        style={{
          background: "var(--card-bg)",
          padding: "2.5rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Submit Your Application</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Please fill out the form carefully and attach your updated resume.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Input
              label="First Name *"
              name="firstName"
              placeholder="e.g. John"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input
              label="Last Name *"
              name="lastName"
              placeholder="e.g. Doe"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Input
              label="Email Address *"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="Mobile Number (10 digits) *"
              name="mobile"
              placeholder="9876543210"
              maxLength="10"
              value={form.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Input
              label="Total Experience *"
              name="experience"
              placeholder="e.g. 3 Years"
              value={form.experience}
              onChange={handleChange}
              error={errors.experience}
            />
            <Input
              label="Current Company *"
              name="currentCompany"
              placeholder="e.g. TechCorp"
              value={form.currentCompany}
              onChange={handleChange}
              error={errors.currentCompany}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            <Input
              label="Current CTC *"
              name="currentCTC"
              placeholder="e.g. 6 LPA"
              value={form.currentCTC}
              onChange={handleChange}
              error={errors.currentCTC}
            />
            <Input
              label="Expected CTC *"
              name="expectedCTC"
              placeholder="e.g. 10 LPA"
              value={form.expectedCTC}
              onChange={handleChange}
              error={errors.expectedCTC}
            />
            <Input
              label="Notice Period *"
              name="noticePeriod"
              placeholder="e.g. 30 Days"
              value={form.noticePeriod}
              onChange={handleChange}
              error={errors.noticePeriod}
            />
          </div>

          {/* Premium UI File Upload Button */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              margin: "0.5rem 0",
            }}
          >
            <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              Resume Upload (PDF/DOC, Max 2MB) *
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.8rem",
                padding: "1rem",
                border: "2px dashed var(--border-color)",
                borderRadius: "var(--radius)",
                background: "var(--bg-color)",
                cursor: "pointer",
                transition: "var(--transition)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: form.resume ? "var(--primary)" : "var(--text-muted)",
                  fontWeight: form.resume ? 600 : 400,
                }}
              >
                {form.resume
                  ? form.resume.name
                  : "Click to browse or drag file here"}
              </span>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </label>
            {errors.resume && (
              <span style={{ color: "var(--error)", fontSize: "0.8rem" }}>
                {errors.resume}
              </span>
            )}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
          >
            <label style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              Cover Letter (Optional)
            </label>
            <textarea
              name="coverLetter"
              rows="4"
              placeholder="Why are you a good fit for this role?"
              value={form.coverLetter}
              onChange={handleChange}
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-color)",
                background: "var(--card-bg)",
                color: "var(--text-main)",
                resize: "vertical",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
