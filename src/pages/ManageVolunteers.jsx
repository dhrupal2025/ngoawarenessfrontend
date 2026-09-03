import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ManageVolunteers() {

    const [volunteers, setVolunteers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;

    // =========================
    // LOAD VOLUNTEERS
    // =========================

    useEffect(() => {
        loadVolunteers();
    }, []);

    const loadVolunteers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/volunteers"
            );

            setVolunteers(response.data);

        } catch (error) {

            console.error("Error loading volunteers:", error);

            alert("Unable to load volunteer opportunities.");

        }

    };


    // =========================
    // DELETE VOLUNTEER
    // =========================

    const deleteVolunteer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this volunteer opportunity?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8081/api/volunteers/${id}`
            );

            alert("Volunteer opportunity deleted successfully.");

            loadVolunteers();

        } catch (error) {

            console.error("Delete error:", error);

            alert("Unable to delete volunteer opportunity.");

        }

    };


    // =========================
    // OPEN / CLOSE VOLUNTEER
    // =========================

    const toggleStatus = async (volunteer) => {

        const newStatus =
            volunteer.status === "Open"
                ? "Closed"
                : "Open";

        try {

            await axios.put(
                `http://localhost:8081/api/volunteers/${volunteer.id}`,
                {
                    ...volunteer,
                    status: newStatus
                }
            );

            alert(
                `Volunteer opportunity ${newStatus.toLowerCase()} successfully.`
            );

            loadVolunteers();

        } catch (error) {

            console.error("Status update error:", error);

            alert("Unable to update volunteer status.");

        }

    };


    // =========================
    // SEARCH
    // =========================

    const filteredVolunteers = volunteers.filter((v) => {

        const searchText = search.toLowerCase();

        return (
            v.title?.toLowerCase().includes(searchText) ||
            v.location?.toLowerCase().includes(searchText) ||
            v.status?.toLowerCase().includes(searchText)
        );

    });


    // =========================
    // PAGINATION
    // =========================

    const totalPages = Math.ceil(
        filteredVolunteers.length / recordsPerPage
    );

    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;

    const currentRecords = filteredVolunteers.slice(
        firstIndex,
        lastIndex
    );


    // Reset page when searching

    const handleSearch = (e) => {

        setSearch(e.target.value);

        setCurrentPage(1);

    };


    return (

        <>
            <Navbar />

            <div className="container py-5">

                {/* =========================
                    HEADER
                ========================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="text-success fw-bold mb-1">
                            🤝 Manage Volunteers
                        </h2>

                        <p className="text-muted mb-0">
                            Manage volunteer opportunities
                        </p>

                    </div>

                    <Link
                        to="/add-volunteer"
                        className="btn btn-success"
                    >
                        ➕ Add Volunteer
                    </Link>

                </div>


                {/* =========================
                    SEARCH
                ========================== */}

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-5">

                                <label className="form-label fw-semibold">
                                    Search Volunteer
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title, location or status..."
                                    value={search}
                                    onChange={handleSearch}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    TABLE
                ========================== */}

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover align-middle">

                                <thead className="table-success">

                                    <tr>

                                        <th>ID</th>

                                        <th>Image</th>

                                        <th>Title</th>

                                        <th>Description</th>

                                        <th>Location</th>

                                        <th>Date</th>

                                        <th>Status</th>

                                        <th style={{ width: "280px" }}>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {currentRecords.length > 0 ? (

                                        currentRecords.map((v) => (

                                            <tr key={v.id}>

                                                {/* ID */}

                                                <td>
                                                    {v.id}
                                                </td>


                                                {/* IMAGE */}

                                                <td>

                                                    {v.image ? (

                                                        <img
                                                            src={v.image}
                                                            alt={v.title}
                                                            width="90"
                                                            height="60"
                                                            className="rounded"
                                                            style={{
                                                                objectFit: "cover"
                                                            }}
                                                        />

                                                    ) : (

                                                        <span className="text-muted">
                                                            No Image
                                                        </span>

                                                    )}

                                                </td>


                                                {/* TITLE */}

                                                <td className="fw-semibold">
                                                    {v.title}
                                                </td>


                                                {/* DESCRIPTION */}

                                                <td>

                                                    {v.description?.length > 60
                                                        ? v.description.substring(0, 60) + "..."
                                                        : v.description
                                                    }

                                                </td>


                                                {/* LOCATION */}

                                                <td>
                                                    {v.location}
                                                </td>


                                                {/* DATE */}

                                                <td>
                                                    {v.date}
                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            v.status === "Open"
                                                                ? "bg-success"
                                                                : "bg-secondary"
                                                        }`}
                                                    >

                                                        {v.status}

                                                    </span>

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    {/* EDIT */}

                                                    <Link
                                                        to={`/edit-volunteer/${v.id}`}
                                                        className="btn btn-primary btn-sm me-1"
                                                    >
                                                        ✏️ Edit
                                                    </Link>


                                                    {/* OPEN / CLOSE */}

                                                    <button
                                                        className={`btn btn-sm me-1 ${
                                                            v.status === "Open"
                                                                ? "btn-warning"
                                                                : "btn-success"
                                                        }`}
                                                        onClick={() =>
                                                            toggleStatus(v)
                                                        }
                                                    >

                                                        {v.status === "Open"
                                                            ? "🔒 Close"
                                                            : "🔓 Open"
                                                        }

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteVolunteer(v.id)
                                                        }
                                                    >
                                                        🗑️ Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center text-muted py-4"
                                            >
                                                No Volunteer Opportunities Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* =========================
                            PAGINATION
                        ========================== */}

                        {totalPages > 0 && (

                            <nav className="mt-3">

                                <ul className="pagination justify-content-center">

                                    {/* PREVIOUS */}

                                    <li
                                        className={`page-item ${
                                            currentPage === 1
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage - 1
                                                )
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>


                                    {/* PAGE NUMBERS */}

                                    {[...Array(totalPages)].map(
                                        (_, index) => (

                                            <li
                                                key={index}
                                                className={`page-item ${
                                                    currentPage === index + 1
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            index + 1
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </button>

                                            </li>

                                        )
                                    )}


                                    {/* NEXT */}

                                    <li
                                        className={`page-item ${
                                            currentPage === totalPages
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage + 1
                                                )
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

                        )}

                    </div>

                </div>

            </div>

        </>

    );

}

export default ManageVolunteers;