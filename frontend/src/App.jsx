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
import VisitorTracker from "./components/analytics/VisitorTracker";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import OpeningAnimation from "./components/intro/OpeningAnimation";

import PageScrollAnimation from "./components/common/PageScrollAnimation";
import ScrollManager from "./components/common/ScrollManager";

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

function HomePage({
  profile,
  profileLoading,
  profileError,
  onRetryProfile,
}) {
  if (profileLoading) {
    return (
      <div className="page-loading">
        Loading portfolio...
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="page-loading">
        <p>
          Unable to load portfolio data.
        </p>

        <button
          type="button"
          onClick={onRetryProfile}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Hero profile={profile} />

      <About profile={profile} />

      <Skills />

      <FeaturedCase />

      <Projects />

      <Experience />

      <Achievements />

      <Contact profile={profile} />
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

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);

  const loadProfile = async () => {
    try {
      setProfileLoading(true);
      setProfileError(false);

      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );

      setProfile(null);
      setProfileError(true);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <>
      <ScrollManager />

      <VisitorTracker />
      <VisitorLocation />

      {!introFinished && (
        <OpeningAnimation
          profile={profile}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      {introFinished && (
        <Navbar profile={profile} />
      )}

      <PageScrollAnimation />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                profile={profile}
                profileLoading={profileLoading}
                profileError={profileError}
                onRetryProfile={loadProfile}
              />
            }
          />

          <Route
            path="/projects"
            element={<ProjectsPage />}
          />

          <Route
            path="/projects/:projectSlug"
            element={<ProjectDetail />}
          />

          <Route
            path="/resume"
            element={<ResumePage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>

      <Footer profile={profile} />
    </>
  );
}

export default App;