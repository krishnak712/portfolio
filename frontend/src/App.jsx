import { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import { getProfile } from "./services/contentServices";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import ResumePage from "./pages/ResumePage";
import VisitorLocation from "./components/analytics/VisitorLocation";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import OpeningAnimation from "./components/intro/OpeningAnimation";
import PageScrollAnimation from "./components/common/PageScrollAnimation";
import ScrollManager from "./components/common/ScrollManager";
import VisitorTracker from "./components/analytics/VisitorTracker";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import FeaturedCase from "./components/sections/FeaturedCase";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Achievements from "./components/sections/Achievements";
import Contact from "./components/sections/Contact";


/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(
          "Failed to load profile:",
          error
        );
      });
  }, []);

  if (!profile) {
    return (
      <div className="page-loading">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Hero profile={profile} />

      <About
        name={profile.name}
        about={profile.about}
      />

      <Skills />

      <FeaturedCase />

      <Projects />

      <Experience />

      <Achievements />

      <Contact />
    </>
  );
}


/* =========================================================
   404 PAGE
========================================================= */

function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "120px 24px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>404</h1>

      <p>
        Page not found.
      </p>
    </div>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <ScrollManager />

      <VisitorTracker />
      <VisitorLocation />

      {/* Opening animation */}
      {!introFinished && (
        <OpeningAnimation
          onComplete={() => setIntroFinished(true)}
        />
      )}

      {/* Navbar appears ONLY after opening animation */}
      {introFinished && <Navbar />}

      <PageScrollAnimation />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/projects/:projectSlug"
            element={<ProjectDetail />}
          />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;