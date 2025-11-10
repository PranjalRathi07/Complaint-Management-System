import { useState, useEffect } from "react";
import FuzzyText from "../animetion/FuzzyText.jsx";

const ComplaintTable = () => {
  const [Complaints, setComplaints] = useState([]);

  const tableStyle = {
    tableLayout: "fixed",
    width: "100%",
  };
  const cellStyle = {
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
  };
  const complaintCellStyle = {
    ...cellStyle,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Complaints");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          setComplaints(result);
        } else {
          console.error("Unexpected response format:", result);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        alert("Failed to fetch complaints. Please try again later.");
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/Complaints/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === id
              ? { ...complaint, status: newStatus }
              : complaint
          )
        );
      } else {
        alert("Failed to update status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. See console for details.");
    }
  };

  const getRowClassName = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "Resolved":
        return "bg-success text-white";
      case "Rejected":
        return "bg-danger text-white";
      default:
        return "";
    }
  };

  return (
    <div
      className="row mb-3 text-center"
      style={{
        maxWidth: "1060px",
        position: "absolute",
        paddingBottom: "10px",
        top: "120px",
        left: "300px",
      }}
    >
      {Complaints.length > 0 ? (
        <table className="table" style={tableStyle}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Class & Section
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Subject
              </th>
              <th scope="col" style={{ width: "30%" }}>
                Complaint
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Date
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Complaints.map((complaint) => {
              const rowClass = getRowClassName(complaint.status);
              return (
                <tr key={complaint._id}>
                  <td style={cellStyle} className={rowClass}>
                    {" "}
                    {complaint.name}
                  </td>
                  <td style={cellStyle} className={rowClass}>
                    {" "}
                    {complaint.classSec}
                  </td>
                  <td style={cellStyle} className={rowClass}>
                    {" "}
                    {complaint.Subject}
                  </td>
                  <td
                    style={complaintCellStyle}
                    className={rowClass}
                    title={complaint.complaint}
                  >
                    {" "}
                    {complaint.complaint}
                  </td>
                  <td style={cellStyle} className={rowClass}>
                    {" "}
                    {new Date(complaint.date).toLocaleDateString()}
                  </td>
                  <td style={cellStyle} className={rowClass}>
                    <select
                      className="form-select form-select-sm"
                      value={complaint.status}
                      onChange={(e) =>
                        handleStatusChange(complaint._id, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div style={{ position: "absolute", top: "200px", left: "80px" }}>
          <FuzzyText
            fontSize="clamp(2rem, 3vw, 3rem)"
            fontWeight={900}
            color="#14213d"
            hoverIntensity={0.6}
            baseIntensity={0.2}
          >
            No Complaints Register.
          </FuzzyText>
        </div>
      )}
    </div>
  );
};
export default ComplaintTable;
