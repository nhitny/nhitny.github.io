import React, { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
// import About from "./components/About/About";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";


import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./redesign.css";

// admin is loaded only when /admin is opened
const Admin = lazy(() => import("./admin/Admin"));

function App() {
  // fade out the intro loader that lives in public/index.html
  useEffect(() => {
    const el = document.getElementById("st-loader");
    if (!el) return undefined;
    const MIN_VISIBLE_MS = 1500;
    const wait = Math.max(0, MIN_VISIBLE_MS - performance.now());
    let removeTimer;
    const hideTimer = setTimeout(() => {
      el.classList.add("is-done");
      clearInterval(window.__stlTimer);
      removeTimer = setTimeout(() => el.remove(), 700);
    }, wait);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <Router>

      <div className="App">
        <div id="top-loading-bar"></div>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/education" element={<Education />} />
          <Route path="/resume" element={<Resume />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
                <Admin />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
