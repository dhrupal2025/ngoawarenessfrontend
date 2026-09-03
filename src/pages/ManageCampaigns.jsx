import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function ManageCampaigns() {

    const [campaigns, setCampaigns] = useState([]);

    // =========================
    // LOAD CAMPAIGNS
    // =========================
    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/api/campaigns"
            );

            console.log("Campaigns:", response.data);

            setCampaigns(response.data);

        } catch (error) {

            console.log("Error loading campaigns:", error);

        }
    };

    // =========================
    // DELETE
    // =========================
    const deleteCampaign = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this campaign?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8081/api/campaigns/${id}`
            );

            alert("Campaign Deleted Successfully");

            loadCampaigns();

        } catch (error) {

            console.log(error);

            alert("Unable to Delete Campaign");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-4">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold text-success">
                            🌱 Manage Campaigns
                        </h2>

                        <p className="text-muted">
                            Manage all NGO campaigns
                        </p>

                    </div>

                    <Link
                        to="/add-campaign"
                        className="btn btn-success"
                    >
                        ➕ Add Campaign
                    </Link>

                </div>

                {/* COUNT */}

                <div className="alert alert-success">

                    <strong>
                        Total Campaigns:
                    </strong>{" "}

                    {campaigns.length}

                </div>

                {/* TABLE */}

                <div className="card border-0 shadow-lg">

                    <div className="card-body table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-success">

                                <tr>

                                    <th>ID</th>

                                    <th>Image</th>

                                    <th>Title</th>

                                    <th>Category</th>

                                    <th>Target Amount</th>

                                    <th>Collected</th>

                                    <th>Start Date</th>

                                    <th>End Date</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {campaigns.length > 0 ? (

                                    campaigns.map((campaign) => (

                                        <tr key={campaign.id}>

                                            {/* ID */}

                                            <td>
                                                {campaign.id}
                                            </td>

                                            {/* IMAGE */}

                                            <td>

                                                {campaign.image ? (

                                                    <img
                                                        src={campaign.image}
                                                        alt={campaign.title}
                                                        style={{
                                                            width: "90px",
                                                            height: "60px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px"
                                                        }}
                                                    />

                                                ) : (

                                                    <span className="text-muted">
                                                        No Image
                                                    </span>

                                                )}

                                            </td>

                                            {/* TITLE */}

                                            <td>

                                                <strong>
                                                    {campaign.title}
                                                </strong>

                                                <br />

                                                <small className="text-muted">

                                                    {campaign.description?.substring(
                                                        0,
                                                        50
                                                    )}

                                                    {campaign.description?.length > 50
                                                        ? "..."
                                                        : ""}

                                                </small>

                                            </td>

                                            {/* CATEGORY */}

                                            <td>

                                                <span className="badge bg-info">

                                                    {campaign.category}

                                                </span>

                                            </td>

                                            {/* TARGET */}

                                            <td>

                                                ₹{campaign.targetAmount}

                                            </td>

                                            {/* COLLECTED */}

                                            <td className="text-success fw-bold">

                                                ₹{campaign.collectedAmount || 0}

                                            </td>

                                            {/* START */}

                                            <td>
                                                {campaign.startDate}
                                            </td>

                                            {/* END */}

                                            <td>
                                                {campaign.endDate}
                                            </td>

                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        campaign.status === "Active"
                                                            ? "bg-success"
                                                            : campaign.status === "Completed"
                                                            ? "bg-primary"
                                                            : "bg-secondary"
                                                    }`}
                                                >

                                                    {campaign.status}

                                                </span>

                                            </td>

                                            {/* DELETE */}

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        deleteCampaign(
                                                            campaign.id
                                                        )
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="10"
                                            className="text-center py-5"
                                        >

                                            <h5 className="text-muted">
                                                No Campaigns Found
                                            </h5>

                                            <Link
                                                to="/add-campaign"
                                                className="btn btn-success mt-2"
                                            >
                                                ➕ Add First Campaign
                                            </Link>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ManageCampaigns;