import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function VolunteerApplication() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState({
        fullName: "",
        email: "",
        mobile: "",
        age: "",
        occupation: "",
        address: "",
        skills: "",
        availability: "",
        reason: ""
    });

    const [loading, setLoading] = useState(false);

    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setApplication({
            ...application,
            [name]: value
        });
    };


    // =========================
    // SUBMIT APPLICATION
    // =========================

    const submitApplication = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            console.log("Application data:", application);
            console.log("Event ID:", id);

            const response = await axios.post(
                `http://localhost:8081/api/volunteer-applications/${id}`,
                application,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Application saved:", response.data);

          localStorage.setItem(
    "volunteerEmail",
    application.email
);

alert("Volunteer Application Submitted Successfully!");

navigate("/MyVolunteerRequests");
        } catch (error) {

            console.error(
                "Volunteer application error:",
                error
            );

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

            } else if (error.request) {

                console.log("No response from backend.");

            } else {

                console.log("Error:", error.message);
            }

            alert(
                "Unable to submit application. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">

                            {/* HEADER */}

                            <div className="card-header bg-success text-white text-center py-4">

                                <h2 className="fw-bold mb-1">
                                    🤝 Volunteer Application
                                </h2>

                                <p className="mb-0">
                                    Join us and make a difference
                                </p>

                            </div>


                            {/* BODY */}

                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={submitApplication}>

                                    {/* PERSONAL INFORMATION */}

                                    <h5 className="text-success fw-bold mb-3">
                                        Personal Information
                                    </h5>

                                    <div className="row">

                                        {/* FULL NAME */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Full Name *
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fullName"
                                                value={application.fullName}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                required
                                            />

                                        </div>


                                        {/* EMAIL */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Email *
                                            </label>

                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={application.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                            />

                                        </div>


                                        {/* MOBILE */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Mobile Number *
                                            </label>

                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="mobile"
                                                value={application.mobile}
                                                onChange={handleChange}
                                                placeholder="Enter mobile number"
                                                required
                                            />

                                        </div>


                                        {/* AGE */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Age *
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="age"
                                                value={application.age}
                                                onChange={handleChange}
                                                placeholder="Enter your age"
                                                min="18"
                                                required
                                            />

                                        </div>


                                        {/* OCCUPATION */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Occupation
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="occupation"
                                                value={application.occupation}
                                                onChange={handleChange}
                                                placeholder="Student / Job / Business"
                                            />

                                        </div>


                                        {/* ADDRESS */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Address *
                                            </label>

                                            <textarea
                                                className="form-control"
                                                rows="2"
                                                name="address"
                                                value={application.address}
                                                onChange={handleChange}
                                                placeholder="Enter your address"
                                                required
                                            />

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* VOLUNTEER INFORMATION */}

                                    <h5 className="text-success fw-bold mb-3">
                                        Volunteer Information
                                    </h5>

                                    <div className="row">

                                        {/* SKILLS */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Skills
                                            </label>

                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                name="skills"
                                                value={application.skills}
                                                onChange={handleChange}
                                                placeholder="Teaching, Event Management, First Aid..."
                                            />

                                        </div>


                                        {/* AVAILABILITY */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Availability *
                                            </label>

                                            <select
                                                className="form-select"
                                                name="availability"
                                                value={application.availability}
                                                onChange={handleChange}
                                                required
                                            >

                                                <option value="">
                                                    Select Availability
                                                </option>

                                                <option value="Weekdays">
                                                    Weekdays
                                                </option>

                                                <option value="Weekends">
                                                    Weekends
                                                </option>

                                                <option value="Any Time">
                                                    Any Time
                                                </option>

                                            </select>

                                        </div>


                                        {/* REASON */}

                                        <div className="col-12 mb-3">

                                            <label className="form-label fw-semibold">
                                                Why do you want to volunteer? *
                                            </label>

                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                name="reason"
                                                value={application.reason}
                                                onChange={handleChange}
                                                placeholder="Tell us why you would like to volunteer..."
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* EVENT ID */}

                                    <div className="alert alert-light border">

                                        <strong>
                                            Event ID:
                                        </strong>{" "}

                                        {id}

                                    </div>


                                    {/* SUBMIT */}

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2"
                                        disabled={loading}
                                    >

                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                />

                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                🤝 Submit Application
                                            </>
                                        )}

                                    </button>


                                    {/* BACK */}

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100 mt-2"
                                        onClick={() => navigate(-1)}
                                    >
                                        ← Back
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

export default VolunteerApplication;