/** @format */
import { useState, useEffect } from "react";

const Stcards = () => {
  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      const userEmail = localStorage.getItem("StudentEmail");

      if (!userEmail) {
        console.error("User email not found in localStorage.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/Complaints/user/${userEmail}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMyComplaints(data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchUserComplaints();
  }, []);

  const totalCount = myComplaints.length;

  const resolvedCount = myComplaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const rejectedCount = myComplaints.filter(
    (complaint) => complaint.status === "Rejected"
  ).length;

  const pendingCount = myComplaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  return (
    <>
      {/* all complaint card */}
      <div
        className="card text-bg-primary mb-3"
        style={{
          cursor: "pointer",
          minWidth: "18rem",
          maxWidth: "18rem",
          minHeight: "9rem",
          maxHeight: "9rem",
          position: "absolute",
          left: "330px",
          top: "130px",
        }}
      >
        <div className="card-header">All Complaint</div>
        <div className="card-body">
          <h5 className="card-title">
            Your Total Complaint: <br />
            <br />
            {totalCount}
          </h5>
        </div>
      </div>

      {/* resolved complaint card */}
      <div
        className="card text-bg-success mb-3"
        style={{
          cursor: "pointer",
          minWidth: "18rem",
          maxWidth: "18rem",
          minHeight: "9rem",
          maxHeight: "9rem",
          position: "absolute",
          left: "650px",
          top: "130px",
        }}
      >
        <div className="card-header">Resolved Complaint</div>
        <div className="card-body">
          <h5 className="card-title">
            Your Resolved Complaint: <br />
            <br />
            {resolvedCount}
          </h5>
        </div>
      </div>

      {/* all rejected card */}
      <div
        className="card text-bg-danger mb-3"
        style={{
          cursor: "pointer",
          minWidth: "18rem",
          maxWidth: "18rem",
          minHeight: "9rem",
          maxHeight: "9rem",
          position: "absolute",
          left: "330px",
          top: "300px",
        }}
      >
        <div className="card-header">Rejected Complaint</div>
        <div className="card-body">
          <h5 className="card-title">
            Your Rejected Complaint: <br />
            <br />
            {rejectedCount}
          </h5>
        </div>
      </div>

      {/* pending complaint card */}
      <div
        className="card text-bg-warning mb-3"
        style={{
          cursor: "pointer",
          minWidth: "18rem",
          maxWidth: "18rem",
          minHeight: "9rem",
          maxHeight: "9rem",
          position: "absolute",
          left: "650px",
          top: "300px",
        }}
      >
        <div className="card-header">Pending Complaint</div>
        <div className="card-body">
          <h5 className="card-title">
            Your Pending Complaint: <br />
            <br />
            {pendingCount}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Stcards;
