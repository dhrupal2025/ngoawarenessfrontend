import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/ngologo.jpg";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow">

      <div className="container-fluid">

        {/* Logo */}

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="NGO Logo"
            width="55"
            height="55"
            className="rounded-circle me-2 bg-white p-1"
          />

          <span className="fw-bold fs-4">
            NGO Awareness
          </span>
        </Link>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

         <ul className="navbar-nav ms-auto">

 {/* Customer Navbar */}

{role === "USER" && (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/customer-home">
        CustomerHome
      </Link>
    </li>
   <li className="nav-item">
       <Link className="nav-link" to="/campaigns">
        Campaign
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/about">
        About
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/events">
        Event
      </Link>
    </li>

<li className="nav-item">
      <Link className="nav-link" to="/volunteer">
        volunteer
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/MyVolunteerRequests">
        MyVolunteerRequest
      </Link>
    </li>


<li className="nav-item">
      <Link className="nav-link" to="/my-donations">
    MyDonation
</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/gallery">
        Gallery
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/profile">
        MyProfile
      </Link>
    </li>
 <li className="nav-item">
  <Link className="nav-link" to="/feedback">
    Feedback
  </Link>
</li>
    <li className="nav-item ms-lg-3">
      <button
        className="btn btn-danger rounded-pill px-4 mt-2 mt-lg-0"
        onClick={logout}>
        Logout
      </button>
    </li>
  </>
)}



{/* Admin Navbar */}

{role === "ADMIN" && (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/admin-home">
        AdminHome
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/manage-users">
        User
      </Link>
    </li>
     
      <li className="nav-item">
        <Link className="nav-link" to="/manage-campaigns">
            Campaign
        </Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link" to="/manage-volunteers">
         ManageVolunteer
    </Link>
</li>

     <li className="nav-item">
    <Link
        className="nav-link"
        to="/manage-volunteer-requests"
    >
        VolunteerRequest
    </Link>
</li>

    <li className="nav-item">
      <Link className="nav-link" to="/manage-events">
        Event
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/manage-donations">
       ManageDonation
      </Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link" to="/manage-feedback">
        ManageFeedback
    </Link>
</li>

    <li className="nav-item">
      <Link className="nav-link" to="/reports">
        Report
      </Link>
    </li>

    <li className="nav-item ms-lg-3">
      <button
        className="btn btn-danger rounded-pill px-4 mt-2 mt-lg-0"
        onClick={logout}
      >
        Logout
      </button>
    </li>
  </>
)}

  {/* Before Login */}

  {!role && (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/events">
          Event
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/gallery">
          Gallery
        </Link>
      </li>

      <li className="nav-item ms-lg-3">
        <Link className="btn btn-warning rounded-pill" to="/login">
          Login
        </Link>
      </li>

      <li className="nav-item ms-lg-3">
        <Link className="btn btn-light rounded-pill" to="/register">
          Register
        </Link>
      </li>
    </>
  )}

</ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;