import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function ManageEvents() {

    const API_URL = "http://localhost:8081/api/events";

    const [events, setEvents] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [event, setEvent] = useState({
        title: "",
        date: "",
        location: "",
        image: null,
        existingImage: null,
        existingImageType: null
    });


    // =====================================================
    // LOAD EVENTS
    // =====================================================

    useEffect(() => {
        loadEvents();
    }, []);


    const loadEvents = async () => {

        try {

            const response = await axios.get(API_URL);

            console.log("Events loaded:", response.data);

            setEvents(response.data);

        } catch (error) {

            console.error(
                "Error loading events:",
                error
            );
        }
    };


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "image") {

            setEvent(prev => ({
                ...prev,
                image:
                    files && files.length > 0
                        ? files[0]
                        : null
            }));

        } else {

            setEvent(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    // =====================================================
    // OPEN ADD MODAL
    // =====================================================

    const openAddModal = () => {

        console.log("Opening Add Event");

        setEditingId(null);

        setEvent({
            title: "",
            date: "",
            location: "",
            image: null,
            existingImage: null,
            existingImageType: null
        });

        setShowModal(true);
    };


    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const openEditModal = (selectedEvent) => {

        console.log(
            "EDIT BUTTON CLICKED",
            selectedEvent
        );

        console.log(
            "Selected Event ID:",
            selectedEvent.id
        );

        setEditingId(selectedEvent.id);

        setEvent({
            title: selectedEvent.title || "",
            date: selectedEvent.date || "",
            location: selectedEvent.location || "",
            image: null,
            existingImage: selectedEvent.image || null,
            existingImageType:
                selectedEvent.imageType || "image/jpeg"
        });

        setShowModal(true);
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {

        setShowModal(false);

        setEditingId(null);

        setEvent({
            title: "",
            date: "",
            location: "",
            image: null,
            existingImage: null,
            existingImageType: null
        });
    };


    // =====================================================
    // ADD EVENT
    // =====================================================

    const addEvent = async () => {

        try {

            if (!event.image) {

                alert(
                    "Please select an event image."
                );

                return false;
            }


            const formData = new FormData();

            formData.append(
                "title",
                event.title
            );

            formData.append(
                "date",
                event.date
            );

            formData.append(
                "location",
                event.location
            );

            formData.append(
                "image",
                event.image
            );


            console.log(
                "ADDING EVENT"
            );


            const response = await axios.post(
                API_URL,
                formData
            );


            console.log(
                "Add response:",
                response.data
            );


            alert(
                "Event Added Successfully"
            );


            return true;

        } catch (error) {

            console.error(
                "ADD EVENT ERROR:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Backend:",
                error.response?.data
            );


            alert(
                error.response?.data ||
                "Unable to add event."
            );

            return false;
        }
    };


    // =====================================================
    // UPDATE EVENT
    // =====================================================

    const updateEvent = async () => {

        // =================================================
        // IMPORTANT CHECK
        // =================================================

        if (editingId === null) {

            console.error(
                "UPDATE FAILED: editingId is null"
            );

            alert(
                "No event selected for editing."
            );

            return false;
        }


        try {

            console.log(
                "UPDATING EVENT ID:",
                editingId
            );


            const formData = new FormData();

            formData.append(
                "title",
                event.title
            );

            formData.append(
                "date",
                event.date
            );

            formData.append(
                "location",
                event.location
            );


            // =================================================
            // NEW IMAGE OPTIONAL
            // =================================================

            if (
                event.image &&
                event.image instanceof File
            ) {

                console.log(
                    "New image selected:",
                    event.image.name
                );

                formData.append(
                    "image",
                    event.image
                );

            } else {

                console.log(
                    "No new image selected - keeping old image"
                );
            }


            console.log(
                "PUT URL:",
                `${API_URL}/${editingId}`
            );


            const response = await axios.put(
                `${API_URL}/${editingId}`,
                formData
            );


            console.log(
                "UPDATE RESPONSE:",
                response.data
            );


            alert(
                "Event Updated Successfully"
            );


            return true;

        } catch (error) {

            console.error(
                "UPDATE EVENT ERROR:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Backend response:",
                error.response?.data
            );


            if (error.response?.status === 500) {

                alert(
                    "Server error while updating event. Check Spring Boot console."
                );

            } else {

                alert(
                    error.response?.data ||
                    "Unable to update event."
                );
            }


            return false;
        }
    };


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    const saveEvent = async (e) => {

        e.preventDefault();

        setLoading(true);


        try {

            let success = false;


            // =================================================
            // ADD
            // =================================================

            if (editingId === null) {

                console.log(
                    "FORM MODE: ADD"
                );

                success = await addEvent();

            }

            // =================================================
            // UPDATE
            // =================================================

            else {

                console.log(
                    "FORM MODE: UPDATE"
                );

                console.log(
                    "EDITING ID:",
                    editingId
                );

                success = await updateEvent();
            }


            // =================================================
            // SUCCESS
            // =================================================

            if (success) {

                await loadEvents();

                closeModal();
            }

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // DELETE EVENT
    // =====================================================

    const deleteEvent = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this event?"
            )
        ) {
            return;
        }


        try {

            console.log(
                "Deleting event:",
                id
            );


            await axios.delete(
                `${API_URL}/${id}`
            );


            alert(
                "Event Deleted Successfully"
            );


            await loadEvents();

        } catch (error) {

            console.error(
                "DELETE ERROR:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Backend:",
                error.response?.data
            );


            alert(
                error.response?.data ||
                "Unable to delete event."
            );
        }
    };


    // =====================================================
    // IMAGE URL
    // =====================================================

    const getImageUrl = (
        image,
        imageType = "image/jpeg"
    ) => {

        if (!image) {
            return null;
        }


        // =================================================
        // BACKEND BYTE[] -> BASE64
        // =================================================

        return `data:${imageType};base64,${image}`;
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (
        <>
            <Navbar />


            <div
                className="container mt-5"
                style={{
                    minHeight: "100vh"
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-4
                    "
                >

                    <div>

                        <h2 className="text-success fw-bold mb-1">
                            📅 Manage Events
                        </h2>

                        <p className="text-muted mb-0">
                            Add, edit and manage NGO events.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={openAddModal}
                    >
                        ➕ Add Event
                    </button>

                </div>


                {/* =================================================
                    EVENTS TABLE
                ================================================= */}

                <div className="card border-0 shadow">

                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0 fw-bold">
                            📋 All Events
                        </h5>

                    </div>


                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table
                                className="
                                    table
                                    table-bordered
                                    table-hover
                                    mb-0
                                    align-middle
                                "
                            >

                                <thead className="table-success">

                                    <tr>

                                        <th>ID</th>

                                        <th>Image</th>

                                        <th>Title</th>

                                        <th>Date</th>

                                        <th>Location</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {events.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="
                                                    text-center
                                                    py-4
                                                    text-muted
                                                "
                                            >
                                                No events found.
                                            </td>

                                        </tr>

                                    ) : (

                                        events.map((e) => (

                                            <tr key={e.id}>

                                                {/* ID */}

                                                <td>
                                                    {e.id}
                                                </td>


                                                {/* IMAGE */}

                                                <td>

                                                    {e.image ? (

                                                        <img
                                                            src={getImageUrl(
                                                                e.image,
                                                                e.imageType
                                                            )}
                                                            alt={e.title}
                                                            style={{
                                                                width: "100px",
                                                                height: "65px",
                                                                objectFit: "cover",
                                                                borderRadius: "8px",
                                                                border: "1px solid #ddd"
                                                            }}
                                                        />

                                                    ) : (

                                                        <span className="text-muted">
                                                            No Image
                                                        </span>

                                                    )}

                                                </td>


                                                {/* TITLE */}

                                                <td className="fw-semibold">
                                                    {e.title}
                                                </td>


                                                {/* DATE */}

                                                <td>
                                                    {e.date}
                                                </td>


                                                {/* LOCATION */}

                                                <td>
                                                    📍 {e.location}
                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    <div
                                                        className="
                                                            d-flex
                                                            gap-2
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            className="
                                                                btn
                                                                btn-primary
                                                                btn-sm
                                                            "
                                                            onClick={() =>
                                                                openEditModal(e)
                                                            }
                                                        >
                                                            ✏️ Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="
                                                                btn
                                                                btn-danger
                                                                btn-sm
                                                            "
                                                            onClick={() =>
                                                                deleteEvent(e.id)
                                                            }
                                                        >
                                                            🗑 Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                MODAL
            ===================================================== */}

            {showModal && (

                <div
                    className="
                        modal
                        fade
                        show
                        d-block
                    "
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.6)"
                    }}
                >

                    <div
                        className="
                            modal-dialog
                            modal-dialog-centered
                        "
                    >

                        <div
                            className="
                                modal-content
                                border-0
                                shadow-lg
                            "
                        >

                            {/* =================================================
                                HEADER
                            ================================================= */}

                            <div
                                className="
                                    modal-header
                                    bg-success
                                    text-white
                                "
                            >

                                <h5 className="modal-title fw-bold">

                                    {editingId !== null
                                        ? "✏️ Edit Event"
                                        : "➕ Add New Event"}

                                </h5>


                                <button
                                    type="button"
                                    className="
                                        btn-close
                                        btn-close-white
                                    "
                                    onClick={closeModal}
                                    disabled={loading}
                                />

                            </div>


                            {/* =================================================
                                FORM
                            ================================================= */}

                            <form onSubmit={saveEvent}>

                                <div className="modal-body p-4">

                                    {/* TITLE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Event Title
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={event.title}
                                            onChange={handleChange}
                                            placeholder="Enter event title"
                                            required
                                        />

                                    </div>


                                    {/* DATE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Event Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={event.date}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* LOCATION */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={event.location}
                                            onChange={handleChange}
                                            placeholder="Enter event location"
                                            required
                                        />

                                    </div>


                                    {/* CURRENT IMAGE */}

                                    {editingId !== null &&
                                        event.existingImage && (

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">
                                                    Current Image
                                                </label>

                                                <div>

                                                    <img
                                                        src={getImageUrl(
                                                            event.existingImage,
                                                            event.existingImageType
                                                        )}
                                                        alt="Current Event"
                                                        style={{
                                                            width: "150px",
                                                            height: "100px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            border: "1px solid #ddd"
                                                        }}
                                                    />

                                                </div>

                                            </div>
                                        )}


                                    {/* IMAGE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            {editingId !== null
                                                ? "Change Image (Optional)"
                                                : "Event Image"}

                                        </label>


                                        <input
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            required={
                                                editingId === null
                                            }
                                        />


                                        <small className="text-muted">

                                            {editingId !== null
                                                ? "Choose a new image only if you want to replace the current image."
                                                : "Select JPG, JPEG, PNG or WEBP image."}

                                        </small>

                                    </div>


                                    {/* NEW IMAGE PREVIEW */}

                                    {event.image && (

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                New Image Preview
                                            </label>


                                            <div>

                                                <img
                                                    src={URL.createObjectURL(
                                                        event.image
                                                    )}
                                                    alt="Preview"
                                                    style={{
                                                        width: "150px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        border: "1px solid #ddd"
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    )}

                                </div>


                                {/* =================================================
                                    FOOTER
                                ================================================= */}

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>
                                                <span
                                                    className="
                                                        spinner-border
                                                        spinner-border-sm
                                                        me-2
                                                    "
                                                ></span>

                                                Saving...
                                            </>

                                        ) : (

                                            editingId !== null
                                                ? "💾 Update Event"
                                                : "➕ Add Event"

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default ManageEvents;

