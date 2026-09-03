import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeedback();
    }, []);

    useEffect(() => {

        const result = feedbacks.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredFeedbacks(result);

    }, [search, feedbacks]);

    const loadFeedback = async () => {

        try {

            const response = await axios.get("http://localhost:8081/api/feedback");

            setFeedbacks(response.data);
            setFilteredFeedbacks(response.data);

        } catch (error) {

            console.log(error);
            alert("Unable to load feedback.");

        } finally {

            setLoading(false);

        }
    };

    const deleteFeedback = async (id) => {

        if (!window.confirm("Are you sure you want to delete this feedback?"))
            return;

        try {

            await axios.delete(`http://localhost:8081/api/feedback/${id}`);

            alert("Feedback deleted successfully.");

            loadFeedback();

        } catch (error) {

            console.log(error);
            alert("Unable to delete feedback.");

        }

    };

    const renderStars = (rating) => {

        return (
            <>
                {[1,2,3,4,5].map((star) => (
                    <span
                        key={star}
                        style={{
                            color: star <= rating ? "#ffc107" : "#d6d6d6",
                            fontSize: "20px"
                        }}
                    >
                        ★
                    </span>
                ))}
            </>
        );
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold text-success">
                        Manage Feedback
                    </h2>

                    <span className="badge bg-success fs-6">
                        Total Feedback : {filteredFeedbacks.length}
                    </span>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row mb-3">

                            <div className="col-md-5">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Name or Email"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                            </div>

                        </div>

                        {loading ? (

                            <div className="text-center p-5">

                                <div className="spinner-border text-success"></div>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-success">

                                        <tr>

                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Rating</th>
                                            <th>Feedback</th>
                                            <th>Date</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredFeedbacks.length > 0 ? (

                                            filteredFeedbacks.map((item) => (

                                                <tr key={item.id}>

                                                    <td>{item.id}</td>

                                                    <td>{item.name}</td>

                                                    <td>{item.email}</td>

                                                    <td>{item.subject || "-"}</td>

                                                    <td>
                                                        {renderStars(item.rating)}
                                                    </td>

                                                    <td style={{maxWidth:"300px"}}>
                                                        {item.message}
                                                    </td>

                                                    <td>

                                                        {
                                                            item.feedbackDate
                                                                ? new Date(item.feedbackDate).toLocaleString()
                                                                : "-"
                                                        }

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteFeedback(item.id)}
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
                                                    No Feedback Found
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </>
    );
}

export default ManageFeedback;