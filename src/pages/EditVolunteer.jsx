import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function EditVolunteer() {

    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);

    // =========================
    // LOAD VOLUNTEER
    // =========================

    useEffect(() => {
        loadVolunteer();
    }, [id]);

    const loadVolunteer = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8081/api/volunteers/${id}`
            );

            setVolunteer(response.data);

            if (response.data.image) {
                setImagePreview(response.data.image);
            }

        } catch (error) {

            console.error("Load volunteer error:", error);

            alert("Unable to load volunteer.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // TEXT INPUT
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setVolunteer({
            ...volunteer,
            [name]: value
        });

    };


    // =========================
    // IMAGE CHANGE
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

        // Check image size
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
    // UPDATE VOLUNTEER
    // =========================

    const updateVolunteer = async (e) => {

        e.preventDefault();

        try {

            console.log(
                "Volunteer data being updated:",
                volunteer
            );

            await axios.put(
                `http://localhost:8081/api/volunteers/${id}`,
                volunteer,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("Volunteer updated successfully.");

            navigate("/manage-volunteers");

        } catch (error) {

            console.error(
                "Update volunteer error:",
                error
            );

            if (error.response) {

                console.log(
                    "Status:",
                    error.response.status
                );

                console.log(
                    "Response:",
                    error.response.data
                );

            } else if (error.request) {

                console.log(
                    "No response from backend."
                );

            } else {

                console.log(
                    "Error:",
                    error.message
                );

            }

            alert("Volunteer update failed.");

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="container text-center mt-5">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    ></div>

                    <p className="mt-3">
                        Loading volunteer opportunity...
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

                    <div className="col-lg-8">

                        <div className="card shadow-lg border-0 rounded-4">

                            {/* HEADER */}

                            <div className="card-header bg-success text-white p-4">

                                <h3 className="mb-0">
                                    ✏️ Edit Volunteer Opportunity
                                </h3>

                                <small>
                                    Update volunteer opportunity details
                                </small>

                            </div>


                            {/* BODY */}

                            <div className="card-body p-4">

                                <form onSubmit={updateVolunteer}>

                                    {/* TITLE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Volunteer Title *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={volunteer.title || ""}
                                            onChange={handleChange}
                                            placeholder="Enter volunteer title"
                                            required
                                        />

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Description *
                                        </label>

                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="4"
                                            value={
                                                volunteer.description || ""
                                            }
                                            onChange={handleChange}
                                            placeholder="Enter volunteer description"
                                            required
                                        ></textarea>

                                    </div>


                                    {/* LOCATION + DATE */}

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                Location *
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="location"
                                                value={
                                                    volunteer.location || ""
                                                }
                                                onChange={handleChange}
                                                placeholder="Enter location"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                Date *
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="date"
                                                value={
                                                    volunteer.date || ""
                                                }
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Status
                                        </label>

                                        <select
                                            className="form-select"
                                            name="status"
                                            value={
                                                volunteer.status || "Open"
                                            }
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


                                    {/* IMAGE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Volunteer Image
                                        </label>

                                        <div>

                                            <input
                                                type="file"
                                                id="volunteerImage"
                                                accept="image/*"
                                                onChange={
                                                    handleImageChange
                                                }
                                                style={{
                                                    display: "none"
                                                }}
                                            />

                                            <label
                                                htmlFor="volunteerImage"
                                                className="btn btn-outline-success"
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                            >
                                                📷 Change Image
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
                                                alt="Volunteer"
                                                className="img-fluid rounded shadow"
                                                style={{
                                                    maxHeight: "250px",
                                                    maxWidth: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />

                                        </div>

                                    )}


                                    {/* BUTTONS */}

                                    <div className="d-flex gap-2 mt-4">

                                        <button
                                            type="submit"
                                            className="btn btn-success px-4"
                                        >
                                            💾 Update Volunteer
                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-secondary px-4"
                                            onClick={() =>
                                                navigate(
                                                    "/manage-volunteers"
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default EditVolunteer;