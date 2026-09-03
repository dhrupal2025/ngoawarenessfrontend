import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyVolunteerRequests() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // card / table
const [view, setView] = useState("table");
    const API_URL =
        "http://localhost:8081/api/volunteer-applications";


    // =====================================================
    // LOAD MY APPLICATIONS
    // =====================================================
    const loadMyApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const email =
                localStorage.getItem("volunteerEmail");

            if (!email) {

                setError(
                    "Your email was not found. Please apply again."
                );

                setLoading(false);
                return;
            }


            console.log("Loading applications for:", email);


            const response = await axios.get(
                `${API_URL}/my`,
                {
                    params: {
                        email: email
                    }
                }
            );


            console.log(
                "My volunteer applications:",
                response.data
            );


            setApplications(response.data || []);

        } catch (error) {

            console.error(
                "Error loading volunteer requests:",
                error
            );

            if (error.response) {

                console.error(
                    "Backend response:",
                    error.response.data
                );

                console.error(
                    "Status:",
                    error.response.status
                );

            }

            setError(
                "Unable to load your volunteer requests."
            );

            setApplications([]);

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD ON PAGE OPEN
    // =====================================================
    useEffect(() => {

        loadMyApplications();

    }, []);


    // =====================================================
    // STATUS BADGE
    // =====================================================
    const getStatusBadge = (status) => {

        const currentStatus =
            status || "Pending";


        if (
            currentStatus === "Approved" ||
            currentStatus === "Accepted"
        ) {

            return (
                <span className="badge bg-success px-3 py-2">
                    ✓ {currentStatus}
                </span>
            );

        }


        if (currentStatus === "Rejected") {

            return (
                <span className="badge bg-danger px-3 py-2">
                    ✕ Rejected
                </span>
            );

        }


        if (currentStatus === "Completed") {

            return (
                <span className="badge bg-primary px-3 py-2">
                    ✓ Completed
                </span>
            );

        }


        return (
            <span className="badge bg-warning text-dark px-3 py-2">
                ⏳ Pending
            </span>
        );
    };


    // =====================================================
    // STATUS MESSAGE
    // =====================================================
    const getStatusMessage = (status) => {

        const currentStatus =
            status || "Pending";


        if (
            currentStatus === "Approved" ||
            currentStatus === "Accepted"
        ) {

            return (
                "Your volunteer application has been approved by admin."
            );

        }


        if (currentStatus === "Rejected") {

            return (
                "Your volunteer application has been rejected by admin."
            );

        }


        if (currentStatus === "Completed") {

            return (
                "Your volunteer activity has been completed."
            );

        }


        return (
            "Your application is waiting for admin approval."
        );
    };


    return (
        <>
            <Navbar />


            <div
                className="container-fluid py-5"
                style={{
                    background: "#f4f7fb",
                    minHeight: "100vh"
                }}
            >

                <div className="container">


                    {/* =================================================
                        HEADER
                    ================================================= */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-5">


                        <div>

                            <h2 className="text-success fw-bold mb-2">
                                🤝 My Volunteer Requests
                            </h2>

                            <p className="text-muted mb-0">
                                View your volunteer applications
                                and their current status.
                            </p>

                        </div>


                        {/* =================================================
                            VIEW BUTTONS
                        ================================================= */}
                       <div className="mt-3 mt-md-0">

    <button
        type="button"
        className="btn btn-success"
        onClick={() =>
            setView(view === "table" ? "card" : "table")
        }
    >
        {view === "table"
            ? "🗂 Card View"
            : "📋 Table View"}
    </button>

</div>

                    </div>


                    {/* =================================================
                        LOADING
                    ================================================= */}
                    {loading && (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-success"
                                role="status"
                            />

                            <p className="text-muted mt-3">
                                Loading your requests...
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        ERROR
                    ================================================= */}
                    {!loading && error && (

                        <div className="alert alert-danger text-center">

                            {error}

                            <br />

                            <button
                                className="btn btn-outline-danger mt-3"
                                onClick={loadMyApplications}
                            >
                                🔄 Try Again
                            </button>

                        </div>

                    )}


                    {/* =================================================
                        NO REQUESTS
                    ================================================= */}
                    {!loading &&
                        !error &&
                        applications.length === 0 && (

                            <div className="card border-0 shadow-sm">

                                <div className="card-body text-center py-5">

                                    <div
                                        style={{
                                            fontSize: "60px"
                                        }}
                                    >
                                        🤝
                                    </div>


                                    <h4 className="fw-bold mt-3">
                                        No Volunteer Requests
                                    </h4>


                                    <p className="text-muted">
                                        You have not applied for any
                                        volunteer opportunity yet.
                                    </p>


                                    <button
                                        className="btn btn-success mt-2"
                                        onClick={loadMyApplications}
                                    >
                                        🔄 Refresh
                                    </button>

                                </div>

                            </div>

                        )}


                    {/* =================================================
                        CARD VIEW
                    ================================================= */}
                    {!loading &&
                        !error &&
                        applications.length > 0 &&
                        view === "card" && (

                            <div className="row g-4">

                                {applications.map((app) => (

                                    <div
                                        className="col-lg-6"
                                        key={app.id}
                                    >

                                        <div
                                            className="card border-0 shadow-lg rounded-4 h-100"
                                        >

                                            {/* CARD HEADER */}
                                            <div
                                                className="card-header text-white p-3"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg,#198754,#20c997)",
                                                    borderRadius:
                                                        "16px 16px 0 0"
                                                }}
                                            >

                                                <div className="d-flex justify-content-between align-items-center">

                                                    <div>

                                                        <h5 className="fw-bold mb-1">
                                                            🤝 Volunteer Application
                                                        </h5>

                                                        <small>
                                                            Application ID: #{app.id}
                                                        </small>

                                                    </div>


                                                    {getStatusBadge(
                                                        app.status
                                                    )}

                                                </div>

                                            </div>


                                            {/* CARD BODY */}
                                            <div className="card-body p-4">


                                                <div className="row">


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            EVENT ID
                                                        </small>

                                                        <div className="fw-semibold">
                                                            🎯 {app.eventId || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            NAME
                                                        </small>

                                                        <div className="fw-semibold">
                                                            👤 {app.fullName || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            EMAIL
                                                        </small>

                                                        <div>
                                                            📧 {app.email || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            MOBILE
                                                        </small>

                                                        <div>
                                                            📱 {app.mobile || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            AGE
                                                        </small>

                                                        <div>
                                                            🎂 {app.age || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            OCCUPATION
                                                        </small>

                                                        <div>
                                                            💼 {app.occupation || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            SKILLS
                                                        </small>

                                                        <div>
                                                            🛠 {app.skills || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-md-6 mb-3">

                                                        <small className="text-muted">
                                                            AVAILABILITY
                                                        </small>

                                                        <div>
                                                            📅 {app.availability || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-12 mb-3">

                                                        <small className="text-muted">
                                                            REASON
                                                        </small>

                                                        <div>
                                                            📝 {app.reason || "-"}
                                                        </div>

                                                    </div>


                                                    <div className="col-12">

                                                        <small className="text-muted">
                                                            APPLICATION DATE
                                                        </small>

                                                        <div>
                                                            📅 {app.applicationDate || "-"}
                                                        </div>

                                                    </div>

                                                </div>


                                                {/* STATUS MESSAGE */}
                                                <div
                                                    className="mt-4 p-3 rounded-3"
                                                    style={{
                                                        background:
                                                            "#f8f9fa"
                                                    }}
                                                >

                                                    <div className="d-flex justify-content-between align-items-center">

                                                        <strong>
                                                            Application Status
                                                        </strong>

                                                        {getStatusBadge(
                                                            app.status
                                                        )}

                                                    </div>


                                                    <p className="text-muted small mb-0 mt-2">

                                                        {getStatusMessage(
                                                            app.status
                                                        )}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}


                    {/* =================================================
                        TABLE VIEW
                    ================================================= */}
                    {!loading &&
                        !error &&
                        applications.length > 0 &&
                        view === "table" && (

                            <div className="card border-0 shadow-lg border-0">


                                <div className="card-header bg-success text-white p-3">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <h5 className="fw-bold mb-0">
                                            📋 My Volunteer Applications
                                        </h5>

                                        <span>
                                            Total: {applications.length}
                                        </span>

                                    </div>

                                </div>


                                <div className="card-body p-0">


                                    <div className="table-responsive">

                                        <table className="table table-bordered table-hover align-middle mb-0">


                                            <thead className="table-success">

                                                <tr>

                                                    <th>
                                                        ID
                                                    </th>

                                                    <th>
                                                        Event ID
                                                    </th>

                                                    <th>
                                                        Name
                                                    </th>

                                                    <th>
                                                        Email
                                                    </th>

                                                    <th>
                                                        Mobile
                                                    </th>

                                                    <th>
                                                        Age
                                                    </th>

                                                    <th>
                                                        Occupation
                                                    </th>

                                                    <th>
                                                        Skills
                                                    </th>

                                                    <th>
                                                        Availability
                                                    </th>

                                                    <th>
                                                        Reason
                                                    </th>

                                                    <th>
                                                        Application Date
                                                    </th>

                                                    <th>
                                                        Status
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {applications.map(
                                                    (app) => (

                                                        <tr
                                                            key={app.id}
                                                        >

                                                            <td>
                                                                {app.id}
                                                            </td>

                                                            <td>
                                                                {app.eventId || "-"}
                                                            </td>

                                                            <td className="fw-semibold">
                                                                {app.fullName || "-"}
                                                            </td>

                                                            <td>
                                                                {app.email || "-"}
                                                            </td>

                                                            <td>
                                                                {app.mobile || "-"}
                                                            </td>

                                                            <td>
                                                                {app.age || "-"}
                                                            </td>

                                                            <td>
                                                                {app.occupation || "-"}
                                                            </td>

                                                            <td>
                                                                {app.skills || "-"}
                                                            </td>

                                                            <td>
                                                                {app.availability || "-"}
                                                            </td>

                                                            <td
                                                                style={{
                                                                    minWidth: "180px"
                                                                }}
                                                            >
                                                                {app.reason || "-"}
                                                            </td>

                                                            <td>
                                                                {app.applicationDate || "-"}
                                                            </td>

                                                            <td
                                                                style={{
                                                                    minWidth: "120px"
                                                                }}
                                                            >
                                                                {getStatusBadge(
                                                                    app.status
                                                                )}
                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>

                        )}


                    {/* =================================================
                        REFRESH BUTTON
                    ================================================= */}
                    {!loading &&
                        !error &&
                        applications.length > 0 && (

                            <div className="text-center mt-4">

                                <button
                                    className="btn btn-success"
                                    onClick={loadMyApplications}
                                >
                                    🔄 Refresh Status
                                </button>

                            </div>

                        )}

                </div>

            </div>
        </>
    );
}

export default MyVolunteerRequests;