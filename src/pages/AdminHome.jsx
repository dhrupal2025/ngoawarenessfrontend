import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

function AdminHome() {
const [users, setUsers] = useState([]);
const [campaigns, setCampaigns] = useState([]);
const [events, setEvents] = useState([]);
const [volunteers, setVolunteers] = useState([]);
const [donations, setDonations] = useState([]);
const [applications, setApplications] = useState([]);


const [userCount, setUserCount] = useState(0);
const [campaignCount, setCampaignCount] = useState(0);
const [eventCount, setEventCount] = useState(0);
const [volunteerCount, setVolunteerCount] = useState(0);
const [donationCount, setDonationCount] = useState(0);
const [requestCount, setRequestCount] = useState(0);


// Counter Animation Function
const animateCounter = (target, setter) => {
    let current = 0;

    const timer = setInterval(() => {
        current++;

        setter(current);

        if (current >= target) {
            clearInterval(timer);
        }
    }, 40);
};

// Load Dashboard Data
useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
        loadDashboard();
    }, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval);
}, []);


// Start Counter Animation After Data Load

useEffect(() => {
    animateCounter(users.length, setUserCount);
}, [users]);

useEffect(() => {
    animateCounter(campaigns.length, setCampaignCount);
}, [campaigns]);

useEffect(() => {
    animateCounter(events.length, setEventCount);
}, [events]);

useEffect(() => {
    setVolunteerCount(volunteers.length);
}, [volunteers]);
useEffect(() => {
    console.log("Volunteer State:", volunteers);
}, [volunteers]);
useEffect(() => {
    animateCounter(donations.length, setDonationCount);
}, [donations]);

useEffect(() => {
    animateCounter(applications.length, setRequestCount);
}, [applications]);

