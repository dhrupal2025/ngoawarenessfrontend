import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// =====================================================
// LOCAL IMAGES
// Make sure these exact files exist inside:
// src/assets/images/
// =====================================================

import cleanIndiaImage from "../assets/images/CleanIndiaCampaign.jpg";
import communitySupportImage from "../assets/images/CommunitySupport.jpg";
import educationAwarenessImage from "../assets/images/EducationAwareness.jpg";
import educationProgramImage from "../assets/images/EducationProgram.jpg";
import healthCampImage from "../assets/images/HealthCamp.jpg";
import socialAwarenessImage from "../assets/images/SocialAwareness.jpg";
import treePlantationImage from "../assets/images/TreePlantation.jpg";
import volunteerWorkImage from "../assets/images/VolunteerWork.jpg";
import womenEmpowermentImage from "../assets/images/WomenEmpowerment.jpg";

function About() {
  const navigate = useNavigate();

  // =====================================================
  // COUNTER STATE
  // =====================================================

  const [counts, setCounts] = useState({
    people: 0,
    volunteers: 0,
    campaigns: 0,
    projects: 0,
  });

  const counterStarted = useRef(false);

  // =====================================================
  // ANIMATED COUNTER
  // =====================================================

  useEffect(() => {
    if (counterStarted.current) return;

    counterStarted.current = true;

    const targets = {
      people: 10000,
      volunteers: 500,
      campaigns: 120,
      projects: 80,
    };

    const duration = 1800;
    const intervalTime = 30;
    const steps = Math.ceil(duration / intervalTime);

    let step = 0;

    const interval = setInterval(() => {
      step++;

      setCounts({
        people: Math.min(
          Math.floor((targets.people / steps) * step),
          targets.people
        ),

        volunteers: Math.min(
          Math.floor((targets.volunteers / steps) * step),
          targets.volunteers
        ),

        campaigns: Math.min(
          Math.floor((targets.campaigns / steps) * step),
          targets.campaigns
        ),

        projects: Math.min(
          Math.floor((targets.projects / steps) * step),
          targets.projects
        ),
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* =====================================================
          CUSTOM CSS
      ====================================================== */}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .about-page {
            width: 100%;
            overflow-x: hidden;
          }

          /* =====================================================
             HERO
          ====================================================== */

          .about-hero {
            min-height: 75vh;

            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            display: flex;
            align-items: center;
            justify-content: center;

            position: relative;
          }

          .hero-content {
            animation: fadeUp 1s ease;
          }

          .hero-content h1 {
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          }

          .hero-content p {
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          }

          .hero-btn {
            border-radius: 30px;
            padding: 12px 28px;
            transition: all 0.3s ease;
          }

          .hero-btn:hover {
            transform: translateY(-4px);
          }

          /* =====================================================
             SECTION TITLE
          ====================================================== */

          .section-title {
            position: relative;
            display: inline-block;
          }

          .section-title::after {
            content: "";

            position: absolute;

            width: 65px;
            height: 4px;

            background: #198754;

            border-radius: 10px;

            left: 50%;
            bottom: -12px;

            transform: translateX(-50%);
          }

          /* =====================================================
             ALL IMAGES
          ====================================================== */

          .about-page img {
            display: block;
            max-width: 100%;
          }

          /* =====================================================
             MISSION / VISION / VALUES CARDS
          ====================================================== */

          .mission-card {
            overflow: hidden;

            border: none;

            border-radius: 20px;

            transition: all 0.35s ease;
          }

          .mission-card:hover {
            transform: translateY(-10px);

            box-shadow:
              0 18px 35px rgba(0, 0, 0, 0.15) !important;
          }

          .mission-card img {
            width: 100%;
            height: 230px;

            object-fit: cover;

            display: block;

            opacity: 1;
            visibility: visible;

            transition: transform 0.5s ease;
          }

          .mission-card:hover img {
            transform: scale(1.08);
          }

          /* =====================================================
             WORK CARDS
          ====================================================== */

          .work-card {
            overflow: hidden;

            border: none;

            border-radius: 18px;

            transition: all 0.35s ease;
          }

          .work-card:hover {
            transform: translateY(-10px);

            box-shadow:
              0 18px 35px rgba(0, 0, 0, 0.15) !important;
          }

          .work-card img {
            width: 100%;
            height: 220px;

            object-fit: cover;

            display: block;

            opacity: 1;
            visibility: visible;

            transition: transform 0.5s ease;
          }

          .work-card:hover img {
            transform: scale(1.08);
          }

          /* =====================================================
             IMPACT
          ====================================================== */

          .impact-section {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            background-attachment: fixed;
          }

          .impact-box {
            padding: 25px 10px;

            transition: all 0.3s ease;
          }

          .impact-box:hover {
            transform: translateY(-8px);
          }

          /* =====================================================
             HELP CARDS
          ====================================================== */

          .help-card {
            border: none;

            border-radius: 20px;

            overflow: hidden;

            transition: all 0.35s ease;
          }

          .help-card:hover {
            transform: translateY(-10px);

            box-shadow:
              0 18px 35px rgba(0, 0, 0, 0.15) !important;
          }

          .help-card img {
            width: 100%;
            height: 250px;

            object-fit: cover;

            display: block;

            opacity: 1;
            visibility: visible;

            transition: transform 0.5s ease;
          }

          .help-card:hover img {
            transform: scale(1.07);
          }

          /* =====================================================
             GALLERY
          ====================================================== */

          .gallery-image {
            width: 100%;
            height: 250px;

            object-fit: cover;

            display: block;

            opacity: 1;
            visibility: visible;

            border-radius: 16px;

            transition: all 0.4s ease;
          }

          .gallery-image:hover {
            transform: scale(1.04);

            box-shadow:
              0 15px 30px rgba(0, 0, 0, 0.18);
          }

          /* =====================================================
             CTA
          ====================================================== */

          .cta-section {
            min-height: 420px;

            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            display: flex;
            align-items: center;
          }

          /* =====================================================
             BUTTON
          ====================================================== */

          .custom-btn {
            transition: all 0.3s ease;
          }

          .custom-btn:hover {
            transform: translateY(-3px);
          }

          /* =====================================================
             ANIMATION
          ====================================================== */

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(35px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* =====================================================
             TABLET / MOBILE
          ====================================================== */

          @media (max-width: 768px) {

            .about-hero {
              min-height: 65vh;
              background-attachment: scroll;
            }

            .impact-section {
              background-attachment: scroll;
            }

            .cta-section {
              min-height: 350px;
            }

            .hero-content h1 {
              font-size: 2.5rem;
            }

            .hero-content .lead {
              font-size: 1.1rem !important;
            }

            .about-image {
              height: 350px;
            }

            .gallery-image {
              height: 200px;
            }
          }

          @media (max-width: 576px) {

            .about-hero {
              min-height: 70vh;
            }

            .hero-content h1 {
              font-size: 2.1rem;
            }

            .hero-content p {
              font-size: 1rem !important;
            }

            .gallery-image {
              height: 180px;
            }
          }
        `}
      </style>

      <div className="about-page">

        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <section
          className="about-hero text-white"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(0, 0, 0, 0.55),
                rgba(0, 0, 0, 0.65)
              ),
              url(${communitySupportImage})
            `,
          }}
        >
          <div className="container text-center hero-content">

            <div className="badge bg-warning text-dark px-3 py-2 mb-3">
              Making a Difference Together
            </div>

            <h1 className="display-2 fw-bold mb-3">
              About Our NGO
            </h1>

            <p className="lead fs-3 mb-4">
              Working Together to Build a Better Future
            </p>

            <p
              className="lead mx-auto mb-4"
              style={{ maxWidth: "750px" }}
            >
              We believe that every person has the power to create
              positive change. Together with our volunteers, donors,
              and communities, we work toward a better and more
              sustainable society.
            </p>

            <button
              className="btn btn-success btn-lg rounded-pill px-4 me-2 mb-2 hero-btn"
              onClick={() => navigate("/campaigns")}
            >
              Explore Campaigns
            </button>

            <button
              className="btn btn-outline-light btn-lg rounded-pill px-4 mb-2 hero-btn"
              onClick={() => navigate("/volunteer")}
            >
              Become a Volunteer
            </button>

          </div>
        </section>


        {/* =====================================================
            MISSION • VISION • VALUES
        ====================================================== */}

        <section className="bg-light py-5">

          <div className="container py-4">

            <div className="text-center mb-5">

              <div className="text-success fw-bold">
                WHAT DRIVES US
              </div>
                   <br />  <br />
              <h2 className="display-6 fw-bold mt-2 section-title">
                Mission • Vision • Values
              </h2>

              <p
                className="text-muted mt-4 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                Our work is guided by strong principles and a
                clear commitment to creating lasting positive change.
              </p>

            </div>


            <div className="row g-4">

              {/* ================= MISSION ================= */}

              <div className="col-md-4">

                <div className="card mission-card shadow-sm h-100">

                  <img
                    src={educationAwarenessImage}
                    alt="Community education mission"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      🎯
                    </div>

                    <h4 className="fw-bold">
                      Our Mission
                    </h4>

                    <p className="text-muted mb-0">
                      To empower communities through education,
                      healthcare, social awareness, and sustainable
                      development programs.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= VISION ================= */}

              <div className="col-md-4">

                <div className="card mission-card shadow-sm h-100">

                  <img
                    src={communitySupportImage}
                    alt="Community volunteers vision"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      👁️
                    </div>

                    <h4 className="fw-bold">
                      Our Vision
                    </h4>

                    <p className="text-muted mb-0">
                      To create an inclusive society where every
                      person has equal opportunities and can live
                      with dignity.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= VALUES ================= */}

              <div className="col-md-4">

                <div className="card mission-card shadow-sm h-100">

                  <img
                    src={volunteerWorkImage}
                    alt="Volunteers working together"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      ❤️
                    </div>

                    <h4 className="fw-bold">
                      Our Values
                    </h4>

                    <p className="text-muted mb-0">
                      Integrity, compassion, equality, transparency,
                      teamwork, accountability, and sustainable
                      development.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            OUR WORK
        ====================================================== */}

        <section className="py-5">

          <div className="container py-4">

            <div className="text-center mb-5">

              <div className="text-success fw-bold">
                OUR INITIATIVES
              </div>
               <br />
              <h2 className="display-6 fw-bold mt-2 section-title">
                Our Work
              </h2>

              <p
                className="text-muted mt-4 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                We focus on areas that can create meaningful
                and long-lasting improvements in people's lives.
              </p>

            </div>


            <div className="row g-4">

              {/* ================= EDUCATION ================= */}

              <div className="col-sm-6 col-lg-3">

                <div className="card work-card shadow-sm h-100">

                  <img
                    src={educationProgramImage}
                    alt="Education for children"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      📚
                    </div>

                    <h5 className="fw-bold">
                      Education
                    </h5>

                    <p className="text-muted small">
                      Helping children access quality education,
                      learning resources, and better opportunities.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= HEALTHCARE ================= */}

              <div className="col-sm-6 col-lg-3">

                <div className="card work-card shadow-sm h-100">

                  <img
                    src={healthCampImage}
                    alt="Healthcare support"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      🏥
                    </div>

                    <h5 className="fw-bold">
                      Healthcare
                    </h5>

                    <p className="text-muted small">
                      Organizing medical camps, health awareness
                      programs, and healthcare support.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= ENVIRONMENT ================= */}

              <div className="col-sm-6 col-lg-3">

                <div className="card work-card shadow-sm h-100">

                  <img
                    src={treePlantationImage}
                    alt="Environmental protection"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      🌳
                    </div>

                    <h5 className="fw-bold">
                      Environment
                    </h5>

                    <p className="text-muted small">
                      Promoting tree plantation, environmental
                      conservation, cleanliness, and sustainability.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= WOMEN EMPOWERMENT ================= */}

              <div className="col-sm-6 col-lg-3">

                <div className="card work-card shadow-sm h-100">

                  <img
                    src={womenEmpowermentImage}
                    alt="Women empowerment"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      👩
                    </div>

                    <h5 className="fw-bold">
                      Women Empowerment
                    </h5>

                    <p className="text-muted small">
                      Supporting women through education, skills,
                      awareness, and employment opportunities.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            IMPACT
        ====================================================== */}

        <section
          className="impact-section text-white py-5"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(25, 135, 84, 0.90),
                rgba(13, 91, 55, 0.90)
              ),
              url(${cleanIndiaImage})
            `,
          }}
        >

          <div className="container py-4">

            <div className="text-center mb-5">

              <div className="badge bg-warning text-dark px-3 py-2">
                OUR IMPACT
              </div>
                 <br />
              <h2 className="display-6 fw-bold mt-3">
                Together We Make a Difference
              </h2>

              <p className="opacity-75">
                Every donation, volunteer hour, and campaign
                contributes to positive change.
              </p>

            </div>


            <div className="row text-center g-4">

              {/* PEOPLE */}

              <div className="col-6 col-lg-3">

                <div className="impact-box">

                  <h1 className="display-5 fw-bold">
                    {counts.people.toLocaleString()}+
                  </h1>

                  <h5>
                    People Helped
                  </h5>

                </div>

              </div>


              {/* VOLUNTEERS */}

              <div className="col-6 col-lg-3">

                <div className="impact-box">

                  <h1 className="display-5 fw-bold">
                    {counts.volunteers.toLocaleString()}+
                  </h1>

                  <h5>
                    Volunteers
                  </h5>

                </div>

              </div>


              {/* CAMPAIGNS */}

              <div className="col-6 col-lg-3">

                <div className="impact-box">

                  <h1 className="display-5 fw-bold">
                    {counts.campaigns}+
                  </h1>

                  <h5>
                    Campaigns
                  </h5>

                </div>

              </div>


              {/* PROJECTS */}

              <div className="col-6 col-lg-3">

                <div className="impact-box">

                  <h1 className="display-5 fw-bold">
                    {counts.projects}+
                  </h1>

                  <h5>
                    Projects
                  </h5>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW YOU CAN HELP
        ====================================================== */}

        <section className="bg-light py-5">

          <div className="container py-4">

            <div className="text-center mb-5">

              <div className="text-success fw-bold">
                GET INVOLVED
              </div>
                  <br />
              <h2 className="display-6 fw-bold mt-2 section-title">
                You Can Make a Difference
              </h2>

            </div>


            <div className="row g-4">

              {/* ================= DONATE ================= */}

              <div className="col-md-4">

                <div className="card help-card shadow-sm h-100">

                  <img
                    src={cleanIndiaImage}
                    alt="Donation and charity"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      💰
                    </div>

                    <h4 className="fw-bold">
                      Donate
                    </h4>

                    <p className="text-muted">
                      Your contribution can help fund campaigns
                      and support communities that need assistance.
                    </p>

                    <button
                      className="btn btn-warning custom-btn"
                      onClick={() => navigate("/donate")}
                    >
                      Donate Now
                    </button>

                  </div>

                </div>

              </div>


              {/* ================= VOLUNTEER ================= */}

              <div className="col-md-4">

                <div className="card help-card shadow-sm h-100">

                  <img
                    src={volunteerWorkImage}
                    alt="NGO volunteers"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      🤝
                    </div>

                    <h4 className="fw-bold">
                      Volunteer
                    </h4>

                    <p className="text-muted">
                      Share your skills, time, and passion to help
                      us make a greater impact in the community.
                    </p>

                    <button
                      className="btn btn-success custom-btn"
                      onClick={() => navigate("/volunteer")}
                    >
                      Join as Volunteer
                    </button>

                  </div>

                </div>

              </div>


              {/* ================= AWARENESS ================= */}

              <div className="col-md-4">

                <div className="card help-card shadow-sm h-100">

                  <img
                    src={socialAwarenessImage}
                    alt="Community awareness"
                  />

                  <div className="card-body text-center p-4">

                    <div className="fs-1 mb-2">
                      📢
                    </div>

                    <h4 className="fw-bold">
                      Spread Awareness
                    </h4>

                    <p className="text-muted">
                      Share our campaigns and social awareness
                      initiatives with your friends and community.
                    </p>

                    <button
                      className="btn btn-primary custom-btn"
                      onClick={() => navigate("/campaigns")}
                    >
                      View Campaigns
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            IMAGE GALLERY
        ====================================================== */}

        <section className="py-5">

          <div className="container">

            <div className="text-center mb-5">

  <div className="text-success fw-bold mb-2">
    OUR COMMUNITY
  </div>

  <h2 className="display-6 fw-bold section-title">
    Moments That Matter
  </h2>

  <p className="text-muted mt-4">
    Small actions can create big changes.
  </p>

</div>

            <div className="row g-3">

              {/* IMAGE 1 */}

              <div className="col-6 col-md-3">

                <img
                  src={communitySupportImage}
                  alt="Community support"
                  className="gallery-image shadow-sm"
                />

              </div>


              {/* IMAGE 2 */}

              <div className="col-6 col-md-3">

                <img
                  src={volunteerWorkImage}
                  alt="Volunteers together"
                  className="gallery-image shadow-sm"
                />

              </div>


              {/* IMAGE 3 */}

              <div className="col-6 col-md-3">

                <img
                  src={cleanIndiaImage}
                  alt="Clean India campaign"
                  className="gallery-image shadow-sm"
                />

              </div>


              {/* IMAGE 4 */}

              <div className="col-6 col-md-3">

                <img
                  src={educationAwarenessImage}
                  alt="Education awareness"
                  className="gallery-image shadow-sm"
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <section
          className="cta-section text-center py-5"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255, 255, 255, 0.82),
                rgba(255, 255, 255, 0.82)
              ),
              url(${volunteerWorkImage})
            `,
          }}
        >

          <div className="container py-5">

            <h2 className="display-5 fw-bold">
              Be a Part of the Change
            </h2>

            <p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Together, we can create a better future, empower
              communities, protect our environment, and give
              people the opportunity to live with dignity.
            </p>

            <div className="mt-4">

              <button
                className="btn btn-warning btn-lg px-4 me-2 mb-2 custom-btn"
                onClick={() => navigate("/donate")}
              >
                ❤️ Donate Now
              </button>

              <button
                className="btn btn-success btn-lg px-4 mb-2 custom-btn"
                onClick={() => navigate("/volunteer")}
              >
                🤝 Become a Volunteer
              </button>

            </div>

          </div>

        </section>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="bg-dark text-white py-4">

          <div className="container">

            <div className="row align-items-center">

              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">

                <h5 className="fw-bold mb-1">
                  NGO Social Awareness
                </h5>

                <small className="text-secondary">
                  Working Together for a Better Future
                </small>

              </div>


              <div className="col-md-6 text-center text-md-end">

                <button
                  className="btn btn-outline-light btn-sm me-2"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>

                <button
                  className="btn btn-outline-light btn-sm me-2"
                  onClick={() => navigate("/campaigns")}
                >
                  Campaigns
                </button>

                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => navigate("/volunteer")}
                >
                  Volunteer
                </button>

              </div>

            </div>


            <hr className="border-secondary my-3" />

            <p className="text-center text-secondary mb-0 small">
              © {new Date().getFullYear()} NGO Social Awareness.
              All Rights Reserved.
            </p>

          </div>

        </footer>

      </div>
    </>
  );
}

export default About;