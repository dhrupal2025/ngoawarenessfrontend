import Navbar from "../components/Navbar";

import cleanIndiaImage from "../assets/images/CleanIndiaCampaign.jpg";
import communitySupportImage from "../assets/images/CommunitySupport.jpg";
import educationAwarenessImage from "../assets/images/EducationAwareness.jpg";
import educationProgramImage from "../assets/images/EducationProgram.jpg";
import healthCampImage from "../assets/images/HealthCamp.jpg";
import socialAwarenessImage from "../assets/images/SocialAwareness.jpg";
import treePlantationImage from "../assets/images/TreePlantation.jpg";
import volunteerWorkImage from "../assets/images/VolunteerWork.jpg";
import womenEmpowermentImage from "../assets/images/WomenEmpowerment.jpg";

function Gallery() {
  // =========================
  // Gallery Images
  // =========================
  const gallery = [
    {
      id: 1,
      image: educationAwarenessImage,
      title: "Education Awareness",
    },
    {
      id: 2,
      image: healthCampImage,
      title: "Health Camp",
    },
    {
      id: 3,
      image: treePlantationImage,
      title: "Tree Plantation",
    },
    {
      id: 4,
      image: volunteerWorkImage,
      title: "Volunteer Work",
    },
    {
      id: 5,
      image: cleanIndiaImage,
      title: "Clean India Campaign",
    },
    {
      id: 6,
      image: educationProgramImage,
      title: "Education Program",
    },
    {
      id: 7,
      image: communitySupportImage,
      title: "Community Support",
    },
    {
      id: 8,
      image: womenEmpowermentImage,
      title: "Women Empowerment",
    },
    {
      id: 9,
      image: socialAwarenessImage,
      title: "Social Awareness",
    },
  ];

  return (
    <>
      <Navbar />

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section
        className="d-flex align-items-center text-white"
        style={{
          minHeight: "45vh",

          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.65),
              rgba(0, 0, 0, 0.65)
            ),
            url(${communitySupportImage})
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container text-center">

          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            Our Community
          </span>

          <h1 className="display-4 fw-bold mb-3">
            Our Gallery
          </h1>

          <p
            className="lead mx-auto"
            style={{ maxWidth: "750px" }}
          >
            Explore memorable moments from our awareness campaigns,
            volunteer activities, education programs, healthcare
            initiatives, and community events.
          </p>

        </div>
      </section>

      {/* =====================================================
          GALLERY SECTION
      ====================================================== */}

      <section className="py-5 bg-light">

        <div className="container">

          <div className="text-center mb-5">

            <span className="text-success fw-bold">
              OUR MEMORIES
            </span>

            <h2 className="fw-bold display-6 mt-2">
              Moments That Inspire
            </h2>

            <p
              className="text-muted mx-auto mt-3"
              style={{ maxWidth: "700px" }}
            >
              Every photograph represents a moment of teamwork,
              compassion, awareness, and positive change in our
              communities.
            </p>

          </div>

          <div className="row g-4">

            {gallery.map((item) => (

              <div
                className="col-lg-4 col-md-6"
                key={item.id}
              >

                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    transition: "all 0.35s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0.125rem 0.25rem rgba(0,0,0,0.075)";
                  }}
                >

                  <div
                    style={{
                      overflow: "hidden",
                    }}
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top"
                      loading="lazy"
                      style={{
                        height: "260px",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1)";
                      }}
                    />

                  </div>

                  <div className="card-body text-center p-4">

                    <h5 className="fw-bold mb-2">
                      {item.title}
                    </h5>

                    <p className="text-muted small mb-0">
                      Creating positive change together.
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="bg-success text-white py-5">

        <div className="container">

          <div className="text-center mb-5">

            <span className="badge bg-warning text-dark px-3 py-2">
              OUR IMPACT
            </span>

            <h2 className="fw-bold mt-3">
              Together We Make a Difference
            </h2>

          </div>

          <div className="row text-center g-4">

            <div className="col-6 col-md-3">

              <div className="p-3">

                <h1 className="fw-bold display-5">
                  500+
                </h1>

                <h5>
                  Volunteers
                </h5>

              </div>

            </div>

            <div className="col-6 col-md-3">

              <div className="p-3">

                <h1 className="fw-bold display-5">
                  120+
                </h1>

                <h5>
                  Campaigns
                </h5>

              </div>

            </div>

            <div className="col-6 col-md-3">

              <div className="p-3">

                <h1 className="fw-bold display-5">
                  50K+
                </h1>

                <h5>
                  Photos Captured
                </h5>

              </div>

            </div>

            <div className="col-6 col-md-3">

              <div className="p-3">

                <h1 className="fw-bold display-5">
                  10K+
                </h1>

                <h5>
                  Lives Impacted
                </h5>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}

      <section className="py-5 text-center">

        <div className="container py-4">

          <span className="text-success fw-bold">
            GET INVOLVED
          </span>

          <h2 className="fw-bold display-6 mt-2">
            Become Part of Our Journey
          </h2>

          <p
            className="lead text-muted mx-auto mt-3"
            style={{ maxWidth: "700px" }}
          >
            Join our volunteers and help create meaningful change
            in communities through education, healthcare,
            environmental protection, and social awareness.
          </p>

          <div className="mt-4">

            <button
              className="btn btn-success btn-lg rounded-pill px-4 me-2 mb-2"
              onClick={() =>
                (window.location.href = "/volunteer")
              }
            >
              🤝 Join Us
            </button>

            <button
              className="btn btn-warning btn-lg rounded-pill px-4 mb-2"
              onClick={() =>
                (window.location.href = "/donate")
              }
            >
              ❤️ Donate Now
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
                onClick={() =>
                  (window.location.href = "/")
                }
              >
                Home
              </button>

              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={() =>
                  (window.location.href = "/campaigns")
                }
              >
                Campaigns
              </button>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={() =>
                  (window.location.href = "/volunteer")
                }
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

    </>
  );
}

export default Gallery;