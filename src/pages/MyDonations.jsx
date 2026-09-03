import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyDonations() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMyDonations();
    }, []);

    // =========================
    // LOAD MY DONATIONS
    // =========================

    const loadMyDonations = async () => {

        try {

            const donationEmail =
                localStorage.getItem("donationEmail");

            console.log(
                "Donation Email:",
                donationEmail
            );

            if (!donationEmail) {

                setDonations([]);

                return;
            }

            const response = await axios.get(
                "http://localhost:8081/api/donations/my",
                {
                    params: {
                        email: donationEmail
                    }
                }
            );

            console.log(
                "MY DONATIONS:",
                response.data
            );

            setDonations(response.data);

        } catch (error) {

            console.error(
                "My Donations Error:",
                error
            );

            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Backend:",
                    error.response.data
                );
            }

        } finally {

            setLoading(false);
        }
    };

    // =========================
    // TOTAL DONATION
    // =========================

    const totalDonation = donations.reduce(
        (sum, donation) =>
            sum + Number(donation.amount || 0),
        0
    );

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="container text-center py-5">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    />

                    <p className="mt-3">
                        Loading donations...
                    </p>

                </div>
            </>
        );
    }

    // =========================
    // PAGE
    // =========================

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="text-center text-success mb-4">
                    My Donations
                </h2>

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0">
                            Donation History
                        </h5>

                    </div>

                    <div className="card-body">

                        {/* TOTAL */}

                        <div className="alert alert-success">

                            <strong>
                                Total Donation:
                            </strong>

                            {" "}₹
                            {totalDonation.toLocaleString(
                                "en-IN"
                            )}

                        </div>

                        {/* TABLE */}

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-success">

                                    <tr>

                                        <th>ID</th>
                                        <th>Campaign</th>
                                        <th>Donor Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Date</th>
                                        <th>Receipt</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {donations.length > 0 ? (

                                        donations.map(
                                            (donation) => (

                                                <tr
                                                    key={
                                                        donation.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            donation.id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            donation.campaignTitle
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            donation.donorName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            donation.email
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            donation.mobile
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {Number(
                                                            donation.amount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    <td>
                                                        {
                                                            donation.paymentMethod
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            donation.donationDate
                                                        }
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                window.open(
                                                                    `http://localhost:8081/api/pdf/donation/${donation.id}`,
                                                                    "_blank"
                                                                )
                                                            }
                                                        >
                                                            Download Receipt
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="9"
                                                className="text-center text-danger"
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

            </div>
        </>
    );
}

export default MyDonations;