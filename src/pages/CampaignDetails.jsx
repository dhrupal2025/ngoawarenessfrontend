import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function CampaignDetails() {

    const { id } = useParams();

    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCampaign();
    }, [id]);

    // =========================
    // LOAD CAMPAIGN DETAILS
    // =========================
    const loadCampaign = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `http://localhost:8081/api/campaigns/${id}`
            );

            if (response.data) {
                setCampaign(response.data);
            } else {
                setError("Campaign not found.");
            }

        } catch (error) {

            console.log(error);
            setError("Unable to load campaign details.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // FORMAT AMOUNT
    // =========================
    const formatAmount = (amount) => {

        return new Intl.NumberFormat("en-IN").format(
            amount || 0
        );

    };


    // =========================
    // PROGRESS
    // =========================
    const getProgress = () => {

        if (!campaign) {
            return 0;
        }

        const target =
            Number(campaign.targetAmount) || 0;

        const collected =
            Number(campaign.collectedAmount) || 0;

        if (target <= 0) {
            return 0;
        }

        const progress =
            Math.round((collected / target) * 100);

        return Math.min(progress, 100);

    };


    // =========================
    // DAYS REMAINING
    // =========================
    const getDaysRemaining = () => {

        if (!campaign?.endDate) {
            return null;
        }

        const today = new Date();

        const deadline =
            new Date(campaign.endDate);

        today.setHours(0, 0, 0, 0);
        deadline.setHours(0, 0, 0, 0);

        const difference =
            deadline.getTime() - today.getTime();

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

    };


    // =========================
    // SHARE CAMPAIGN
    // =========================
    const shareCampaign = async () => {

        if (!campaign) {
            return;
        }

        const shareData = {

            title: campaign.title,

            text:
                `Support this NGO campaign: ${campaign.title}`,

            url: window.location.href

        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert("Campaign link copied!");

            }

        } catch (error) {

            console.log("Share cancelled");

        }
    };


    // =========================
    // LOADING
    // =========================
    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    ></div>

                    <p className="text-muted mt-3">
                        Loading campaign...
                    </p>

                </div>
            </>

        );

    }


    // =========================
    // ERROR
    // =========================
    if (error || !campaign) {

        return (

            <>
                <Navbar />

                <div className="container py-5">

                    <div className="alert alert-danger text-center">

                        {error || "Campaign not found."}

                    </div>

                    <div className="text-center">

                        <Link
                            to="/campaigns"
                            className="btn btn-success"
                        >
                            ← Back to Campaigns
                        </Link>

                    </div>

                </div>
            </>

        );

    }


    const percent = getProgress();

    const daysRemaining = getDaysRemaining();


    return (

        <>
            <Navbar />

            <div className="container py-5">

                {/* =========================
                    BACK BUTTON
                ========================== */}

                <div className="mb-4">

                    <Link
                        to="/campaigns"
                        className="btn btn-outline-success"
                    >
                        ← Back to Campaigns
                    </Link>

                </div>


                <div className="row g-5">

                    {/* =========================
                        LEFT SIDE - IMAGE
                    ========================== */}

                    <div className="col-lg-6">

                        <div className="card border-0 shadow rounded-4 overflow-hidden">

                            {campaign.image ? (

                                <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="img-fluid w-100"
                                    style={{
                                        height: "450px",
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                <div
                                    className="bg-light d-flex align-items-center justify-content-center"
                                    style={{
                                        height: "450px"
                                    }}
                                >

                                    <h5 className="text-muted">
                                        No Campaign Image
                                    </h5>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* =========================
                        RIGHT SIDE - DETAILS
                    ========================== */}

                    <div className="col-lg-6">

                        {/* CATEGORY */}

                        {campaign.category && (

                            <span className="badge bg-success mb-3 px-3 py-2">

                                {campaign.category}

                            </span>

                        )}


                        {/* TITLE */}

                        <h1 className="fw-bold text-success mb-3">

                            {campaign.title}

                        </h1>


                        {/* STATUS */}

                        <div className="mb-3">

                            <span
                                className={
                                    campaign.status?.toLowerCase() === "completed"
                                        ? "badge bg-secondary px-3 py-2"
                                        : "badge bg-success px-3 py-2"
                                }
                            >

                                {campaign.status}

                            </span>

                        </div>


                        {/* DESCRIPTION */}

                        <h5 className="fw-bold">
                            About This Campaign
                        </h5>

                        <p className="text-muted">

                            {campaign.description}

                        </p>


                        {/* PROGRESS */}

                        <div className="mt-4">

                            <div className="d-flex justify-content-between">

                                <strong>
                                    Fundraising Progress
                                </strong>

                                <strong className="text-success">
                                    {percent}%
                                </strong>

                            </div>


                            <div
                                className="progress mt-2"
                                style={{
                                    height: "14px"
                                }}
                            >

                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{
                                        width: `${percent}%`
                                    }}
                                    aria-valuenow={percent}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >

                                    {percent}%

                                </div>

                            </div>

                        </div>


                        {/* AMOUNTS */}

                        <div className="row mt-4">

                            <div className="col-6">

                                <div className="p-3 bg-light rounded-3">

                                    <small className="text-muted">
                                        Amount Raised
                                    </small>

                                    <h4 className="text-success fw-bold mb-0">

                                        ₹
                                        {formatAmount(
                                            campaign.collectedAmount
                                        )}

                                    </h4>

                                </div>

                            </div>


                            <div className="col-6">

                                <div className="p-3 bg-light rounded-3">

                                    <small className="text-muted">
                                        Target Amount
                                    </small>

                                    <h4 className="fw-bold mb-0">

                                        ₹
                                        {formatAmount(
                                            campaign.targetAmount
                                        )}

                                    </h4>

                                </div>

                            </div>

                        </div>


                        {/* DEADLINE */}

                        {campaign.endDate && (

                            <div className="mt-4 p-3 border rounded-3">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <small className="text-muted">
                                            Campaign Deadline
                                        </small>

                                        <div className="fw-bold">

                                            📅 {campaign.endDate}

                                        </div>

                                    </div>


                                    <div className="text-end">

                                        {daysRemaining > 0 ? (

                                            <>
                                                <small className="text-muted">
                                                    Remaining
                                                </small>

                                                <div className="text-danger fw-bold">

                                                    {daysRemaining} days

                                                </div>
                                            </>

                                        ) : daysRemaining === 0 ? (

                                            <div className="text-danger fw-bold">

                                                Deadline Today

                                            </div>

                                        ) : (

                                            <div className="text-danger fw-bold">

                                                Campaign Ended

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* START DATE */}

                        {campaign.startDate && (

                            <p className="text-muted mt-3 mb-0">

                                📅 Started on:{" "}

                                <strong>
                                    {campaign.startDate}
                                </strong>

                            </p>

                        )}


                        {/* ACTION BUTTONS */}

                        <div className="row g-2 mt-4">

                            <div className="col-md-6">

                                <Link
                                    to={`/donate?campaignId=${campaign.id}`}
                                    className="btn btn-success btn-lg w-100"
                                >

                                    💰 Donate Now

                                </Link>

                            </div>


                            <div className="col-md-6">

                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-lg w-100"
                                    onClick={shareCampaign}
                                >

                                    📤 Share Campaign

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default CampaignDetails;
