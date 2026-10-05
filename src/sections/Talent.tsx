import React, { useState } from "react";

type TalentItem = {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  specialization: string;
  portfolio: string[];
};

type DivisionType = "studio" | "tech";

type TalentProps = {
  division?: DivisionType;
  onNavigate?: (page: string) => void;
};

const studioTalents: TalentItem[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Creative Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    description:
      "Creative designer focused on creating meaningful visual experiences, strong identities and memorable digital stories.",
    specialization:
      "Specializing in high-concept brand identities and immersive cinematic narratives.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Art Director",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    description:
      "Art director creating visual systems that connect culture, people and contemporary design.",
    specialization:
      "Specializing in art direction, campaign visuals and creative concepts.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 3,
    name: "Alex Doe",
    role: "Motion Designer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    description:
      "Motion designer combining typography, animation and visual storytelling.",
    specialization:
      "Specializing in motion graphics, animation and visual storytelling.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 4,
    name: "Mike Doe",
    role: "Visual Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description:
      "Visual designer working across identity, digital products and experimental visual systems.",
    specialization:
      "Specializing in visual identity, digital design and creative direction.",
    portfolio: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80",
    ],
  },
];

const techTalents: TalentItem[] = [
  {
    id: 1,
    name: "John Tech",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    description:
      "Frontend developer building modern, interactive and highly responsive digital experiences.",
    specialization:
      "Specializing in React, TypeScript, interaction design and creative technology.",
    portfolio: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 2,
    name: "Jane Tech",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    description:
      "Software engineer focused on scalable applications and technology-driven products.",
    specialization:
      "Specializing in application architecture, APIs and modern web technologies.",
    portfolio: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 3,
    name: "Alex Tech",
    role: "Creative Technologist",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    description:
      "Creative technologist exploring the intersection between technology, interaction and culture.",
    specialization:
      "Specializing in interactive installations, creative coding and emerging technology.",
    portfolio: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 4,
    name: "Mike Tech",
    role: "UI Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description:
      "UI engineer turning creative concepts into polished and performant interfaces.",
    specialization:
      "Specializing in design systems, frontend architecture and interaction.",
    portfolio: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
    ],
  },
];

