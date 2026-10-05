import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import Talent from "./sections/Talent";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const isScrolling = useRef(false);
  const activePageRef = useRef("home");

  const pages = [
    "home",
    "divisions",
    "work",
    "contact",
  ];

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  /*
  ==========================================================
  SCROLL NAVIGATION
  ==========================================================
  */

  useEffect(() => {
    let scrollAmount = 0;

    const SCROLL_THRESHOLD = 420;

    const handleWheel = (event: WheelEvent) => {
      /*
      Studio / Tech tidak ikut wheel navigation.
      */
      if (
        activePageRef.current === "studio" ||
        activePageRef.current === "tech"
      ) {
        return;
      }

      if (isScrolling.current) {
        return;
      }

      if (Math.abs(event.deltaY) < 5) {
        return;
      }

      scrollAmount += event.deltaY;

      if (Math.abs(scrollAmount) < SCROLL_THRESHOLD) {
        return;
      }

      const direction =
        scrollAmount > 0 ? 1 : -1;

      scrollAmount = 0;

      const currentPage = activePageRef.current;

      const currentIndex = pages.indexOf(
        currentPage
      );

      let nextIndex = currentIndex;

      if (direction > 0) {
        nextIndex = Math.min(
          currentIndex + 1,
          pages.length - 1
        );
      }

      if (direction < 0) {
        nextIndex = Math.max(
          currentIndex - 1,
          0
        );
      }

      if (nextIndex === currentIndex) {
        return;
      }

      isScrolling.current = true;

      const nextPage = pages[nextIndex];

      activePageRef.current = nextPage;

      setActivePage(nextPage);

      window.setTimeout(() => {
        isScrolling.current = false;
      }, 2200);
    };

    let resetTimer: number | undefined;

    const handleWheelWithReset = (
      event: WheelEvent
    ) => {
      handleWheel(event);

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(() => {
        scrollAmount = 0;
      }, 700);
    };

    window.addEventListener(
      "wheel",
      handleWheelWithReset,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheelWithReset
      );

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }
    };
  }, []);

  /*
  ==========================================================
  MANUAL NAVIGATION
  ==========================================================
  */

  const handleNavigate = (page: string) => {
    /*
    Semua halaman yang boleh dibuka.
    */
    const allowedPages = [
      "home",
      "divisions",
      "studio",
      "tech",
      "work",
      "contact",
    ];

    if (!allowedPages.includes(page)) {
      return;
    }

    /*
    Kalau sedang di halaman Studio / Tech,
    tetap izinkan tombol Back bekerja.
    */
    if (
      isScrolling.current &&
      page !== "divisions"
    ) {
      return;
    }

    if (page === activePageRef.current) {
      return;
    }

    /*
    Unlock scroll ketika kembali ke divisions.
    */
    if (page === "divisions") {
      isScrolling.current = false;
    }

    activePageRef.current = page;

    setActivePage(page);

    /*
    Kembalikan posisi scroll ke atas.
    */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  ==========================================================
  BACK TO DIVISIONS
  ==========================================================
  */

  const handleBackToDivisions = () => {
    isScrolling.current = false;

    activePageRef.current = "divisions";

    setActivePage("divisions");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* ==================================================
          NAVBAR
          ================================================== */}

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* ==================================================
          HOME
          ================================================== */}

      {activePage === "home" && (
        <Hero
          onNavigate={handleNavigate}
        />
      )}

      {/* ==================================================
          DIVISIONS
          ================================================== */}

      {activePage === "divisions" && (
        <Talent
          onNavigate={handleNavigate}
        />
      )}

      {/* ==================================================
          STUDIO
          ================================================== */}

      {activePage === "studio" && (
        <>
          <button
            type="button"
            className="division-back-button"
            onClick={handleBackToDivisions}
          >
            <span className="division-back-button__arrow">
              ←
            </span>

            <span>
              DIVISIONS
            </span>
          </button>

          <div className="division-page-label">
            CREVIA / STUDIO
          </div>

          <Talent
            division="studio"
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* ==================================================
          TECH
          ================================================== */}

      {activePage === "tech" && (
        <>
          <button
            type="button"
            className="division-back-button"
            onClick={handleBackToDivisions}
          >
            <span className="division-back-button__arrow">
              ←
            </span>

            <span>
              DIVISIONS
            </span>
          </button>

          <div className="division-page-label">
            CREVIA / TECH
          </div>

          <Talent
            division="tech"
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* ==================================================
          PROJECT
          ================================================== */}

      {activePage === "work" && (
        <Work />
      )}

      {/* ==================================================
          CONTACT
          ================================================== */}

      {activePage === "contact" && (
        <Contact />
      )}

    </div>
  );
}