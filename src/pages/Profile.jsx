import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {

  const user = {
    name: "Dhrupal Patel",
    email: "bitsj2024072708@bitbaroda.com",
    mobile: "9876543210",
    city: "Vadodara",
    state: "Gujarat",
    joined: "15 July 2026",
  };

  return (
    <>
      <Navbar />

      <div className="profile-bg">

        <div className="container py-5">

          <div className="row justify-content-center">

            <div className="col-lg-8">

              <div className="profile-card shadow">

                <div className="profile-header">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Profile"
                    className="profile-img"
                  />

                  <h2>{user.name}</h2>

                  <p>NGO Member</p>

                </div>

                <div className="profile-body">

                  <div className="row">

                    <div className="col-md-6 mb-4">

                      <h6>Email</h6>

                      <p>{user.email}</p>

                    </div>

                    <div className="col-md-6 mb-4">

                      <h6>Mobile</h6>

                      <p>{user.mobile}</p>

                    </div>

                    <div className="col-md-6 mb-4">

                      <h6>State</h6>

                      <p>{user.state}</p>

                    </div>

                    <div className="col-md-6 mb-4">

                      <h6>City</h6>

                      <p>{user.city}</p>

                    </div>

                    <div className="col-md-12 mb-4">

                      <h6>Member Since</h6>

                      <p>{user.joined}</p>

                    </div>

                  </div>

                  <div className="text-center">

                    <button className="btn btn-success px-5 me-3">
                      Edit Profile
                    </button>

                    <button className="btn btn-outline-success px-5">
                      Change Password
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Profile;