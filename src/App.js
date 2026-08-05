import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import "./styles/global.css";

export default function App() {
  const repoName = '/CarrerPortal';
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <BrowserRouter basename="/CareerPortal">
          <AppRoutes />
        </BrowserRouter>
      </BookmarkProvider>
    </ThemeProvider>
  );
}
