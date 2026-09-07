import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./OpeningAnimation.css";

const IntroScene = lazy(() => import("./IntroScene"));

const STORAGE_KEY = "kk-opening-played-v1";
const TOTAL_DURATION = 5400;
const EXIT_DURATION = 750;

function shouldPlayIntro() {
  if (typeof window === "undefined") return false;

  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      return false;
    }
  } catch {
    return false;
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return false;
  }

  return true;
}

function statusLabel(progress) {
  if (progress < 30) return "INITIALIZING WORKSPACE";
  if (progress < 62) return "COMPILING MODULES";
  if (progress < 88) return "RENDERING SCENE";
  return "ENTERING PORTFOLIO";
}

export default function OpeningAnimation({ onComplete }) {
  const [active] = useState(shouldPlayIntro);
  const [visible, setVisible] = useState(active);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;

    finishedRef.current = true;

    setExiting(true);

    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Storage unavailable — still exit.
      }

      setVisible(false);

      // Tell App.jsx that the intro is completely finished.
      onComplete?.();
    }, EXIT_DURATION);
  }, [onComplete]);

  /*
   * Progress + auto-complete timeline
   */
  useEffect(() => {
    if (!active) return undefined;

    let rafId = 0;

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;

      const raw = Math.min(
        1,
        elapsed / TOTAL_DURATION
      );

      const eased =
        raw < 0.5
          ? 2 * raw * raw
          : 1 -
            Math.pow(-2 * raw + 2, 2) / 2;

      setProgress(
        Math.round(eased * 100)
      );

      if (raw >= 1) {
        finish();
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [active, finish]);

  /*
   * Lock body scrolling while intro is active.
   */
  useEffect(() => {
    if (!active || !visible) {
      return undefined;
    }

    const previous =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previous;
    };
  }, [active, visible]);

  /*
   * Keyboard controls
   */
  useEffect(() => {
    if (!active || !visible || exiting) {
      return undefined;
    }

    const onKey = (event) => {
      if (
        event.key === "Escape" ||
        event.key === "Enter"
      ) {
        finish();
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKey
      );
    };
  }, [
    active,
    visible,
    exiting,
    finish,
  ]);

  /*
   * If intro shouldn't play, tell App immediately.
   *
   * This is important because sessionStorage means
   * the intro only plays once per browser session.
   */
  useEffect(() => {
    if (!active) {
      onComplete?.();
    }
  }, [active, onComplete]);

  if (!active || !visible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="opening-overlay"
        role="dialog"
        aria-label="Portfolio introduction"
        aria-modal="true"
        initial={{ opacity: 1 }}
        animate={{
          opacity: exiting ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration:
            EXIT_DURATION / 1000,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >

        {/* 3D Scene */}
        <Suspense fallback={null}>
          <IntroScene
            exiting={exiting}
          />
        </Suspense>

        <div className="opening-vignette" />

        {/* Corner engineering meta */}
        <span className="opening-meta opening-meta-tl">
          KK // PORTFOLIO.SYS
        </span>

        <span className="opening-meta opening-meta-bl">
          ENV: JAVA — SPRING BOOT
        </span>

        <span className="opening-meta opening-meta-br">
          SESSION 01
        </span>

        {/* Skip */}
        <button
          type="button"
          className="opening-skip"
          onClick={finish}
        >
          Skip →
        </button>

        {/* Name / title reveal */}
        <div className="opening-center">

          <motion.p
            className="opening-eyebrow"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 0.9,
              y: 0,
            }}
            transition={{
              delay: 2.1,
              duration: 0.7,
            }}
          >
            Hello, I am
          </motion.p>

          <motion.h1
            className="opening-name"
            initial={{
              opacity: 0,
              y: 18,
              letterSpacing: "0.18em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.08em",
            }}
            transition={{
              delay: 2.35,
              duration: 0.9,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            KRISHNA KUMAR
          </motion.h1>

          <motion.p
            className="opening-role"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 2.8,
              duration: 0.7,
            }}
          >
            Java Full Stack Developer
          </motion.p>

          <motion.div
            className="opening-rule"
            initial={{
              opacity: 0,
              scaleX: 0.4,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              delay: 3.0,
              duration: 0.6,
            }}
          />

        </div>

        {/* Progress */}
        <div className="opening-bottom">

          <p className="opening-status">
            {statusLabel(progress)} —{" "}
            <strong>
              {String(progress).padStart(
                3,
                "0"
              )}
              %
            </strong>
          </p>

          <div
            className="opening-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Loading portfolio"
          >
            <div
              className="opening-progress-fill"
              style={{
                transform: `scaleX(${
                  progress / 100
                })`,
              }}
            />
          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}