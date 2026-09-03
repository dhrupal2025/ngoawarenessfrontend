import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ManageVolunteerRequests() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");


    // =========================
    // LOAD APPLICATIONS
    // =========================

    useEffect(() => {
        loadApplications();
    }, []);


    const loadApplications = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                "http://localhost:8081/api/volunteer-applications"
            );

            setApplications(response.data);

        } catch (error) {

            console.error(
                "Error loading volunteer applications:",
                error
            );

            alert("Unable to load volunteer applications.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // UPDATE STATUS
    // =========================

   const updateStatus = async (id, status) => {

    try {

        await axios.put(
            `http://localhost:8081/api/volunteer-applications/${id}/status`,
            null,
            {
                params: {
                    status: status
                }
            }
        );

        alert("Application " + status);

        loadApplications();

    } catch (error) {

        console.error("Update status error:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        alert("Unable to update application.");

    }
};

    // =========================
    // DELETE APPLICATION
    // =========================

    const deleteApplication = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8081/api/volunteer-applications/${id}`
            );

            alert("Application deleted successfully.");

            loadApplications();

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert("Unable to delete application.");

        }
    };


    // =========================
    // SEARCH + STATUS FILTER
    // =========================

    const filteredApplications = applications.filter(
        (app) => {

            const keyword =
                search.toLowerCase().trim();

            const matchesSearch =
                app.fullName
                    ?.toLowerCase()
                    .includes(keyword) ||

                app.email
                    ?.toLowerCase()
                    .includes(keyword) ||

                app.mobile
                    ?.toLowerCase()
                    .includes(keyword) ||

                app.occupation
                    ?.toLowerCase()
                    .includes(keyword) ||

                app.skills
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesStatus =
                statusFilter === "All" ||
                app.status === statusFilter;

            return matchesSearch && matchesStatus;
        }
    );


    // =========================
    // COUNTS
    // =========================

    const totalApplications =
        applications.length;

    const pendingApplications =
        applications.filter(
            (app) => app.status === "Pending"
        ).length;

  const acceptedApplications =
    applications.filter(
        (app) => app.status === "Accepted"
    ).length;

    const rejectedApplications =
        applications.filter(
            (app) => app.status === "Rejected"
        ).length;


    return (

        <>

            <Navbar />


            <div className="container-fluid py-5">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="text-success fw-bold mb-1">

                            🤝 Volunteer Application Requests

                        </h2>

                        <p className="text-muted mb-0">

                            Review and manage customer
                            volunteer applications.

                        </p>

                    </div>


                    <button
                        className="btn btn-success"
                        onClick={loadApplications}
                    >

                        🔄 Refresh

                    </button>

                </div>


                {/* =========================
                    STATISTICS
                ========================= */}

                <div className="row g-3 mb-4">


                    {/* TOTAL */}

                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">

                                    Total Applications

                                </small>

                                <h3 className="fw-bold mt-2">

                                    {totalApplications}

                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* PENDING */}

                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-warning">

                                    Pending

                                </small>

                                <h3 className="fw-bold text-warning mt-2">

                                    {pendingApplications}

                                </h3>

                            </div>

                        </div>

                    </div>


                    {/*  Accepted */}

                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-success">
    Accepted
</small>

<h3 className="fw-bold text-success mt-2">
    {acceptedApplications}
</h3>

                            </div>

                        </div>

                    </div>


                    {/* REJECTED */}

                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-danger">

                                    Rejected

                                </small>

                                <h3 className="fw-bold text-danger mt-2">

                                    {rejectedApplications}

                                </h3>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    SEARCH + FILTER
                ========================= */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-8">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name, email, mobile, occupation or skills..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>


                            <div className="col-md-4">

                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                >

                                    <option value="All">
                                        All Applications
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                  <option value="Accepted">
    Accepted
</option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    LOADING
                ========================= */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        />

                        <p className="text-muted mt-3">

                            Loading applications...

                        </p>

                    </div>

                )}


                {/* =========================
                    TABLE
                ========================= */}

                {!loading && (

                    <div className="card border-0 shadow-lg">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-success">

                                        <tr>

                                            <th>ID</th>

                                            <th>Event ID</th>

                                            <th>Name</th>

                                            <th>Email</th>

                                            <th>Mobile</th>

                                            <th>Age</th>

                                            <th>Occupation</th>

                                            <th>Skills</th>

                                            <th>Availability</th>

                                            <th>Reason</th>

                                            <th>Status</th>

                                            <th width="230">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredApplications.length > 0 ? (

                                            filteredApplications.map(
                                                (app) => (

                                                    <tr
                                                        key={app.id}
                                                    >

                                                        <td>
                                                            {app.id}
                                                        </td>

                                                        <td>
                                                            {app.eventId}
                                                        </td>

                                                        <td>
                                                            <strong>
                                                                {
                                                                    app.fullName
                                                                }
                                                            </strong>
                                                        </td>

                                                        <td>
                                                            {app.email}
                                                        </td>

                                                        <td>
                                                            {app.mobile}
                                                        </td>

                                                        <td>
                                                            {app.age || "-"}
                                                        </td>

                                                        <td>
                                                            {
                                                                app.occupation ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                app.skills ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                app.availability ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td
                                                            style={{
                                                                minWidth:
                                                                    "250px"
                                                            }}
                                                        >
                                                            {
                                                                app.reason ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td>

                                                            <span
                                                                className={
                                                                    app.status === "Accepted"
                                                                        ? "badge bg-success"
                                                                        : app.status ===
                                                                          "Rejected"
                                                                        ? "badge bg-danger"
                                                                        : "badge bg-warning text-dark"
                                                                }
                                                            >

                                                                {
                                                                    app.status
                                                                }

                                                            </span>

                                                        </td>

                                                        <td>

                                                            {app.status ===
                                                            "Pending" ? (

                                                                <div className="d-flex gap-2">

                                                                   <button
    className="btn btn-success btn-sm me-2"
   onClick={() =>
    updateStatus(app.id, "Accepted")
}
>
    Accept
</button>


                                                                   <button
    className="btn btn-danger btn-sm"
    onClick={() =>
        updateStatus(app.id, "Rejected")
    }
>
    Reject
</button>

                                                                </div>

                                                            ) : (

                                                                <span className="text-muted me-2">

                                                                    No Action

                                                                </span>

                                                            )}


                                                            <button
                                                                className="btn btn-outline-danger btn-sm mt-2"
                                                                onClick={() =>
                                                                    deleteApplication(
                                                                        app.id
                                                                    )
                                                                }
                                                            >

                                                                🗑 Delete

                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="12"
                                                    className="text-center py-5"
                                                >

                                                    <h5 className="text-muted">

                                                        No Volunteer
                                                        Applications Found

                                                    </h5>

                                                    <p className="text-muted mb-0">

                                                        No applications
                                                        match your search
                                                        or filter.

                                                    </p>

                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </>

    );
}

export default ManageVolunteerRequests;