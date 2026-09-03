import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import AdminHome from "./pages/AdminHome";
import CustomerHome from "./pages/CustomerHome";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ManageEvents from "./pages/ManageEvents";
import ManageDonations from "./pages/ManageDonations";
import Reports from "./pages/Reports";
import DonationForm from "./pages/DonationForm";
import Volunteer from "./pages/Volunteer";
import MyDonations from "./pages/MyDonations";
import VolunteerApplication from "./pages/VolunteerApplication";
import Campaigns from "./pages/campaign";
import ManageVolunteerRequests from "./pages/ManageVolunteerRequests";
import ManageCampaigns from "./pages/ManageCampaigns";
import AddCampaign from "./pages/AddCampaign";
import EditCampaign from "./pages/EditCampaign";
import AddVolunteer from "./pages/AddVolunteer";
import EditVolunteer from "./pages/EditVolunteer";
import ManageVolunteers from "./pages/ManageVolunteers";
import Feedback from "./pages/Feedback";
import ManageFeedback from "./pages/ManageFeedback";
import CampaignDetails from "./pages/CampaignDetails";
import MyVolunteerRequests from "./pages/MyVolunteerRequests";





function App() {
  return (
    <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/About" element={<About />} />
         <Route path="/events" element={<Events />} />
         <Route path="/gallery" element={<Gallery />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/admin-home" element={<AdminHome />} />
         <Route path="/customer-home" element={<CustomerHome />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/manage-users" element={<Users />} />
         <Route path="/manage-events" element={<ManageEvents />} />
         <Route path="/manage-donations" element={<ManageDonations />} />
         <Route path="/reports" element={<Reports />} />
          <Route path="/donate" element={<DonationForm />}/>
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/volunteer-application/:id" element={<VolunteerApplication />}/>
          <Route path="/my-donations" element={<MyDonations />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/manage-volunteer-requests" element={<ManageVolunteerRequests />}/>
          <Route path="/add-campaign" element={<AddCampaign />} />
          <Route path="/manage-campaigns" element={<ManageCampaigns />} />
          <Route  path="/manage-volunteers" element={<ManageVolunteers />}/>
          <Route path="/edit-campaign/:id" element={<EditCampaign />} />
          <Route path="/add-volunteer" element={<AddVolunteer />}/>
          <Route path="/edit-volunteer/:id" element={<EditVolunteer />}/>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/manage-feedback" element={<ManageFeedback />} />
          <Route path="/campaign/:id" element={<CampaignDetails />}/>
          <Route path="/MyVolunteerRequests" element={<MyVolunteerRequests />}/>
    </Routes>
  );
}

export default App;