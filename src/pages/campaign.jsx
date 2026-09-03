import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Campaigns() {

    const [campaigns, setCampaigns] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:8081/api/campaigns";


    // =========================
    // LOAD ALL CAMPAIGNS
    // =========================
    useEffect(() => {
        loadCampaigns();
    }, []);


    const loadCampaigns = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(API_URL);

            setCampaigns(response.data);

        } catch (error) {

            console.error("Campaign loading error:", error);

            setError("Unable to load campaigns.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // SEARCH + CATEGORY FILTER
    // =========================
    const filterCampaigns = async (searchValue, categoryValue) => {

        try {

            setLoading(true);
            setError("");

            let response;

            // Search + Category
            if (
                searchValue.trim() !== "" &&
                categoryValue !== "All"
            ) {

                const searchResponse = await axios.get(
                    `${API_URL}/search?keyword=${encodeURIComponent(searchValue)}`
                );

                const filtered = searchResponse.data.filter(
                    (campaign) =>
                        campaign.category?.toLowerCase() ===
                        categoryValue.toLowerCase()
                );

                setCampaigns(filtered);

            }

            // Search only
            else if (searchValue.trim() !== "") {

                response = await axios.get(
                    `${API_URL}/search?keyword=${encodeURIComponent(searchValue)}`
                );

                setCampaigns(response.data);

            }

            // Category only
            else if (categoryValue !== "All") {

                response = await axios.get(
                    `${API_URL}/category/${encodeURIComponent(categoryValue)}`
                );

                setCampaigns(response.data);

            }

            // No filter
            else {

                response = await axios.get(API_URL);

                setCampaigns(response.data);

            }

        } catch (error) {

            console.error("Filter error:", error);

            setError("Unable to filter campaigns.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // SEARCH
    // =========================
    const handleSearch = (value) => {

        setSearch(value);

        filterCampaigns(value, category);
    };


    // =========================
    // CATEGORY
    // =========================
    const handleCategory = (value) => {

        setCategory(value);

        filterCampaigns(search, value);
    };


    // =========================
    // SHARE CAMPAIGN
    // =========================
    const shareCampaign = async (campaign) => {

        const shareData = {

            title: campaign.title,

            text:
                `Support this NGO campaign: ${campaign.title}`,

            url:
                `${window.location.origin}/campaign/${campaign.id}`
        };


        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    shareData.url
                );

                alert("Campaign link copied!");

            }

        } catch (error) {

            console.log("Share cancelled.");

        }
    };


    // =========================
    // FORMAT CURRENCY
    // =========================
    const formatAmount = (amount) => {

        return new Intl.NumberFormat("en-IN").format(
            Number(amount) || 0
        );

    };


    // =========================
    // GET PROGRESS
    // =========================
    const getProgress = (campaign) => {

        const target =
            Number(campaign.targetAmount) || 0;

        const collected =
            Number(campaign.collectedAmount) || 0;

        if (target <= 0) {

            return 0;

        }

        const progress =
            Math.round(
                (collected / target) * 100
            );

        return Math.min(progress, 100);
    };


    // =========================
    // GET DAYS REMAINING
    // =========================
    const getDaysRemaining = (endDate) => {

        if (!endDate) {

            return null;

        }

        const today = new Date();

        const deadline = new Date(endDate);

        today.setHours(0, 0, 0, 0);

        deadline.setHours(0, 0, 0, 0);

        const difference =
            deadline.getTime() -
            today.getTime();

        return Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );
    };


    return (

        <>

            <Navbar />


            <div className="container py-5">


                {/* =========================
                    HEADER
                ========================== */}

                <h2 className="text-center fw-bold text-success mb-2">

                    🌱 NGO Campaigns

                </h2>


                <p className="text-center text-muted mb-5">

                    Support our campaigns and help bring
                    positive change.

                </p>


                {/* =========================
                    SEARCH & FILTER
                ========================== */}

                <div className="row g-3 mb-5">


                    {/* SEARCH */}

                    <div className="col-md-8">

                        <div className="input-group">

                            <span className="input-group-text">

                                🔍

                            </span>


                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search campaigns..."
                                value={search}
                                onChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    {/* CATEGORY */}

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                handleCategory(e.target.value)
                            }
                        >

                            <option value="All">
                                All Categories
                            </option>

                            <option value="Education">
                                Education
                            </option>

                            <option value="Health">
                                Health
                            </option>

                            <option value="Environment">
                                Environment
                            </option>

                            <option value="Food">
                                Food
                            </option>

                            <option value="Women Empowerment">
                                Women Empowerment
                            </option>

                            <option value="Child Welfare">
                                Child Welfare
                            </option>

                        </select>

                    </div>

                </div>


                {/* =========================
                    LOADING
                ========================== */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        >
                        </div>

                        <p className="mt-3 text-muted">

                            Loading campaigns...

                        </p>

                    </div>

                )}


                {/* =========================
                    ERROR
                ========================== */}

                {!loading && error && (

                    <div className="alert alert-danger text-center">

                        {error}

                    </div>

                )}


                {/* =========================
                    NO CAMPAIGNS
                ========================== */}

                {!loading &&
                    !error &&
                    campaigns.length === 0 && (

                        <div className="text-center py-5">

                            <h4 className="text-muted">

                                No Campaigns Found

                            </h4>

                            <p className="text-muted">

                                Try another search or category.

                            </p>

                        </div>

                    )}


                {/* =========================
                    CAMPAIGN CARDS
                ========================== */}

                {!loading &&
                    !error &&
                    campaigns.length > 0 && (

                        <div className="row">

                            {campaigns.map((campaign) => {

                                const percent =
                                    getProgress(campaign);

                                const daysRemaining =
                                    getDaysRemaining(
                                        campaign.endDate
                                    );


                                return (

                                    <div
                                        className="col-lg-4 col-md-6 mb-4"
                                        key={campaign.id}
                                    >

                                        <div className="card border-0 shadow-lg rounded-4 h-100 overflow-hidden">


                                            {/* =========================
                                                IMAGE
                                            ========================== */}

                                            {campaign.image ? (

                                                <img
                                                    src={campaign.image}
                                                    className="card-img-top"
                                                    alt={campaign.title}
                                                    style={{
                                                        height: "230px",
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            ) : (

                                                <div
                                                    className="d-flex align-items-center justify-content-center bg-light"
                                                    style={{
                                                        height: "230px"
                                                    }}
                                                >

                                                    <span className="text-muted">

                                                        No Image

                                                    </span>

                                                </div>

                                            )}


                                            <div className="card-body">


                                                {/* CATEGORY */}

                                                {campaign.category && (

                                                    <span className="badge bg-success mb-2">

                                                        {campaign.category}

                                                    </span>

                                                )}


                                                {/* TITLE */}

                                                <h4 className="text-success fw-bold">

                                                    {campaign.title}

                                                </h4>


                                                {/* DESCRIPTION */}

                                                <p className="text-muted">

                                                    {campaign.description}

                                                </p>


                                                {/* =========================
                                                    PROGRESS
                                                ========================== */}

                                                <div className="mb-3">

                                                    <div className="d-flex justify-content-between mb-1">

                                                        <small className="fw-bold">

                                                            Fundraising Progress

                                                        </small>

                                                        <small className="fw-bold text-success">

                                                            {percent}%

                                                        </small>

                                                    </div>


                                                    <div
                                                        className="progress"
                                                        style={{
                                                            height: "10px"
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
                                                        </div>

                                                    </div>

                                                </div>


                                                {/* =========================
                                                    AMOUNTS
                                                ========================== */}

                                                <div className="d-flex justify-content-between">

                                                    <p className="mb-2">

                                                        <small className="text-muted">

                                                            Raised

                                                        </small>

                                                        <br />

                                                        <strong className="text-success">

                                                            ₹
                                                            {formatAmount(
                                                                campaign.collectedAmount
                                                            )}

                                                        </strong>

                                                    </p>


                                                    <p className="mb-2 text-end">

                                                        <small className="text-muted">

                                                            Goal

                                                        </small>

                                                        <br />

                                                        <strong>

                                                            ₹
                                                            {formatAmount(
                                                                campaign.targetAmount
                                                            )}

                                                        </strong>

                                                    </p>

                                                </div>


                                                {/* =========================
                                                    DEADLINE
                                                ========================== */}

                                                {campaign.endDate && (

                                                    <div className="mt-2">


                                                        {daysRemaining > 0 ? (

                                                            <p className="text-danger mb-2">

                                                                ⏰

                                                                <strong>

                                                                    {" "}
                                                                    {daysRemaining}
                                                                    {" "}
                                                                    days remaining

                                                                </strong>

                                                            </p>

                                                        ) : daysRemaining === 0 ? (

                                                            <p className="text-danger mb-2">

                                                                ⏰

                                                                <strong>

                                                                    {" "}
                                                                    Deadline is today

                                                                </strong>

                                                            </p>

                                                        ) : (

                                                            <p className="text-danger mb-2">

                                                                ⛔

                                                                <strong>

                                                                    {" "}
                                                                    Campaign ended

                                                                </strong>

                                                            </p>

                                                        )}


                                                        <small className="text-muted">

                                                            Deadline:{" "}

                                                            {campaign.endDate}

                                                        </small>

                                                    </div>

                                                )}


                                                {/* STATUS */}

                                                <div className="mt-3">

                                                    <span
                                                        className={
                                                            campaign.status?.toLowerCase() ===
                                                            "completed"
                                                                ? "badge bg-secondary"
                                                                : "badge bg-success"
                                                        }
                                                    >

                                                        {campaign.status}

                                                    </span>

                                                </div>

                                            </div>


                                            {/* =========================
                                                FOOTER BUTTONS
                                            ========================== */}

                                            <div className="card-footer bg-white border-0 pb-4 px-3">

                                                <div className="row g-2">


                                                    {/* DETAILS */}

                                                    <div className="col-6">

                                                        <Link
                                                            to={`/campaign/${campaign.id}`}
                                                            className="btn btn-outline-success w-100"
                                                        >

                                                            👁️ Details

                                                        </Link>

                                                    </div>


                                                    {/* DONATE */}

                                                    <div className="col-6">

                                                        <Link
                                                            to={`/donate?campaignId=${campaign.id}`}
                                                            className="btn btn-success w-100"
                                                        >

                                                            💰 Donate

                                                        </Link>

                                                    </div>


                                                    {/* SHARE */}

                                                    <div className="col-12 mt-2">

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary w-100"
                                                            onClick={() =>
                                                                shareCampaign(campaign)
                                                            }
                                                        >

                                                            📤 Share Campaign

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

            </div>

        </>

    );

}

export default Campaigns;