export default function Talent({
  division,
  onNavigate,
}: TalentProps) {
  /*
  ==========================================================
  DIVISION YANG SEDANG DIPILIH
  ==========================================================
  */

  const [selectedDivision, setSelectedDivision] =
    useState<DivisionType | null>(division ?? null);

  /*
  ==========================================================
  TALENT YANG SEDANG DIPILIH
  ==========================================================
  */

  const [selectedTalent, setSelectedTalent] =
    useState<TalentItem | null>(null);

  /*
  ==========================================================
  KEMBALI KE DIVISION
  ==========================================================
  */

  const handleBackToDivisions = () => {
    setSelectedTalent(null);
    setSelectedDivision(null);
  };

  /*
  ==========================================================
  JIKA BELUM MEMILIH DIVISION
  ==========================================================
  */

  if (!selectedDivision) {
    return (
      <section className="division-section">

        <div className="division-container">

          {/* HEADER */}

          <div className="division-header">

            <div className="division-header-left">
              <span className="division-number">
                02
              </span>

              <span className="division-label">
                DIVISIONS
              </span>
            </div>

            <span className="division-header-right">
              CREVIA / DIVISIONS
            </span>

          </div>

          {/* TITLE */}

          <div className="division-title-wrapper">

            <span className="division-eyebrow">
              CHOOSE YOUR PATH
            </span>

            <h1 className="division-title">
              Our
              <br />
              Divisions
            </h1>

          </div>

          {/* TWO DIVISION CARDS */}

          <div className="division-cards">

            {/* STUDIO */}

            <button
              type="button"
              className="division-card division-card--studio"
              onClick={() =>
                setSelectedDivision("studio")
              }
            >

              <div className="division-card-top">

                <span>
                  01
                </span>

                <span>
                  CREVIA / STUDIO
                </span>

              </div>

              <div className="division-card-center">

                <h2>
                  STUDIO
                </h2>

                <span className="division-card-arrow">
                  ↗
                </span>

              </div>

              <div className="division-card-bottom">

                <span>
                  CREATIVE
                </span>

                <span>
                  DESIGN
                </span>

              </div>

            </button>

            {/* TECH */}

            <button
              type="button"
              className="division-card division-card--tech"
              onClick={() =>
                setSelectedDivision("tech")
              }
            >

              <div className="division-card-top">

                <span>
                  02
                </span>

                <span>
                  CREVIA / TECH
                </span>

              </div>

              <div className="division-card-center">

                <h2>
                  TECH
                </h2>

                <span className="division-card-arrow">
                  ↗
                </span>

              </div>

              <div className="division-card-bottom">

                <span>
                  CREATIVE
                </span>

                <span>
                  TECHNOLOGY
                </span>

              </div>

            </button>

          </div>

          {/* BOTTOM INFO */}

          <div className="division-footer">

            <span>
              SELECT A DIVISION
            </span>

            <span>
              STUDIO / TECH
            </span>

          </div>

        </div>

      </section>
    );
  }

  /*
  ==========================================================
  DATA TALENT BERDASARKAN DIVISION
  ==========================================================
  */

  const talents =
    selectedDivision === "tech"
      ? techTalents
      : studioTalents;

  const divisionTitle =
    selectedDivision === "tech"
      ? "TECH TALENTS"
      : "STUDIO TALENTS";

  /*
  ==========================================================
  DETAIL TALENT
  ==========================================================
  */

  if (selectedTalent) {
    return (
      <section className="talent-detail-section" style={{ backgroundColor: "#0b456e", minHeight: "100vh" }}>

        <div className="talent-detail-wrapper">

          <button
            type="button"
            className="talent-back-button talent-detail-back-visible"
            onClick={() => setSelectedTalent(null)}
            aria-label="Back to talent list"
            style={{ color: "#ffffff", background: "rgba(11,69,110,0.95)", border: "1px solid rgba(255,255,255,0.75)", padding: "8px 14px", cursor: "pointer", position: "relative", zIndex: 10, display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600 }}
          >
            ← BACK TO TALENTS
          </button>

          <div className="talent-detail-card">

            <div className="talent-detail-photo">

              <img
                src={selectedTalent.image}
                alt={selectedTalent.name}
              />

            </div>

            <div className="talent-detail-content">

              <div className="talent-detail-heading">

                <div>

                  <span className="talent-detail-hi">
                    Hi, I'm
                  </span>

                  <h1>
                    {selectedTalent.name}
                  </h1>

                  <span className="talent-detail-role">
                    {selectedTalent.role}
                  </span>

                </div>

                <div className="talent-detail-arrows">

                  <button
                    onClick={() =>
                      setSelectedTalent(null)
                    }
                    aria-label="Back"
                  >
                    ↩
                  </button>

                  <button
                    onClick={handleBackToDivisions}
                    aria-label="Close"
                  >
                    ↪
                  </button>

                </div>

              </div>

              <div className="talent-detail-line" />

              <p className="talent-detail-description">
                {selectedTalent.description}
              </p>

              <p className="talent-detail-specialization">
                {selectedTalent.specialization}
              </p>

              <div className="talent-detail-portfolio">

                {selectedTalent.portfolio.map(
                  (image, index) => (
                    <div
                      className="talent-portfolio-image"
                      key={`${selectedTalent.id}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${selectedTalent.name} portfolio ${index + 1}`}
                      />
                    </div>
                  )
                )}

              </div>

              <div className="talent-detail-side-buttons">

                <button>
                  ↗
                </button>

                <button
                  onClick={() =>
                    setSelectedTalent(null)
                  }
                >
                  ↩
                </button>

                <button
                  onClick={handleBackToDivisions}
                >
                  ↪
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>
    );
  }

  /*
  ==========================================================
  TEAM / TALENT LIST
  ==========================================================
  */

  return (
    <section className="talent-team-section">

      <div className="talent-team-container">

        {/* TOP NAVIGATION */}

        <div className="talent-team-navigation">

          <button
            type="button"
            onClick={handleBackToDivisions}
          >
            ← DIVISIONS
          </button>

          <span>
            {selectedDivision === "studio"
              ? "CREVIA / STUDIO"
              : "CREVIA / TECH"}
          </span>

        </div>

        {/* HEADER */}

        <div className="talent-team-header">

          <div>

            <span className="talent-team-eyebrow">
              02 / {selectedDivision === "studio"
                ? "01"
                : "02"}
            </span>

            <h1>
              Meet
              <br />
              The Team
            </h1>

          </div>

          <span>
            {divisionTitle}
          </span>

        </div>

        {/* TALENT LIST */}

        <div className="talent-team-list">

          {talents.map((talent) => (

            <button
              type="button"
              className="talent-team-card"
              key={talent.id}
              onClick={() =>
                setSelectedTalent(talent)
              }
            >

              <div className="talent-team-photo">

                <img
                  src={talent.image}
                  alt={talent.name}
                />

              </div>

              <div className="talent-team-name">
                {talent.name}
              </div>

              <div className="talent-team-role">
                {talent.role}
              </div>

              <div className="talent-team-blue-line" />

              <span className="talent-team-arrow">
                ↗
              </span>

            </button>

          ))}

        </div>

        {/* HIGHLIGHT */}

        <div className="talent-highlight-title">

          {selectedDivision === "tech"
            ? "Tech Member highlight"
            : "Studio Member highlight"}

        </div>

        <div
          className="talent-highlight-card"
          onClick={() =>
            setSelectedTalent(talents[0])
          }
        >

          <div className="talent-highlight-photo">

            <img
              src={talents[0].image}
              alt={talents[0].name}
            />

          </div>

          <div className="talent-highlight-content">

            <div className="talent-highlight-top">

              <div>

                <span>
                  Hi, I'm
                </span>

                <h2>
                  {talents[0].name}
                </h2>

                <small>
                  {talents[0].role}
                </small>

              </div>

              <div className="talent-highlight-arrows">

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedTalent(talents[0]);
                  }}
                >
                  ↩
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedTalent(talents[0]);
                  }}
                >
                  ↪
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedTalent(talents[0]);
                  }}
                >
                  ↗
                </button>

              </div>

            </div>

            <p>
              {talents[0].description}
            </p>

            <small>
              {talents[0].specialization}
            </small>

            <div className="talent-highlight-portfolio">

              {talents[0].portfolio.map(
                (image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt={`${talents[0].name} portfolio`}
                  />

                )
              )}

            </div>

          </div>

          <div className="talent-highlight-side">

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedTalent(talents[0]);
              }}
            >
              ↗
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedTalent(talents[0]);
              }}
            >
              ↩
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedTalent(talents[0]);
              }}
            >
              ↪
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}