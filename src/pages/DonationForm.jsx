import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function DonationForm() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const campaignId = searchParams.get("campaignId");

    const [campaign, setCampaign] = useState(null);

    const [donation, setDonation] = useState({
        donorName: "",
        email: "",
        mobile: "",
        amount: "",
        paymentMethod: "UPI",
        campaignId: campaignId
            ? Number(campaignId)
            : null
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // =========================
    // LOAD CAMPAIGN
    // =========================

    useEffect(() => {

        if (!campaignId) {

            alert("Campaign ID is missing.");

            navigate("/campaigns");

            return;
        }

        loadCampaign();

    }, [campaignId]);

    // =========================
    // LOAD CAMPAIGN BY ID
    // =========================

    const loadCampaign = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8081/api/campaigns/${campaignId}`
            );

            setCampaign(response.data);

        } catch (error) {

            console.error(
                "Campaign loading error:",
                error
            );

            alert("Unable to load campaign.");

            navigate("/campaigns");

        } finally {

            setLoading(false);
        }
    };

    // =========================
    // HANDLE INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setDonation((previousDonation) => ({
            ...previousDonation,
            [name]: value
        }));
    };

    // =========================
    // SUBMIT DONATION
    // =========================

    const submitDonation = async (e) => {

        e.preventDefault();

        // =========================
        // CAMPAIGN VALIDATION
        // =========================

        if (!campaignId) {

            alert("Campaign ID is missing.");

            return;
        }

        // =========================
        // DONOR NAME VALIDATION
        // =========================

        if (!donation.donorName.trim()) {

            alert("Please enter donor name.");

            return;
        }

        // =========================
        // EMAIL VALIDATION
        // =========================

        if (!donation.email.trim()) {

            alert("Please enter email address.");

            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(donation.email.trim())) {

            alert("Please enter a valid email address.");

            return;
        }

        // =========================
        // MOBILE VALIDATION
        // =========================

        if (!donation.mobile.trim()) {

            alert("Please enter mobile number.");

            return;
        }

        if (!/^[0-9]{10}$/.test(donation.mobile.trim())) {

            alert("Please enter a valid 10 digit mobile number.");

            return;
        }

        // =========================
        // AMOUNT VALIDATION
        // =========================

        if (
            !donation.amount ||
            Number(donation.amount) <= 0
        ) {

            alert("Please enter a valid donation amount.");

            return;
        }

        try {

            setSubmitting(true);

            // =========================
            // DONATION DATA
            // =========================

            const data = {

                donorName:
                    donation.donorName.trim(),

                email:
                    donation.email.trim(),

                mobile:
                    donation.mobile.trim(),

                amount:
                    Number(donation.amount),

                paymentMethod:
                    donation.paymentMethod,

                campaignId:
                    Number(campaignId)
            };

            console.log(
                "DONATION DATA:",
                data
            );

            // =========================
            // SAVE DONATION
            // =========================

            const response = await axios.post(
                "http://localhost:8081/api/donations",
                data
            );

            console.log(
                "DONATION SAVED:",
                response.data
            );

            // =========================
            // SAVE EMAIL FOR MY DONATIONS
            // =========================

            localStorage.setItem(
                "donationEmail",
                donation.email.trim()
            );

            // =========================
            // SUCCESS
            // =========================

            alert(
                "Donation submitted successfully!"
            );

            // =========================
            // GO TO MY DONATIONS
            // =========================

            navigate("/my-donations");

        } catch (error) {

            console.error(
                "DONATION ERROR:",
                error
            );

            // =========================
            // BACKEND ERROR
            // =========================

            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Backend response:",
                    error.response.data
                );

                alert(
                    error.response.data?.message ||
                    error.response.data ||
                    "Unable to submit donation."
                );

            }

            // =========================
            // NO BACKEND RESPONSE
            // =========================

            else if (error.request) {

                console.error(
                    "No response from backend:",
                    error.request
                );

                alert(
                    "Backend server is not responding."
                );

            }

            // =========================
            // OTHER ERROR
            // =========================

            else {

                console.error(
                    "Error:",
                    error.message
                );

                alert(
                    "Unable to submit donation."
                );
            }

        } finally {

            setSubmitting(false);
        }
    };

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
                    >
                    </div>

                    <p className="mt-3">
                        Loading campaign...
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

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-7">

                        <div className="card shadow-lg border-0 rounded-4">

                            {/* HEADER */}

                            <div className="card-header bg-success text-white text-center p-4">

                                <h3 className="fw-bold mb-2">
                                    💰 Make a Donation
                                </h3>

                                <p className="mb-0">
                                    Support this campaign
                                </p>

                            </div>

                            {/* BODY */}

                            <div className="card-body p-4">

                                {/* CAMPAIGN INFORMATION */}

                                {campaign && (

                                    <div className="alert alert-success">

                                        <strong>
                                            Campaign:
                                        </strong>

                                        <br />

                                        {campaign.title}

                                        <br />

                                        <strong>
                                            Category:
                                        </strong>

                                        {" "}

                                        {campaign.category || "N/A"}

                                        <br />

                                        <strong>
                                            Target:
                                        </strong>

                                        {"₹"}

                                        {Number(
                                            campaign.targetAmount || 0
                                        ).toLocaleString("en-IN")}

                                        <br />

                                        <strong>
                                            Collected:
                                        </strong>

                                        {"₹"}

                                        {Number(
                                            campaign.collectedAmount || 0
                                        ).toLocaleString("en-IN")}

                                    </div>
                                )}

                                {/* DONATION FORM */}

                                <form onSubmit={submitDonation}>

                                    {/* DONOR NAME */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Donor Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="donorName"
                                            value={
                                                donation.donorName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter your name"
                                            required
                                        />

                                    </div>

                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={
                                                donation.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter your email"
                                            required
                                        />

                                        <small className="text-muted">
                                            Enter the email address used
                                            for your donation history.
                                        </small>

                                    </div>

                                    {/* MOBILE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Mobile
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="mobile"
                                            value={
                                                donation.mobile
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter 10 digit mobile number"
                                            maxLength="10"
                                            required
                                        />

                                    </div>

                                    {/* AMOUNT */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Donation Amount
                                        </label>

                                        <input
                                            type="text"
                                        
                                            step="0.01"
                                            className="form-control"
                                            name="amount"
                                            value={
                                                donation.amount
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter amount"
                                            required
                                        />

                                    </div>

                                    {/* PAYMENT METHOD */}

                                    <div className="mb-4">

                                        <label className="form-label fw-bold">
                                            Payment Method
                                        </label>

                                        <select
                                            className="form-select"
                                            name="paymentMethod"
                                            value={
                                                donation.paymentMethod
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="UPI">
                                                UPI
                                            </option>

                                            <option value="Card">
                                                Card
                                            </option>

                                            <option value="Cash">
                                                Cash
                                            </option>

                                            <option value="Bank Transfer">
                                                Bank Transfer
                                            </option>

                                        </select>

                                    </div>

                                    {/* SUBMIT BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2"
                                        disabled={submitting}
                                    >

                                        {submitting
                                            ? "Processing..."
                                            : "💰 Submit Donation"}

                                    </button>

                                    {/* BACK BUTTON */}

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100 mt-2"
                                        disabled={submitting}
                                        onClick={() =>
                                            navigate("/campaigns")
                                        }
                                    >

                                        ← Back to Campaigns

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default DonationForm;