const loadDashboard = async () => {
    try {

        const [
            usersRes,
            campaignsRes,
            eventsRes,
            volunteersRes,
            donationsRes,
            requestsRes
        ] = await Promise.all([
            axios.get("http://localhost:8081/api/registeruser"),
            axios.get("http://localhost:8081/api/campaigns"),
            axios.get("http://localhost:8081/api/events"),
            axios.get("http://localhost:8081/api/volunteers"),
            axios.get("http://localhost:8081/api/donations"),
            axios.get("http://localhost:8081/api/volunteer-applications")
        ]);

        // 👇 Add here
        console.log("Campaign API Response:", campaignsRes.data);
        console.log("Volunteers:", volunteersRes.data);
        setUsers(usersRes.data);
        setCampaigns(campaignsRes.data);
        setEvents(eventsRes.data);
        setVolunteers(volunteersRes.data);
        setDonations(donationsRes.data);
        setApplications(requestsRes.data);

    } catch (error) {
        console.log("Dashboard Error:", error);
    }
};
    const pieData = {

        labels: [
            "Users",
            "Campaigns",
            "Events",
            "Volunteers",
            "Donations",
            "Requests"
        ],

        datasets: [

            {

                data: [

                    userCount,

                    campaignCount,

                    eventCount,

                    volunteerCount,

                    donationCount,

                    requestCount

                ],

                backgroundColor: [

                    "#0d6efd",

                    "#198754",

                    "#ffc107",

                    "#20c997",

                    "#dc3545",

                    "#6f42c1"

                ]

            }

        ]

    };

    return (

        <>

            <Navbar />

            <div
                className="container-fluid"
                style={{
                    background: "#f4f7fb",
                    minHeight: "100vh"
                }}
            >
              {/* ==========================================
                Hero Section
========================================== */}


{/* ==========================================
            Bootstrap Carousel
========================================== */}

<div
    id="adminCarousel"
    className="carousel slide mt-4 shadow-lg"
    data-bs-ride="carousel"
>

    <div className="carousel-inner rounded-4">

        <div className="carousel-item active">

            <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
                className="d-block w-100"
                style={{
                    height: "420px",
                    objectFit: "cover"
                }}
                alt=""
            />

            <div className="carousel-caption">
               <h1 className="display-5 fw-bold">
                Welcome Admin 
            </h1>

                <h2>NGO Social Awareness</h2>

     <p className="lead">
                Manage campaigns, events, volunteers,
                donations and users from one place.
            </p>
                <p>
                    Together We Can Change Lives
                </p>

            </div>

        </div>

        <div className="carousel-item">

            <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80"
                className="d-block w-100"
                style={{
                    height: "420px",
                    objectFit: "cover"
                }}
                alt=""
            />

            <div className="carousel-caption">

                <h2>Education For Everyone</h2>

            </div>

        </div>

        <div className="carousel-item">

            <img
                src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1400&q=80"
                className="d-block w-100"
                style={{
                    height: "420px",
                    objectFit: "cover"
                }}
                alt=""
            />

            <div className="carousel-caption">

                <h2>Volunteer Together</h2>

            </div>

        </div>

    </div>

    <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#adminCarousel"
        data-bs-slide="prev"
    >

        <span className="carousel-control-prev-icon"></span>

    </button>

    <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#adminCarousel"
        data-bs-slide="next"
    >

        <span className="carousel-control-next-icon"></span>

    </button>

</div>

{/* ==========================================
            Dashboard Cards
========================================== */}

<div className="row mt-5 g-4">

    <div className="col-lg-2 col-md-4">

        <div className="card border-0 shadow-lg text-center h-100">

            <div className="card-body">

                <div style={{fontSize:"50px"}}>👥</div>

                <h2 className="text-primary fw-bold">

                    {userCount}

                </h2>

                <h5>Total Users</h5>

            </div>

        </div>

    </div>

    <div className="col-lg-2 col-md-4">

        <div className="card border-0 shadow-lg text-center h-100">

            <div className="card-body">

                <div style={{fontSize:"50px"}}>🌱</div>

                <h2 className="text-success fw-bold">

                    {campaignCount}

                </h2>

                <h5>Campaigns</h5>

            </div>

        </div>

    </div>

    <div className="col-lg-2 col-md-4">

        <div className="card border-0 shadow-lg text-center h-100">

            <div className="card-body">

                <div style={{fontSize:"50px"}}>📅</div>

                <h2 className="text-info fw-bold">

                    {eventCount}

                </h2>

                <h5>Events</h5>

            </div>

        </div>

    </div>

    <div className="col-lg-2 col-md-4">

        <div className="card border-0 shadow-lg text-center h-100">

            <div className="card-body">

                <div style={{fontSize:"50px"}}>🤝</div>

                <h2 className="text-warning fw-bold">

                    {volunteerCount}

                </h2>

                <h5>Volunteers</h5>

            </div>

        </div>

    </div>

    <div className="col-lg-2 col-md-4">

        <div className="card border-0 shadow-lg text-center h-100">

            <div className="card-body">

                <div style={{fontSize:"50px"}}>💝</div>

                <h2 className="text-danger fw-bold">

                    {donationCount}

                </h2>

                <h5>Donations</h5>

            </div>

        </div>

    </div>

    <div className="col-lg-2 col-md-4">

        <div className="card border-0 shadow-lg text-center h-100">

            <div className="card-body">

                <div style={{fontSize:"50px"}}>📨</div>

                <h2 className="text-secondary fw-bold">

                    {requestCount}

                </h2>

                <h5>Requests</h5>

            </div>

        </div>

    </div>

</div>
{/* ==========================================
            Analytics Dashboard
========================================== */}

<div className="row mt-5">

    {/* Pie Chart */}

    <div className="col-lg-5 mb-4">

        <div className="card border-0 shadow-lg h-100">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    📊 NGO Overview
                </h4>

            </div>

            <div className="card-body">

                <Pie data={pieData} />

            </div>

        </div>

    </div>

    {/* Dashboard Analytics */}

    <div className="col-lg-7 mb-4">

        <div className="card border-0 shadow-lg h-100">

            <div className="card-header bg-success text-white">

                <h4 className="mb-0">
                    📋 Dashboard Analytics
                </h4>

            </div>

            <div className="card-body">

                <div className="row g-4">

                    <div className="col-md-4">

                        <div className="p-4 rounded text-center bg-light">

                            <h2 className="text-primary fw-bold">
                                {userCount}
                            </h2>

                            <p className="mb-0">
                                Registered Users
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="p-4 rounded text-center bg-light">

                            <h2 className="text-success fw-bold">
                                {campaignCount}
                            </h2>

                            <p className="mb-0">
                                Active Campaigns
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="p-4 rounded text-center bg-light">

                            <h2 className="text-info fw-bold">
                                {eventCount}
                            </h2>

                            <p className="mb-0">
                                Upcoming Events
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="p-4 rounded text-center bg-light">

                            <h2 className="text-warning fw-bold">
                                {volunteerCount}
                            </h2>

                            <p className="mb-0">
                                Volunteers
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="p-4 rounded text-center bg-light">

                            <h2 className="text-danger fw-bold">
                                {donationCount}
                            </h2>

                            <p className="mb-0">
                                Donations
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="p-4 rounded text-center bg-light">

                            <h2 className="text-secondary fw-bold">
                                {requestCount}
                            </h2>

                            <p className="mb-0">
                                Pending Requests
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

{/* ==========================================
            Live Statistics Panels
========================================== */}

<div className="row mt-4 g-4">

    <div className="col-lg-3 col-md-6">

        <div className="card border-0 shadow text-center">

            <div className="card-body">

                <h5 className="text-success">
                    🌱 Campaign Growth
                </h5>

                <div className="progress mt-3" style={{ height: "25px" }}>

                    <div
                        className="progress-bar bg-success"
                        style={{
                            width: `${Math.min(campaignCount * 10, 100)}%`
                        }}
                    >
                        {campaignCount}
                    </div>

                </div>

            </div>

        </div>

    </div>

    <div className="col-lg-3 col-md-6">

        <div className="card border-0 shadow text-center">

            <div className="card-body">

                <h5 className="text-primary">
                    📅 Events
                </h5>

                <div className="progress mt-3" style={{ height: "25px" }}>

                    <div
                        className="progress-bar bg-primary"
                        style={{
                            width: `${Math.min(eventCount * 10, 100)}%`
                        }}
                    >
                        {eventCount}
                    </div>

                </div>

            </div>

        </div>

    </div>

    <div className="col-lg-3 col-md-6">

        <div className="card border-0 shadow text-center">

            <div className="card-body">

                <h5 className="text-warning">
                    🤝 Volunteers
                </h5>

                <div className="progress mt-3" style={{ height: "25px" }}>

                    <div
                        className="progress-bar bg-warning"
                        style={{
                            width: `${Math.min(volunteerCount * 10, 100)}%`
                        }}
                    >
                        {volunteerCount}
                    </div>

                </div>

            </div>

        </div>

    </div>

    <div className="col-lg-3 col-md-6">

        <div className="card border-0 shadow text-center">

            <div className="card-body">

                <h5 className="text-danger">
                    💝 Donations
                </h5>

                <div className="progress mt-3" style={{ height: "25px" }}>

                    <div
                        className="progress-bar bg-danger"
                        style={{
                            width: `${Math.min(donationCount * 10, 100)}%`
                        }}
                    >
                        {donationCount}
                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
{/* ==========================================
            Recent Donations
========================================== */}

<div className="row mt-5">

    <div className="col-lg-8">

        <div className="card border-0 shadow-lg">

            <div className="card-header bg-danger text-white">

                <h4 className="mb-0">
                    💝 Recent Donations
                </h4>

            </div>

            <div className="card-body table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-light">

                        <tr>

                            <th>ID</th>
                            <th>Donor</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {donations.length > 0 ? (

                            donations
                                .slice(0, 5)
                                .map((donation) => (

                                    <tr key={donation.id}>

                                        <td>{donation.id}</td>

                                        <td>{donation.donorName}</td>

                                        <td className="text-success fw-bold">

                                            ₹{donation.amount}

                                        </td>

                                        <td>{donation.paymentMethod}</td>

                                        <td>{donation.donationDate}</td>

                                    </tr>

                                ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center text-muted"
                                >

                                    No Donations Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    {/* Latest Events */}

    <div className="col-lg-4">

        <div className="card border-0 shadow-lg">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">

                    📅 Latest Events

                </h4>

            </div>

            <div className="card-body">

                {events.length > 0 ? (

                    events.slice(0, 5).map((event) => (

                        <div
                            key={event.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="text-success">

                                {event.title}

                            </h6>

                            <small>

                                📍 {event.location}

                            </small>

                            <br />

                            <small>

                                📅 {event.date}

                            </small>

                        </div>

                    ))

                ) : (

                    <div className="alert alert-warning">

                        No Events Available

                    </div>

                )}

            </div>

        </div>

    </div>

</div>

{/* ==========================================
            Volunteer Requests
========================================== */}

<div className="card border-0 shadow-lg mt-5">

    <div className="card-header bg-warning">

        <h4 className="mb-0">

            🤝 Volunteer Requests

        </h4>

    </div>

    <div className="card-body table-responsive">

        <table className="table table-striped table-hover">

            <thead>

                <tr>

                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                {applications.length > 0 ? (

                    applications
                        .slice(0, 5)
                        .map((app) => (

                            <tr key={app.id}>

                                <td>{app.fullName}</td>

                                <td>{app.email}</td>

                                <td>{app.mobile}</td>

                                <td>

                                    <span
                                        className={`badge ${
                                            app.status === "Accepted"
                                                ? "bg-success"
                                                : app.status === "Rejected"
                                                ? "bg-danger"
                                                : "bg-warning text-dark"
                                        }`}
                                    >

                                        {app.status}

                                    </span>

                                </td>

                            </tr>

                        ))

                ) : (

                    <tr>

                        <td
                            colSpan="4"
                            className="text-center"
                        >

                            No Volunteer Requests

                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>

{/* ==========================================
            Latest Campaigns
========================================== */}

<div className="mt-5">

    <h3 className="text-success fw-bold mb-4">

        🌱 Latest Campaigns

    </h3>

    <div className="row">

        {campaigns.length > 0 ? (

            campaigns.slice(0, 3).map((campaign) => (

                <div
                    className="col-lg-4 mb-4"
                    key={campaign.id}
                >

                    <div className="card border-0 shadow-lg h-100">

                        <img
                            src={campaign.image}
                            className="card-img-top"
                            style={{
                                height: "220px",
                                objectFit: "cover"
                            }}
                            alt=""
                        />

                        <div className="card-body">

                            <h5 className="fw-bold">

                                {campaign.title}

                            </h5>

                            <p>

                                {campaign.description}

                            </p>

                            <button className="btn btn-success">

                                View Campaign

                            </button>

                        </div>

                    </div>

                </div>

            ))

        ) : (

            <div className="col-12">

                <div className="alert alert-info">

                    No Campaigns Available

                </div>

            </div>

        )}

    </div>

</div>


{/* ==========================================
            Quick Actions
========================================== */}

<div className="row mt-5 g-4">

    <div className="col-lg-3">

        <Link
            to="/manage-users"
            className="btn btn-primary w-100 py-4"
        >

            👥 Manage Users

        </Link>

    </div>

    <div className="col-lg-3">
        <Link
            to="/manage-campaigns"
            className="btn btn-success w-100 py-4"
        >
            🌱 Manage Campaigns
        </Link>
    </div>
<div className="col-lg-3">
    <Link
        to="/manage-volunteers"
        className="btn btn-info w-100 py-4"
    >
        🤝 Manage Volunteers
    </Link>
</div>
    <div className="col-lg-3">

        <Link
            to="/manage-events"
            className="btn btn-success w-100 py-4"
        >

            📅 Manage Events

        </Link>

    </div>

    <div className="col-lg-3">

        <Link
            to="/manage-donations"
            className="btn btn-danger w-100 py-4"
        >

            💝 Manage Donations

        </Link>

    </div>

    <div className="col-lg-3">

        <Link
            to="/manage-volunteer-requests"
            className="btn btn-warning w-100 py-4"
        >

            🤝 Volunteer Requests

        </Link>

    </div>

</div>
{/* ==========================================
            Notifications
========================================== */}

<div className="row mt-5">

    <div className="col-lg-6">

        <div className="card border-0 shadow-lg h-100">

            <div className="card-header bg-info text-white">

                <h4 className="mb-0">
                    🔔 Notifications
                </h4>

            </div>

            <div className="card-body">

                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        ✅ New volunteer application received
                    </li>

                    <li className="list-group-item">
                        💝 Donation received successfully
                    </li>

                    <li className="list-group-item">
                        📅 New event added
                    </li>

                    <li className="list-group-item">
                        🌱 Campaign updated
                    </li>

                    <li className="list-group-item">
                        👤 New user registered
                    </li>

                </ul>

            </div>

        </div>

    </div>

    {/* Activity Timeline */}

    <div className="col-lg-6">

        <div className="card border-0 shadow-lg h-100">

            <div className="card-header bg-dark text-white">

                <h4 className="mb-0">
                    🕒 Activity Timeline
                </h4>

            </div>

            <div className="card-body">

                <div className="mb-3">
                    <strong>09:30 AM</strong><br />
                    Volunteer Application Submitted
                </div>

                <hr />

                <div className="mb-3">
                    <strong>10:15 AM</strong><br />
                    Donation Received
                </div>

                <hr />

                <div className="mb-3">
                    <strong>11:20 AM</strong><br />
                    Event Created
                </div>

                <hr />

                <div className="mb-3">
                    <strong>12:10 PM</strong><br />
                    Campaign Updated
                </div>

            </div>

        </div>

    </div>

</div>

{/* ==========================================
            Top Donors
========================================== */}

<div className="card border-0 shadow-lg mt-5">

    <div className="card-header bg-success text-white">

        <h4 className="mb-0">
            🏆 Top Donors
        </h4>

    </div>

    <div className="card-body table-responsive">

        <table className="table table-hover">

            <thead>

                <tr>

                    <th>Donor</th>
                    <th>Amount</th>

                </tr>

            </thead>

            <tbody>

                {[...donations]
    .sort((a,b)=>b.amount-a.amount)
    .slice(0,5)
                    .map((d) => (

                        <tr key={d.id}>

                            <td>{d.donorName}</td>

                            <td className="text-success fw-bold">
                                ₹{d.amount}
                            </td>

                        </tr>

                    ))}

            </tbody>

        </table>

    </div>

</div>

{/* ==========================================
            NGO Achievement
========================================== */}

<div
    className="mt-5 p-5 rounded-4 text-center text-white shadow-lg"
    style={{
        background:
            "linear-gradient(135deg,#198754,#20c997)"
    }}
>

    <h2 className="fw-bold">

        🌍 Together We Make A Difference

    </h2>

    <p className="lead mt-3">

        Thank you for helping us build
        a better society through donations,
        volunteering and awareness.

    </p>

    <div className="row mt-4">

        <div className="col-md-3">

            <h2>{campaignCount}</h2>

            <p>Campaigns</p>

        </div>

        <div className="col-md-3">

            <h2>{eventCount}</h2>

            <p>Events</p>

        </div>

        <div className="col-md-3">

            <h2>{volunteerCount}</h2>

            <p>Volunteers</p>

        </div>

        <div className="col-md-3">

            <h2>{donationCount}</h2>

            <p>Donations</p>

        </div>

    </div>

</div>

{/* ==========================================
            Footer
========================================== */}

<footer
    className="text-center mt-5 py-4"
    style={{
        borderTop: "1px solid #ddd"
    }}
>

    <h5 className="text-success">

        NGO Social Awareness

    </h5>

    <p className="text-muted">

        Admin Dashboard • Manage NGO Activities

    </p>

    <small>

        © 2026 NGO Social Awareness. All Rights Reserved.

    </small>

</footer>

</div>

</>

);

}

export default AdminHome;