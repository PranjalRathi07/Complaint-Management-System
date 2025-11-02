import { useEffect, useState } from "react";
import GraphView from "./graphview.jsx";

const AdminCard = () => {
  const [counts, setCounts] = useState({
    total: 0,
    resolved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Complaints");
        if (!response.ok) {
          throw new Error("Data fetching failed");
        }
        const allComplaints = await response.json();
        const totalCount = allComplaints.length;
        const resolvedCount = allComplaints.filter(
          (c) => c.status === "Resolved"
        ).length;
        const rejectedCount = allComplaints.filter(
          (c) => c.status === "Rejected"
        ).length;
        const pendingCount = allComplaints.filter(
          (c) => c.status === "Pending"
        ).length;

        setCounts({
          total: totalCount,
          resolved: resolvedCount,
          rejected: rejectedCount,
          pending: pendingCount,
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchComplaintData();
  }, []);

  return (
    <>
      {/* all complaint card */}
      <div
        className="card text-bg-primary mb-3"
        style={{
          cursor: "pointer",
          minWidth: "10rem",
          maxWidth: "10rem",
          minHeight: "6rem",
          maxHeight: "7rem",
          position: "absolute",
          left: "350px",
          top: "130px",
        }}
      >
        <div className="card-header">Total No. Complaint</div>
        <div className="card-body">
          <h5 className="card-title">{counts.total}</h5>
        </div>
      </div>

      {/* resolved complaint card */}
      <div
        className="card text-bg-success mb-3"
        style={{
          cursor: "pointer",
          minWidth: "10rem",
          maxWidth: "10rem",
          minHeight: "6rem",
          maxHeight: "7rem",
          position: "absolute",
          left: "350px",
          top: "372px",
        }}
      >
        <div className="card-header">Resolved Complaint</div>
        <div className="card-body">
          <h5 className="card-title">{counts.resolved}</h5>
        </div>
      </div>

      {/* all rejected card */}
      <div
        className="card text-bg-danger mb-3"
        style={{
          cursor: "pointer",
          minWidth: "10rem",
          maxWidth: "10rem",
          minHeight: "6rem",
          maxHeight: "7rem",
          position: "absolute",
          left: "350px",
          top: "250px",
        }}
      >
        <div className="card-header">Rejected Complaint</div>
        <div className="card-body">
          <h5 className="card-title">{counts.rejected}</h5>
        </div>
      </div>

      {/* pending complaint card */}
      <div
        className="card text-bg-warning mb-3"
        style={{
          cursor: "pointer",
          minWidth: "10rem",
          maxWidth: "10rem",
          minHeight: "7rem",
          maxHeight: "7rem",
          position: "absolute",
          left: "350px",
          top: "494px",
        }}
      >
        <div className="card-header">Peanding Complaint</div>
        <div className="card-body">
          <h5 className="card-title">{counts.pending}</h5>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "100px",
          color: "#E5E5E5",
        }}
      >
        <GraphView />
      </div>
    </>
  );
};

export default AdminCard;
