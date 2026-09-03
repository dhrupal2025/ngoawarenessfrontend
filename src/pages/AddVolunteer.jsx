import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddVolunteer() {

    const navigate = useNavigate();

    const [volunteer, setVolunteer] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        status: "Open",
        image: ""
    });

    const [imagePreview, setImagePreview] = useState("");

    // =========================
    // TEXT INPUT
    // =========================
    const handleChange = (e) => {

        setVolunteer({
            ...volunteer,
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

        // Check image type
        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            return;
        }

        // Check image size - 5 MB
        if (file.size > 5 * 1024 * 1024) {

            alert("Image size must be less than 5 MB.");

            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {

            const base64Image = reader.result;

            setVolunteer({
                ...volunteer,
                image: base64Image
            });

            setImagePreview(base64Image);

        };

        reader.readAsDataURL(file);
    };


    // =========================
    // SAVE VOLUNTEER
    // =========================
    const saveVolunteer = async (e) => {

        e.preventDefault();

        console.log("Volunteer data being sent:", volunteer);

        try {

            const response = await axios.post(
                "http://localhost:8081/api/volunteers",
                volunteer,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Volunteer Saved:", response.data);

            alert("Volunteer added successfully.");

            navigate("/manage-volunteers");

        } catch (error) {

            console.log("========== VOLUNTEER SAVE ERROR ==========");

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

            } else if (error.request) {

                console.log("No response from backend");

            } else {

                console.log("Error:", error.message);

            }

            alert("Failed to add volunteer.");

        }

    };


    return (
        <>
            <Navbar />

            <div className="container mt-5 mb-5">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-success text-white">

                        <h3 className="mb-0">
                            ➕ Add Volunteer
                        </h3>

                    </div>

                    <div className="card-body p-4">

                        <form onSubmit={saveVolunteer}>

                            {/* =========================
                                TITLE
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Volunteer Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={volunteer.title}
                                    onChange={handleChange}
                                    placeholder="Enter volunteer title"
                                    required
                                />

                            </div>


                            {/* =========================
                                DESCRIPTION
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={volunteer.description}
                                    onChange={handleChange}
                                    placeholder="Enter volunteer description"
                                    required
                                ></textarea>

                            </div>


                            {/* =========================
                                LOCATION + DATE
                            ========================== */}

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={volunteer.location}
                                        onChange={handleChange}
                                        placeholder="Enter location"
                                        required
                                    />

                                </div>


                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={volunteer.date}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* =========================
                                STATUS
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={volunteer.status}
                                    onChange={handleChange}
                                >

                                    <option value="Open">
                                        Open
                                    </option>

                                    <option value="Closed">
                                        Closed
                                    </option>

                                </select>

                            </div>


                            {/* =========================
                                IMAGE UPLOAD
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label fw-bold">
                                    Volunteer Image
                                </label>

                                <div>

                                    {/* Hidden file input */}

                                    <input
                                        type="file"
                                        id="volunteerImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />


                                    {/* Upload button */}

                                    <label
                                        htmlFor="volunteerImage"
                                        className="btn btn-outline-success"
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >

                                        📷 Upload Image

                                    </label>

                                </div>

                                <small className="text-muted">
                                    Select an image from your computer. Maximum size: 5 MB.
                                </small>

                            </div>


                            {/* =========================
                                IMAGE PREVIEW
                            ========================== */}

                            {imagePreview && (

                                <div className="mb-4">

                                    <p className="fw-bold mb-2">
                                        Image Preview
                                    </p>

                                    <img
                                        src={imagePreview}
                                        alt="Volunteer Preview"
                                        className="img-fluid rounded shadow"
                                        style={{
                                            maxHeight: "250px",
                                            maxWidth: "100%",
                                            objectFit: "cover"
                                        }}
                                    />

                                </div>

                            )}


                            {/* =========================
                                BUTTONS
                            ========================== */}

                            <button
                                type="submit"
                                className="btn btn-success px-4"
                            >

                                💾 Save Volunteer

                            </button>


                            <button
                                type="button"
                                className="btn btn-secondary ms-2 px-4"
                                onClick={() =>
                                    navigate("/manage-volunteers")
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

export default AddVolunteer;