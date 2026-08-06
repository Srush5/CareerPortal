import React from "react";
import { BrowserRouter, BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import "./styles/global.css";

export default function App() {

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BookmarkProvider>
    </ThemeProvider>
  );
}
