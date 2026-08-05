import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button/Button";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <h1>404</h1>
      <p style={{ margin: "1rem 0" }}>Page not found.</p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
