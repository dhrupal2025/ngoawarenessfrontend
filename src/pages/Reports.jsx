import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reports.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function Reports() {

  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        usersRes,
        campaignsRes,
        eventsRes,
        volunteersRes,
        donationsRes,
        feedbackRes,
      ] = await Promise.all([

        axios.get("http://localhost:8081/api/registeruser"),

        axios.get("http://localhost:8081/api/campaigns"),

        axios.get("http://localhost:8081/api/events"),

        axios.get("http://localhost:8081/api/volunteers"),

        axios.get("http://localhost:8081/api/donations"),

        axios.get("http://localhost:8081/api/feedback")

      ]);

      setUsers(usersRes.data);
      setCampaigns(campaignsRes.data);
      setEvents(eventsRes.data);
      setVolunteers(volunteersRes.data);
      setDonations(donationsRes.data);
      setFeedbacks(feedbackRes.data);

    } catch (error) {

      console.log(error);
      alert("Unable to load reports.");

    } finally {

      setLoading(false);

    }

  };

  const totalDonation = donations.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0
  );

  const averageRating =
    feedbacks.length === 0
      ? 0
      : (
          feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) /
          feedbacks.length
        ).toFixed(1);

  const activeCampaigns = campaigns.filter(
    (c) => c.status === "Active"
  ).length;

  const completedCampaigns = campaigns.filter(
    (c) => c.status === "Completed"
  ).length;

  const pendingCampaigns =
    campaigns.length - activeCampaigns - completedCampaigns;

  const statCards = [
    {
      title: "Users",
      value: users.length,
      color: "primary",
      icon: "👥",
    },
    {
      title: "Campaigns",
      value: campaigns.length,
      color: "success",
      icon: "📢",
    },
    {
      title: "Events",
      value: events.length,
      color: "warning",
      icon: "🎉",
    },
    {
      title: "Volunteers",
      value: volunteers.length,
      color: "info",
      icon: "🙋",
    },
    {
      title: "Feedback",
      value: feedbacks.length,
      color: "secondary",
      icon: "⭐",
    },
    {
      title: "Donations",
      value: donations.length,
      color: "danger",
      icon: "❤️",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container-fluid py-4">

        <div className="text-center mb-4">

          <h2 className="fw-bold text-success">
            NGO Reports & Analytics Dashboard
          </h2>

          <p className="text-muted">
            Real-Time Statistics and Reports
          </p>

        </div>

        {loading ? (

          <div className="text-center mt-5">

            <div className="spinner-border text-success"></div>

          </div>

        ) : (

          <>
            <div className="row g-4">

              {statCards.map((card, index) => (

                <div className="col-lg-2 col-md-4 col-sm-6" key={index}>

                  <div
                    className={`card border-0 shadow report-card bg-${card.color} text-white`}
                  >

                    <div className="card-body text-center">

                      <div
                        style={{
                          fontSize: "45px",
                        }}
                      >
                        {card.icon}
                      </div>

                      <h1 className="fw-bold mt-2">
                        {card.value}
                      </h1>

                      <h6>{card.title}</h6>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="row mt-4">

              <div className="col-lg-4 mb-3">

                <div className="card shadow border-0">

                  <div className="card-body text-center">

                    <h5>Total Donation Amount</h5>

                    <h2 className="text-success fw-bold">

                      ₹ {totalDonation.toLocaleString()}

                    </h2>

                  </div>

                </div>

              </div>

              <div className="col-lg-4 mb-3">

                <div className="card shadow border-0">

                  <div className="card-body text-center">

                    <h5>Average Feedback Rating</h5>

                    <h2 className="text-warning">

                      ⭐ {averageRating}/5

                    </h2>

                  </div>

                </div>

              </div>

              <div className="col-lg-4 mb-3">

                <div className="card shadow border-0">

                  <div className="card-body text-center">

                    <h5>Active Campaigns</h5>

                    <h2 className="text-primary">

                      {activeCampaigns}

                    </h2>

                  </div>

                </div>

              </div>

            </div>
                        {/* ===================== Charts ===================== */}

            <div className="row mt-4">

              {/* Donation Chart */}

              <div className="col-lg-8 mb-4">

                <div className="card shadow border-0">

                  <div className="card-header bg-success text-white">

                    <h5 className="mb-0">
                      Monthly Donation Amount
                    </h5>

                  </div>

                  <div className="card-body">

                    <Bar
                      data={{
                        labels: donations.map((d, index) => `Donation ${index + 1}`),

                        datasets: [
                          {
                            label: "Donation Amount (₹)",

                            data: donations.map((d) =>
                              Number(d.amount || 0)
                            ),

                            backgroundColor: [
                              "#198754",
                              "#0d6efd",
                              "#ffc107",
                              "#dc3545",
                              "#20c997",
                              "#6610f2",
                              "#fd7e14",
                              "#6f42c1",
                            ],

                            borderRadius: 8,
                          },
                        ],
                      }}

                      options={{
                        responsive: true,

                        plugins: {
                          legend: {
                            display: false,
                          },

                          title: {
                            display: true,
                            text: "Donation Report",
                          },
                        },

                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />

                  </div>

                </div>

              </div>

              {/* Campaign Status Chart */}

              <div className="col-lg-4 mb-4">

                <div className="card shadow border-0">

                  <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">

                      Campaign Status

                    </h5>

                  </div>

                  <div className="card-body">

                    <Doughnut

                      data={{

                        labels: [

                          "Active",

                          "Completed",

                          "Pending",

                        ],

                        datasets: [

                          {

                            data: [

                              activeCampaigns,

                              completedCampaigns,

                              pendingCampaigns,

                            ],

                            backgroundColor: [

                              "#198754",

                              "#0d6efd",

                              "#ffc107",

                            ],

                          },

                        ],

                      }}

                      options={{

                        responsive: true,

                        plugins: {

                          legend: {

                            position: "bottom",

                          },

                        },

                      }}

                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ===================== Summary Cards ===================== */}

            <div className="row mt-2">

              <div className="col-md-3 mb-3">

                <div className="card shadow-sm border-start border-success border-5">

                  <div className="card-body">

                    <h6>Total Donations</h6>

                    <h3 className="text-success">

                      {donations.length}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="col-md-3 mb-3">

                <div className="card shadow-sm border-start border-primary border-5">

                  <div className="card-body">

                    <h6>Total Campaigns</h6>

                    <h3 className="text-primary">

                      {campaigns.length}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="col-md-3 mb-3">

                <div className="card shadow-sm border-start border-warning border-5">

                  <div className="card-body">

                    <h6>Total Events</h6>

                    <h3 className="text-warning">

                      {events.length}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="col-md-3 mb-3">

                <div className="card shadow-sm border-start border-info border-5">

                  <div className="card-body">

                    <h6>Total Volunteers</h6>

                    <h3 className="text-info">

                      {volunteers.length}

                    </h3>

                  </div>

                </div>

              </div>

            </div>
                        {/* ===================== Recent Donations ===================== */}

            <div className="row mt-4">

              <div className="col-lg-12">

                <div className="card shadow border-0">

                  <div className="card-header bg-danger text-white">

                    <h5 className="mb-0">Recent Donations</h5>

                  </div>

                  <div className="card-body table-responsive">

                    <table className="table table-bordered table-hover">

                      <thead className="table-light">

                        <tr>
                          <th>ID</th>
                          <th>Donor Name</th>
                          <th>Email</th>
                          <th>Amount</th>
                          <th>Payment</th>
                          <th>Date</th>
                        </tr>

                      </thead>

                      <tbody>

                        {donations.length > 0 ? (

                          donations.slice(0, 5).map((donation) => (

                            <tr key={donation.id}>

                              <td>{donation.id}</td>

                              <td>{donation.donorName}</td>

                              <td>{donation.email}</td>

                              <td className="fw-bold text-success">
                                ₹ {donation.amount}
                              </td>

                              <td>{donation.paymentMethod}</td>

                              <td>{donation.donationDate}</td>

                            </tr>

                          ))

                        ) : (

                          <tr>

                            <td
                              colSpan="6"
                              className="text-center text-muted"
                            >
                              No Donations Found
                            </td>

                          </tr>

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

            {/* ===================== Events & Campaigns ===================== */}

            <div className="row mt-4">

              {/* Latest Events */}

              <div className="col-lg-6 mb-4">

                <div className="card shadow border-0 h-100">

                  <div className="card-header bg-warning">

                    <h5 className="mb-0 text-dark">
                      Latest Events
                    </h5>

                  </div>

                  <div className="card-body">

                    {events.length > 0 ? (

                      <ul className="list-group">

                        {events.slice(0, 5).map((event) => (

                          <li
                            key={event.id}
                            className="list-group-item"
                          >

                            <h6>{event.title}</h6>

                            <small className="text-muted">
                              📅 {event.date}
                            </small>

                            <br />

                            <small>
                              📍 {event.location}
                            </small>

                          </li>

                        ))}

                      </ul>

                    ) : (

                      <p className="text-muted">
                        No Events Available
                      </p>

                    )}

                  </div>

                </div>

              </div>

              {/* Latest Campaigns */}

              <div className="col-lg-6 mb-4">

                <div className="card shadow border-0 h-100">

                  <div className="card-header bg-success text-white">

                    <h5 className="mb-0">
                      Latest Campaigns
                    </h5>

                  </div>

                  <div className="card-body">

                    {campaigns.length > 0 ? (

                      <ul className="list-group">

                        {campaigns.slice(0, 5).map((campaign) => (

                          <li
                            key={campaign.id}
                            className="list-group-item"
                          >

                            <h6>{campaign.title}</h6>

                            <small>

                              🎯 Target :
                              ₹ {campaign.targetAmount}

                            </small>

                            <br />

                            <small>

                              ❤️ Raised :
                              ₹ {campaign.collectedAmount}

                            </small>

                            <br />

                            <span
                              className={`badge ${
                                campaign.status === "Active"
                                  ? "bg-success"
                                  : campaign.status === "Completed"
                                  ? "bg-primary"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {campaign.status}
                            </span>

                          </li>

                        ))}

                      </ul>

                    ) : (

                      <p className="text-muted">

                        No Campaigns Available

                      </p>

                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* ===================== Latest Feedback ===================== */}

            <div className="row">

              <div className="col-lg-12">

                <div className="card shadow border-0">

                  <div className="card-header bg-secondary text-white">

                    <h5 className="mb-0">
                      Latest Customer Feedback
                    </h5>

                  </div>

                  <div className="card-body table-responsive">

                    <table className="table table-hover">

                      <thead className="table-light">

                        <tr>

                          <th>Name</th>
                          <th>Email</th>
                          <th>Rating</th>
                          <th>Feedback</th>

                        </tr>

                      </thead>

                      <tbody>

                        {feedbacks.length > 0 ? (

                          feedbacks.slice(0, 5).map((item) => (

                            <tr key={item.id}>

                              <td>{item.name}</td>

                              <td>{item.email}</td>

                              <td>
                                ⭐ {item.rating}/5
                              </td>

                              <td>{item.message}</td>

                            </tr>

                          ))

                        ) : (

                          <tr>

                            <td
                              colSpan="4"
                              className="text-center text-muted"
                            >
                              No Feedback Available
                            </td>

                          </tr>

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

          </>
        )}

      </div>

    </>
  );
}

export default Reports;