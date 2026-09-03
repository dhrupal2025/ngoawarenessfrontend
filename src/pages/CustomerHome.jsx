import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CustomerHome() {

    const [events, setEvents] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [donations, setDonations] = useState([]);

    const [eventCount, setEventCount] = useState(0);
    const [volunteerCount, setVolunteerCount] = useState(0);
    const [donationCount, setDonationCount] = useState(0);
    const [campaignCount, setCampaignCount] = useState(0);

    // =========================
    // LOAD DASHBOARD
    // =========================

    useEffect(() => {
        loadDashboard();
    }, []);

    // =========================
    // ANIMATE EVENT / VOLUNTEER /
    // DONATION COUNTERS
    // =========================

    useEffect(() => {

        const eventTimer = animateCounter(
            events.length,
            setEventCount
        );

        const volunteerTimer = animateCounter(
            volunteers.length,
            setVolunteerCount
        );

        const donationTimer = animateCounter(
            donations.length,
            setDonationCount
        );

        return () => {
            clearInterval(eventTimer);
            clearInterval(volunteerTimer);
            clearInterval(donationTimer);
        };

    }, [events, volunteers, donations]);

    // =========================
    // ANIMATE COUNTER
    // =========================

    const animateCounter = (target, setter) => {

        let start = 0;

        const duration = 1200;
        const stepTime = 20;

        const increment = Math.max(
            target / (duration / stepTime),
            1
        );

        const timer = setInterval(() => {

            start += increment;

            if (start >= target) {

                setter(target);
                clearInterval(timer);

            } else {

                setter(Math.floor(start));

            }

        }, stepTime);

        return timer;
    };

    // =========================
    // LOAD ALL DASHBOARD DATA
    // =========================

    const loadDashboard = async () => {

        try {

            // EVENTS
            const eventRes = await axios.get(
                "http://localhost:8081/api/events"
            );

            // VOLUNTEERS
            const volunteerRes = await axios.get(
                "http://localhost:8081/api/volunteers"
            );

            // DONATIONS
            const donationRes = await axios.get(
                "http://localhost:8081/api/donations"
            );

            // CAMPAIGNS
            const campaignRes = await axios.get(
                "http://localhost:8081/api/campaigns"
            );

            // =========================
            // SET EVENTS
            // =========================

            setEvents(
                Array.isArray(eventRes.data)
                    ? eventRes.data
                    : []
            );

            // =========================
            // SET VOLUNTEERS
            // =========================

            setVolunteers(
                Array.isArray(volunteerRes.data)
                    ? volunteerRes.data
                    : []
            );

            // =========================
            // SET DONATIONS
            // =========================

            setDonations(
                Array.isArray(donationRes.data)
                    ? donationRes.data
                    : []
            );

            // =========================
            // SET CAMPAIGN COUNT
            // =========================

            setCampaignCount(
                Array.isArray(campaignRes.data)
                    ? campaignRes.data.length
                    : 0
            );

        } catch (error) {

            console.error(
                "Customer Dashboard Error:",
                error
            );

            setEvents([]);
            setVolunteers([]);
            setDonations([]);
            setCampaignCount(0);
        }
    };

    // =========================
    // TOTAL DONATION AMOUNT
    // =========================

    const totalDonationAmount = donations.reduce(
        (sum, donation) =>
            sum + Number(donation.amount || 0),
        0
    );

    // =========================
    // CHART DATA
    // =========================

    const chartData = {

        labels: [
            "Campaigns",
            "Events",
            "Volunteers",
            "Donations"
        ],

        datasets: [
            {
                label: "NGO Statistics",

                data: [
                    campaignCount,
                    eventCount,
                    volunteerCount,
                    donationCount
                ],

                backgroundColor: [
                    "#28a745",
                    "#0d6efd",
                    "#ffc107",
                    "#dc3545"
                ]
            }
        ]
    };

    // =========================
    // RETURN
    // =========================

    return (
        <>
            <Navbar />

            {/* =========================
                HERO SECTION
            ========================= */}

            <section
                className="text-white text-center py-5"
                style={{
                    background:
                        "linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >

                <div className="container">

                    <h1 className="display-4 fw-bold">
                        Welcome to NGO Social Awareness
                    </h1>

                    <p className="lead mt-3">
                        Together we can make a positive impact.
                        Support campaigns, volunteer,
                        attend events and change lives.
                    </p>

                    <Link
                        to="/campaigns"
                        className="btn btn-warning btn-lg me-3"
                    >
                        Donate Now
                    </Link>

                    <Link
                        to="/volunteer"
                        className="btn btn-outline-light btn-lg"
                    >
                        Become a Volunteer
                    </Link>

                </div>

            </section>

            <div className="container py-5">

                {/* =========================
                    DASHBOARD TITLE
                ========================= */}

                <h2 className="text-center fw-bold text-success mb-5">
                    Customer Dashboard
                </h2>

                {/* =========================
                    STATISTICS CARDS
                ========================= */}

                <div className="row g-4">

                    {/* =========================
                        CAMPAIGNS
                    ========================= */}

                    <div className="col-lg-3 col-md-6">

                        <div
                            className="card border-0 shadow-lg h-100 text-center"
                            style={{
                                borderRadius: "20px",
                                transition: ".3s"
                            }}
                        >

                            <div className="card-body">

                                <div
                                    className="mx-auto mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background: "#d4edda",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "45px"
                                    }}
                                >
                                    🌱
                                </div>

                                <h1 className="text-success fw-bold">
                                    {campaignCount}
                                </h1>

                                <h5>
                                    Campaigns
                                </h5>

                                <Link
                                    to="/campaigns"
                                    className="btn btn-success rounded-pill px-4 mt-3"
                                >
                                    View
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        EVENTS
                    ========================= */}

                    <div className="col-lg-3 col-md-6">

                        <div
                            className="card border-0 shadow-lg h-100 text-center"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body">

                                <div
                                    className="mx-auto mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background: "#d1ecf1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "45px"
                                    }}
                                >
                                    📅
                                </div>

                                <h1 className="text-primary fw-bold">
                                    {eventCount}
                                </h1>

                                <h5>
                                    Events
                                </h5>

                                <Link
                                    to="/events"
                                    className="btn btn-primary rounded-pill px-4 mt-3"
                                >
                                    View
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        VOLUNTEERS
                    ========================= */}

                    <div className="col-lg-3 col-md-6">

                        <div
                            className="card border-0 shadow-lg h-100 text-center"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body">

                                <div
                                    className="mx-auto mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background: "#fff3cd",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "45px"
                                    }}
                                >
                                    🤝
                                </div>

                                <h1 className="text-warning fw-bold">
                                    {volunteerCount}
                                </h1>

                                <h5>
                                    Volunteers
                                </h5>

                                <Link
                                    to="/volunteer"
                                    className="btn btn-warning rounded-pill px-4 mt-3"
                                >
                                    View
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        DONATIONS
                    ========================= */}

                    <div className="col-lg-3 col-md-6">

                        <div
                            className="card border-0 shadow-lg h-100 text-center"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body">

                                <div
                                    className="mx-auto mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background: "#f8d7da",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "45px"
                                    }}
                                >
                                    💝
                                </div>

                                <h2 className="text-success">
                                    {donationCount}
                                </h2>

                                <p className="text-muted">
                                    Total Donations
                                </p>

                                <hr />

                                <h4 className="text-danger">
                                    ₹
                                    {totalDonationAmount.toLocaleString(
                                        "en-IN"
                                    )}
                                </h4>

                                <p>
                                    Total Amount Raised
                                </p>

                                <h5>
                                    My Donations
                                </h5>

                                <Link
                                    to="/my-donations"
                                    className="btn btn-danger rounded-pill px-4 mt-3"
                                >
                                    View
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
                    STATISTICS CHART
                ========================= */}

                <div className="row mt-5">

                    <div className="col-lg-8">

                        <div className="card shadow border-0">

                            <div className="card-header bg-success text-white">

                                <h4 className="mb-0">
                                    NGO Statistics
                                </h4>

                            </div>

                            <div className="card-body">

                                <Bar
                                    data={chartData}
                                />

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        DONATION SUMMARY
                    ========================= */}

                    <div className="col-lg-4">

                        <div className="card shadow border-0 h-100">

                            <div className="card-header bg-primary text-white">

                                <h4 className="mb-0">
                                    Donation Summary
                                </h4>

                            </div>

                            <div className="card-body">

                                <h2 className="text-success">
                                    ₹
                                    {totalDonationAmount.toLocaleString(
                                        "en-IN"
                                    )}
                                </h2>

                                <hr />

                                <p>
                                    <strong>
                                        Total Events :
                                    </strong>{" "}
                                    {eventCount}
                                </p>

                                <p>
                                    <strong>
                                        Total Volunteers :
                                    </strong>{" "}
                                    {volunteerCount}
                                </p>

                                <p>
                                    <strong>
                                        Total Campaigns :
                                    </strong>{" "}
                                    {campaignCount}
                                </p>

                                <p>
                                    <strong>
                                        Total Donations :
                                    </strong>{" "}
                                    {donationCount}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
                    RECENT DONATIONS
                ========================= */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-header bg-danger text-white">

                        <h4 className="mb-0">
                            Recent Donations
                        </h4>

                    </div>

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover table-striped mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th>
                                            Donor
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {donations.length > 0 ? (

                                        donations
                                            .slice(0, 5)
                                            .map((d) => (

                                                <tr
                                                    key={d.id}
                                                >

                                                    <td>
                                                        {
                                                            d.donorName
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {Number(
                                                            d.amount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    <td>
                                                        {
                                                            d.paymentMethod
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            d.donationDate
                                                        }
                                                    </td>

                                                </tr>

                                            ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >
                                                No Donations Available
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* =========================
                    LATEST CAMPAIGNS
                ========================= */}

                <div className="mt-5">

                    <h2 className="fw-bold text-success mb-4">
                        🌱 Latest Campaigns
                    </h2>

                    <div className="row">

                        {/* TREE CAMPAIGN */}

                        <div className="col-md-4 mb-4">

                            <div className="card shadow border-0 h-100">

                                <img
                                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80"
                                    className="card-img-top"
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                    alt="Tree Plantation"
                                />

                                <div className="card-body">

                                    <h5>
                                        🌳 Tree Plantation Drive
                                    </h5>

                                    <p>
                                        Join us in planting trees
                                        to create a greener future.
                                    </p>

                                    <Link
                                        to="/campaigns"
                                        className="btn btn-success"
                                    >
                                        View Campaigns
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* HEALTH CAMPAIGN */}

                        <div className="col-md-4 mb-4">

                            <div className="card shadow border-0 h-100">

                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80"
                                    className="card-img-top"
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                    alt="Health Awareness"
                                />

                                <div className="card-body">

                                    <h5>
                                        🩺 Health Awareness
                                    </h5>

                                    <p>
                                        Support free health checkups
                                        for needy families.
                                    </p>

                                    <Link
                                        to="/campaigns"
                                        className="btn btn-success"
                                    >
                                        View Campaigns
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* EDUCATION CAMPAIGN */}

                        <div className="col-md-4 mb-4">

                            <div className="card shadow border-0 h-100">

                                <img
                                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
                                    className="card-img-top"
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                    alt="Education for All"
                                />

                                <div className="card-body">

                                    <h5>
                                        📚 Education for All
                                    </h5>

                                    <p>
                                        Help children receive quality
                                        education and school supplies.
                                    </p>

                                    <Link
                                        to="/campaigns"
                                        className="btn btn-success"
                                    >
                                        View Campaigns
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
                    LATEST EVENTS
                ========================= */}

                <div className="mt-5">

                    <h2 className="fw-bold text-primary mb-4">
                        📅 Latest Events
                    </h2>

                    <div className="row">

                        {events.length > 0 ? (

                            events.map((event) => (

                                <div
                                    className="col-md-4 mb-4"
                                    key={event.id}
                                >

                                    <div className="card shadow border-0 h-100">

                                        <div className="card-body">

                                            <h5 className="text-success">
                                                {event.title}
                                            </h5>

                                            <p>
                                                <strong>
                                                    Date:
                                                </strong>{" "}
                                                {event.date}
                                            </p>

                                            <p>
                                                <strong>
                                                    Location:
                                                </strong>{" "}
                                                {event.location}
                                            </p>

                                            <Link
                                                to="/events"
                                                className="btn btn-primary"
                                            >
                                                View Event
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="col-12">

                                <div className="alert alert-warning text-center">

                                    No Events Available

                                </div>

                            </div>

                        )}

                    </div>

                </div>

                {/* =========================
                    VOLUNTEER SECTION
                ========================= */}

                <div className="mt-5">

                    <div
                        className="p-5 rounded-4 text-center text-white shadow"
                        style={{
                            background:
                                "linear-gradient(135deg,#198754,#20c997)"
                        }}
                    >

                        <h2 className="fw-bold">
                            Become a Volunteer ❤️
                        </h2>

                        <p className="lead">
                            Your time and skills can change lives.
                            Join our volunteer community today.
                        </p>

                        <Link
                            to="/volunteer"
                            className="btn btn-warning btn-lg px-5"
                        >
                            Apply Now
                        </Link>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CustomerHome;