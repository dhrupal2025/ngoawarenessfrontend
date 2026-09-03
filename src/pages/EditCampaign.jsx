import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function EditCampaign() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        image: ""
    });

    useEffect(() => {

        loadCampaign();

    }, []);

    const loadCampaign = async () => {

        try {

            const res = await axios.get(
                `http://localhost:8081/api/campaigns/${id}`
            );

            setCampaign(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setCampaign({

            ...campaign,

            [e.target.name]: e.target.value

        });

    };

    const updateCampaign = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8081/api/campaigns/${id}`,
                campaign
            );

            alert("Campaign Updated Successfully");

            navigate("/manage-campaigns");

        } catch (error) {

            console.log(error);

            alert("Unable to Update Campaign");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white">

                        <h3>✏ Edit Campaign</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={updateCampaign}>

                            <div className="mb-3">

                                <label className="form-label">

                                    Campaign Title

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={campaign.title}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea
                                    className="form-control"
                                    rows="5"
                                    name="description"
                                    value={campaign.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Image URL

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="image"
                                    value={campaign.image}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {campaign.image && (

                                <img
                                    src={campaign.image}
                                    alt=""
                                    className="img-fluid rounded mb-3"
                                    style={{ maxHeight: "220px" }}
                                />

                            )}

                            <button className="btn btn-primary">
                                Update Campaign
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    );
}

export default EditCampaign;