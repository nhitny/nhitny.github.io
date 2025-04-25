import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
// import About from "./components/About/About";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";



import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // thêm dark mode
  // const [darkMode, setDarkMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("🌙 Đã bật dark mode, gán class vào body");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("☀️ Đã tắt dark mode, xoá class khỏi body");
    }
  }, [darkMode]);




  return (
    <Router>
      <Preloader load={load} />

      <div className="App" id={load ? "no-scroll" : "scroll"}>
        {/* ✅ Nút chuyển đổi giao diện Light / Dark */}
        <button
          className="theme-toggle"
          onClick={() => {
            console.log("Dark Mode click:", !darkMode);
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>



        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/project" element={<Projects />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/education" element={<Education />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
