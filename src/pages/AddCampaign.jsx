import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddCampaign() {

    const navigate = useNavigate();

    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        image: "",
        category: "",
        targetAmount: "",
        collectedAmount: 0,
        startDate: "",
        endDate: "",
        status: "Active"
    });

    const [imagePreview, setImagePreview] = useState("");

    // =========================
    // TEXT INPUT
    // =========================

    const handleChange = (e) => {

        setCampaign({
            ...campaign,
            [e.target.name]: e.target.value
        });

    };

    // =========================
    // IMAGE UPLOAD
    // =========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            return;
        }

        if (file.size > 5 * 1024 * 1024) {

            alert("Image size must be less than 5 MB.");

            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {

            const base64Image = reader.result;

            setCampaign({
                ...campaign,
                image: base64Image
            });

            setImagePreview(base64Image);
        };

        reader.readAsDataURL(file);
    };

    // =========================
    // SAVE CAMPAIGN
    // =========================
const saveCampaign = async (e) => {

    e.preventDefault();

    console.log("Campaign data being sent:", campaign);

    try {

        const response = await axios.post(
            "http://localhost:8081/api/campaigns",
            campaign
        );

        console.log("SUCCESS:", response.data);

        alert("Campaign Added Successfully");

        navigate("/manage-campaigns");

    } catch (error) {

        console.log("========== CAMPAIGN SAVE ERROR ==========");

        console.log("Error:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        if (error.request) {
            console.log("Request:", error.request);
        }

        alert("Unable to Save Campaign");
    }
};
    return (
        <>
            <Navbar />

            <div className="container mt-5 mb-5">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-success text-white">

                        <h3 className="mb-0">
                            ➕ Add Campaign
                        </h3>

                    </div>

                    <div className="card-body p-4">

                        <form onSubmit={saveCampaign}>

                            {/* TITLE */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Campaign Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={campaign.title}
                                    onChange={handleChange}
                                    placeholder="Enter campaign title"
                                    required
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="5"
                                    name="description"
                                    value={campaign.description}
                                    onChange={handleChange}
                                    placeholder="Enter campaign description"
                                    required
                                />

                            </div>


                            {/* CATEGORY */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={campaign.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Category
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

                                    <option value="Women">
                                        Women Empowerment
                                    </option>

                                    <option value="Children">
                                        Children
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* IMAGE */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Campaign Image
                                </label>

                                <div>

                                    <input
                                        type="file"
                                        id="campaignImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />

                                    <label
                                        htmlFor="campaignImage"
                                        className="btn btn-outline-success"
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >
                                        📷 Upload Image
                                    </label>

                                </div>

                                <small className="text-muted">
                                    Maximum image size: 5 MB.
                                </small>

                            </div>


                            {/* IMAGE PREVIEW */}

                            {imagePreview && (

                                <div className="mb-4">

                                    <p className="fw-bold mb-2">
                                        Image Preview
                                    </p>

                                    <img
                                        src={imagePreview}
                                        alt="Campaign Preview"
                                        className="img-fluid rounded shadow"
                                        style={{
                                            maxHeight: "250px",
                                            maxWidth: "100%",
                                            objectFit: "cover"
                                        }}
                                    />

                                </div>

                            )}


                            {/* TARGET AMOUNT */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Target Amount
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="targetAmount"
                                    value={campaign.targetAmount}
                                    onChange={handleChange}
                                    placeholder="Enter target amount"
                                    min="1"
                                    required
                                />

                            </div>


                            {/* START DATE */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={campaign.startDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* END DATE */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={campaign.endDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* STATUS */}

                            <div className="mb-4">

                                <label className="form-label fw-bold">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={campaign.status}
                                    onChange={handleChange}
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* BUTTONS */}

                            <button
                                type="submit"
                                className="btn btn-success px-4"
                            >
                                💾 Save Campaign
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary ms-2 px-4"
                                onClick={() =>
                                    navigate("/manage-campaigns")
                                }
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AddCampaign;