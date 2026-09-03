import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/events"
            );

            setEvents(response.data);

        } catch (error) {

            console.error("Error loading events:", error);

        } finally {

            setLoading(false);

        }
    };


    return (
        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="text-success fw-bold text-center mb-4">
                    📅 Upcoming Events
                </h2>


                {loading ? (

                    <div className="text-center">
                        <div className="spinner-border text-success" />
                    </div>

                ) : events.length === 0 ? (

                    <div className="alert alert-info text-center">
                        No events available.
                    </div>

                ) : (

                    <div className="row g-4">

                        {events.map((event) => (

                            <div
                                className="col-lg-4 col-md-6"
                                key={event.id}
                            >

                                <div className="card shadow h-100">

                                    {event.image && (
                                        <img
                                            src={event.image}
                                            className="card-img-top"
                                            alt={event.title}
                                            style={{
                                                height: "220px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    )}

                                    <div className="card-body">

                                        <h5 className="fw-bold text-success">
                                            {event.title}
                                        </h5>

                                        <p>
                                            {event.description}
                                        </p>

                                        <p>
                                            📍 <strong>Location:</strong>{" "}
                                            {event.location}
                                        </p>

                                        <p>
                                            📅 <strong>Date:</strong>{" "}
                                            {event.date}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}

export default Events;