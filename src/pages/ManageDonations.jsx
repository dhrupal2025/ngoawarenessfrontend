import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ManageDonations() {

    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;

    useEffect(() => {
        loadDonations();
    }, []);

    const loadDonations = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/donations"
            );
            setDonations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDonation = async (id) => {

        if (!window.confirm("Are you sure you want to delete this donation?")) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8081/api/donations/${id}`
            );

            loadDonations();

        } catch (error) {

            console.log(error);
            alert("Unable to delete donation.");

        }

    };

    const filteredDonations = donations.filter((d) =>
        d.donorName?.toLowerCase().includes(search.toLowerCase()) ||
        d.email?.toLowerCase().includes(search.toLowerCase())
    );

    const totalDonation = filteredDonations.reduce(
        (sum, d) => sum + Number(d.amount),
        0
    );

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;

    const currentDonations = filteredDonations.slice(
        indexOfFirst,
        indexOfLast
    );

    const totalPages = Math.ceil(
        filteredDonations.length / recordsPerPage
    );

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="text-center text-success fw-bold mb-4">
                    💝 Manage Donations
                </h2>

                {/* Dashboard Cards */}

                <div className="row mb-4">

                    <div className="col-md-6 mb-3">

                        <div className="card shadow border-0 bg-success text-white">

                            <div className="card-body text-center">

                                <h5>Total Donation Amount</h5>

                                <h2>₹ {totalDonation}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6 mb-3">

                        <div className="card shadow border-0 bg-primary text-white">

                            <div className="card-body text-center">

                                <h5>Total Donations</h5>

                                <h2>{filteredDonations.length}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by donor or email..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                    </div>

                </div>

                {/* Table */}

                <div className="table-responsive shadow">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-success">

                            <tr>

                                <th>ID</th>
                                <th>Donor</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Date</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentDonations.length > 0 ? (

                                currentDonations.map((d) => (

                                    <tr key={d.id}>

                                        <td>{d.id}</td>

                                        <td>{d.donorName}</td>

                                        <td>{d.email}</td>

                                        <td>{d.mobile}</td>

                                        <td className="fw-bold text-success">
                                            ₹ {d.amount}
                                        </td>

                                        <td>{d.paymentMethod}</td>

                                        <td>{d.donationDate}</td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteDonation(d.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center text-muted"
                                    >
                                        No Donations Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                {totalPages > 1 && (

                    <nav className="mt-4">

                        <ul className="pagination justify-content-center">

                            <li
                                className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                >
                                    Previous
                                </button>

                            </li>

                            {[...Array(totalPages)].map((_, index) => (

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
                                            setCurrentPage(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>

                                </li>

                            ))}

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
                                        setCurrentPage(currentPage + 1)
                                    }
                                >
                                    Next
                                </button>

                            </li>

                        </ul>

                    </nav>

                )}

            </div>

        </>
    );
}

export default ManageDonations;