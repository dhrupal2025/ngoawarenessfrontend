import { useNavigate } from "react-router-dom";
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


function Home() {
  return (
    <>
      <Navbar />

     {/* =========================
    HERO CAROUSEL / SLIDESHOW
========================= */}

<section className="hero-carousel">

    <div
        id="ngoHeroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
    >

        {/* INDICATORS */}

        <div className="carousel-indicators">

            <button
                type="button"
                data-bs-target="#ngoHeroCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
            />

            <button
                type="button"
                data-bs-target="#ngoHeroCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
            />

            <button
                type="button"
                data-bs-target="#ngoHeroCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
            />

            <button
                type="button"
                data-bs-target="#ngoHeroCarousel"
                data-bs-slide-to="3"
                aria-label="Slide 4"
            />

        </div>

        {/* SLIDES */}

        <div className="carousel-inner">

            {/* SLIDE 1 */}

            <div className="carousel-item active">

                <img
                    src={socialAwarenessImage}
                    className="d-block w-100 hero-slide-image"
                    alt="Social Awareness"
                />

                <div className="hero-overlay"></div>

                <div className="carousel-caption hero-caption">

                    <div className="container">

                        <h5 className="text-warning fw-bold">
                            Welcome to NGO Social Awareness
                        </h5>

                        <h1 className="display-3 fw-bold">
                            Together We Can Build
                            <br />
                            A Better Tomorrow
                        </h1>

                        <p className="lead">
                            We work towards creating awareness about
                            education, healthcare, environmental
                            protection, women empowerment and child welfare.
                        </p>

                        <div className="mt-4">

                            <button className="btn btn-warning btn-lg me-3">
                                Donate Now
                            </button>

                            <button className="btn btn-outline-light btn-lg">
                                Become Volunteer
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* SLIDE 2 */}

            <div className="carousel-item">

                <img
                    src={treePlantationImage} 
                    className="d-block w-100 hero-slide-image"
                    alt="Tree Plantation"
                />

                <div className="hero-overlay"></div>

                <div className="carousel-caption hero-caption">

                    <div className="container">

                        <h5 className="text-warning fw-bold">
                            🌳 Environment Protection
                        </h5>

                        <h1 className="display-3 fw-bold">
                            Plant Trees
                            <br />
                            Save Our Future
                        </h1>

                        <p className="lead">
                            Join us in creating a greener and healthier
                            environment for future generations.
                        </p>

                        <button className="btn btn-warning btn-lg">
                            Join Campaign
                        </button>

                    </div>

                </div>

            </div>


            {/* SLIDE 3 */}

            <div className="carousel-item">

                <img src={healthCampImage} 
                    className="d-block w-100 hero-slide-image"
                    alt="Health Camp"
                />

                <div className="hero-overlay"></div>

                <div className="carousel-caption hero-caption">

                    <div className="container">

                        <h5 className="text-warning fw-bold">
                            🩺 Healthcare Awareness
                        </h5>

                        <h1 className="display-3 fw-bold">
                            Better Health
                            <br />
                            Better Life
                        </h1>

                        <p className="lead">
                            Support free health camps and help families
                            get access to essential healthcare services.
                        </p>

                        <button className="btn btn-warning btn-lg">
                            Support Health Camp
                        </button>

                    </div>

                </div>

            </div>


            {/* SLIDE 4 */}

            <div className="carousel-item">

                <img
                    src={educationAwarenessImage}
                    className="d-block w-100 hero-slide-image"
                    alt="Education Awareness"
                />

                <div className="hero-overlay"></div>

                <div className="carousel-caption hero-caption">

                    <div className="container">

                        <h5 className="text-warning fw-bold">
                            📚 Education for All
                        </h5>

                        <h1 className="display-3 fw-bold">
                            Every Child
                            <br />
                            Deserves Education
                        </h1>

                        <p className="lead">
                            Help children receive quality education,
                            books and learning opportunities.
                        </p>

                        <button className="btn btn-warning btn-lg">
                            Support Education
                        </button>

                    </div>

                </div>

            </div>

        </div>


        {/* PREVIOUS BUTTON */}

        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#ngoHeroCarousel"
            data-bs-slide="prev"
        >

            <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
            ></span>

            <span className="visually-hidden">
                Previous
            </span>

        </button>


        {/* NEXT BUTTON */}

        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#ngoHeroCarousel"
            data-bs-slide="next"
        >

            <span
                className="carousel-control-next-icon"
                aria-hidden="true"
            ></span>

            <span className="visually-hidden">
                Next
            </span>

        </button>

    </div>


    {/* HERO CSS */}
<style>
{`
.hero-carousel {
    width: 100%;
    height: 420px;
    overflow: hidden;
    position: relative;
}

.hero-carousel .carousel,
.hero-carousel .carousel-inner,
.hero-carousel .carousel-item {
    width: 100%;
    height: 100%;
}

.hero-slide-image {
    width: 100%;
    height: 100%;
    display: block;

    object-fit: cover;
    object-position: center center;

    filter: none !important;
    opacity: 1 !important;
}

.hero-overlay {
    position: absolute;
    inset: 0;

    background: rgba(0, 0, 0, 0.20);

    z-index: 1;
    pointer-events: none;
}

.hero-caption {
    position: absolute;
    inset: 0;

    z-index: 2;

    display: flex;
    align-items: center;

    text-align: left;
    padding: 0 8%;
}

.hero-caption h1 {
    font-weight: 700;
    text-shadow: 2px 3px 8px rgba(0, 0, 0, 0.85);
}

.hero-caption p {
    max-width: 750px;
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.85);
}

.carousel-control-prev,
.carousel-control-next {
    width: 70px;
    z-index: 5;
}

.carousel-indicators {
    z-index: 5;
}

.carousel-indicators button {
    width: 35px;
    height: 5px;
    border-radius: 10px;
}

@media (max-width: 768px) {

    .hero-carousel {
        height: calc(100vh - 60px);
    }

    .hero-caption {
        padding: 0 8%;
        text-align: center;
        justify-content: center;
    }

    .hero-caption h1 {
        font-size: 2rem;
    }

    .hero-caption p {
        font-size: 0.95rem;
    }

}
`}
</style>
</section>
   
      {/* Awareness Programs */}
      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h5 className="text-success fw-bold">
              WHAT WE DO
            </h5>

            <h2 className="fw-bold">
              Awareness Programs
            </h2>

          </div>

          <div className="row g-4">

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow text-center p-4">
                <h1>📚</h1>
                <h5>Education</h5>
                <p>Support quality education for every child.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow text-center p-4">
                <h1>🏥</h1>
                <h5>Healthcare</h5>
                <p>Free health camps and awareness programs.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow text-center p-4">
                <h1>🌱</h1>
                <h5>Environment</h5>
                <p>Tree plantation and environmental protection.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow text-center p-4">
                <h1>👩</h1>
                <h5>Women Empowerment</h5>
                <p>Promoting equality and skill development.</p>
              </div>
            </div>

          </div>

        </div>

      </section>
{/* =========================
    IMAGE MARQUEE
========================= */}

<section className="py-5 bg-light overflow-hidden">

    <div className="container">

        <h2 className="text-center fw-bold text-success mb-4">
            🌱 Our Campaigns & Activities
        </h2>

    </div>

    <div className="ngo-image-marquee">

        <div className="ngo-image-track">

            {/* IMAGE 1 */}
            <div className="ngo-image-item">
                <img
                    src={treePlantationImage}
                    alt="Tree Plantation"
                />
                <div className="ngo-image-caption">
                    🌳 Tree Plantation
                </div>
            </div>

            {/* IMAGE 2 */}
            <div className="ngo-image-item">
                <img
                    src={healthCampImage}
                    alt="Health Camp"
                />
                <div className="ngo-image-caption">
                    🩺 Health Camp
                </div>
            </div>

            {/* IMAGE 3 */}
            <div className="ngo-image-item">
                <img
                    src={educationAwarenessImage}
                    alt="Education Awareness"
                />
                <div className="ngo-image-caption">
                    📚 Education for All
                </div>
            </div>

            {/* IMAGE 4 */}
            <div className="ngo-image-item">
                <img
                    src={volunteerWorkImage}
                    alt="Volunteer Work"
                />
                <div className="ngo-image-caption">
                    🤝 Volunteer Work
                </div>
            </div>

            {/* IMAGE 5 */}
            <div className="ngo-image-item">
                <img
                    src={cleanIndiaImage}
                    alt="Clean India Campaign"
                />
                <div className="ngo-image-caption">
                    🧹 Clean India Campaign
                </div>
            </div>

            {/* IMAGE 6 */}
            <div className="ngo-image-item">
                <img
                    src={educationProgramImage}
                    alt="Education Program"
                />
                <div className="ngo-image-caption">
                    🎓 Education Program
                </div>
            </div>

            {/* IMAGE 7 */}
            <div className="ngo-image-item">
                <img
                    src={communitySupportImage}
                    alt="Community Support"
                />
                <div className="ngo-image-caption">
                    ❤️ Community Support
                </div>
            </div>

            {/* IMAGE 8 */}
            <div className="ngo-image-item">
                <img
                    src={womenEmpowermentImage}
                    alt="Women Empowerment"
                />
                <div className="ngo-image-caption">
                    👩 Women Empowerment
                </div>
            </div>

            {/* IMAGE 9 */}
            <div className="ngo-image-item">
                <img
                    src={socialAwarenessImage}
                    alt="Social Awareness"
                />
                <div className="ngo-image-caption">
                    📢 Social Awareness
                </div>
            </div>


            {/* =========================
                DUPLICATE FOR LOOP
            ========================= */}

            <div className="ngo-image-item">
                <img
                    src={treePlantationImage}
                    alt="Tree Plantation"
                />
                <div className="ngo-image-caption">
                    🌳 Tree Plantation
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={healthCampImage}
                    alt="Health Camp"
                />
                <div className="ngo-image-caption">
                    🩺 Health Camp
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={educationAwarenessImage}
                    alt="Education Awareness"
                />
                <div className="ngo-image-caption">
                    📚 Education for All
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={volunteerWorkImage}
                    alt="Volunteer Work"
                />
                <div className="ngo-image-caption">
                    🤝 Volunteer Work
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={cleanIndiaImage}
                    alt="Clean India Campaign"
                />
                <div className="ngo-image-caption">
                    🧹 Clean India Campaign
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={educationProgramImage}
                    alt="Education Program"
                />
                <div className="ngo-image-caption">
                    🎓 Education Program
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={communitySupportImage}
                    alt="Community Support"
                />
                <div className="ngo-image-caption">
                    ❤️ Community Support
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={womenEmpowermentImage}
                    alt="Women Empowerment"
                />
                <div className="ngo-image-caption">
                    👩 Women Empowerment
                </div>
            </div>

            <div className="ngo-image-item">
                <img
                    src={socialAwarenessImage}
                    alt="Social Awareness"
                />
                <div className="ngo-image-caption">
                    📢 Social Awareness
                </div>
            </div>

        </div>

    </div>

    <style>
        {`
        .ngo-image-marquee {
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .ngo-image-track {
            display: flex;
            width: max-content;
            gap: 25px;
            animation: ngoImageScroll 35s linear infinite;
        }

        .ngo-image-item {
            position: relative;
            width: 320px;
            height: 220px;
            flex-shrink: 0;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .ngo-image-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s ease;
        }

        .ngo-image-item:hover img {
            transform: scale(1.08);
        }

        .ngo-image-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 15px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            background: linear-gradient(
                transparent,
                rgba(0, 0, 0, 0.85)
            );
        }

        .ngo-image-track:hover {
            animation-play-state: paused;
        }

        @keyframes ngoImageScroll {
            0% {
                transform: translateX(0);
            }

            100% {
                transform: translateX(calc(-50% - 12.5px));
            }
        }

        @media (max-width: 768px) {
            .ngo-image-item {
                width: 260px;
                height: 180px;
            }

            .ngo-image-track {
                gap: 15px;
                animation-duration: 25s;
            }
        }
        `}
    </style>

</section> </>
  );
}

export default Home;