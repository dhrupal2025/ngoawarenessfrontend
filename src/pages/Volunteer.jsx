import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Volunteer() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const API_URL = "http://localhost:8081/api/volunteers";


    // =========================
    // LOAD VOLUNTEER EVENTS
    // =========================
    useEffect(() => {
        loadEvents();
    }, []);


    const loadEvents = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(API_URL);

            setEvents(response.data);

        } catch (error) {

            console.error("Volunteer events loading error:", error);

            /*
             * Sample data is used only when the backend
             * is unavailable.
             */

            setEvents(sampleEvents);

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // SAMPLE EVENTS
    // =========================
    const sampleEvents = [

        {
            id: 1,
            title: "Tree Plantation Drive",
            description:
                "Join our team to plant trees and help make our environment greener.",
            location: "Ahmedabad",
            date: "15 August 2026",
            status: "Open",
            image:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80"
        },

        {
            id: 2,
            title: "Health Checkup Camp",
            description:
                "Support doctors in organizing free health camps for needy people.",
            location: "Vadodara",
            date: "25 August 2026",
            status: "Open",
            image:
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80"
        },

        {
            id: 3,
            title: "Education Support",
            description:
                "Teach underprivileged children and help build a brighter future.",
            location: "Surat",
            date: "10 September 2026",
            status: "Open",
            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
        }

    ];


    return (

        <>

            <Navbar />


            <div className="container py-5">


                {/* =========================
                    HEADER
                ========================== */}

                <h2 className="text-center text-success fw-bold mb-2">

                    🤝 Volunteer Opportunities

                </h2>


                <p className="text-center text-muted mb-5">

                    Become a volunteer and help us create
                    a better society.

                </p>


                {/* =========================
                    LOADING
                ========================== */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        >
                        </div>

                        <p className="mt-3 text-muted">

                            Loading volunteer opportunities...

                        </p>

                    </div>

                )}


                {/* =========================
                    EVENTS
                ========================== */}

                {!loading && (

                    <div className="row">

                        {events.map((v) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={v.id}
                            >

                                <div className="card shadow-lg border-0 rounded-4 h-100 overflow-hidden">


                                    {/* IMAGE */}

                                    {v.image ? (

                                        <img
                                            src={v.image}
                                            alt={v.title}
                                            className="card-img-top"
                                            style={{
                                                height: "230px",
                                                objectFit: "cover"
                                            }}
                                        />

                                    ) : (

                                        <div
                                            className="bg-light d-flex align-items-center justify-content-center"
                                            style={{
                                                height: "230px"
                                            }}
                                        >

                                            <span className="text-muted">

                                                No Image

                                            </span>

                                        </div>

                                    )}


                                    <div className="card-body">


                                        {/* TITLE */}

                                        <h4 className="fw-bold text-success">

                                            {v.title}

                                        </h4>


                                        {/* DESCRIPTION */}

                                        <p className="text-muted">

                                            {v.description}

                                        </p>


                                        <hr />


                                        {/* LOCATION */}

                                        <p>

                                            📍{" "}

                                            <strong>
                                                Location:
                                            </strong>{" "}

                                            {v.location}

                                        </p>


                                        {/* DATE */}

                                        <p>

                                            📅{" "}

                                            <strong>
                                                Date:
                                            </strong>{" "}

                                            {v.date}

                                        </p>


                                        {/* STATUS */}

                                        <p>

                                            <strong>
                                                Status:
                                            </strong>{" "}


                                            <span
                                                className={
                                                    v.status?.toLowerCase() ===
                                                    "closed"
                                                        ? "badge bg-secondary"
                                                        : "badge bg-success"
                                                }
                                            >

                                                {v.status || "Open"}

                                            </span>

                                        </p>

                                    </div>


                                    {/* FOOTER */}

                                    <div className="card-footer bg-white border-0 p-3">


                                        {/* APPLY BUTTON */}

                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() =>
                                                navigate(
                                                    `/volunteer-application/${v.id}`
                                                )
                                            }
                                            disabled={
                                                v.status?.toLowerCase() ===
                                                "closed"
                                            }
                                        >

                                            🤝 Apply Now

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* =========================
                    ERROR
                ========================== */}

                {!loading &&
                    events.length === 0 && (

                        <div className="alert alert-warning text-center">

                            No volunteer opportunities available.

                        </div>

                    )}

            </div>

        </>

    );
}

export default Volunteer;