/** @format */
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const GraphView = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Complaints");
        if (!response.ok) {
          throw new Error("Data fetching failed");
        }
        const allComplaints = await response.json();

        const subjectCounts = {};
        allComplaints.forEach((complaint) => {
          const subject = complaint.Subject || "Uncategorized";
          subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
        });

        const data = {
          labels: Object.keys(subjectCounts),
          datasets: [
            {
              label: "Number of Complaints",
              data: Object.values(subjectCounts),
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
                "rgba(199, 199, 199, 0.7)",
                "rgba(83, 102, 255, 0.7)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(199, 199, 199, 1)",
                "rgba(83, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchComplaintData();
  }, []);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        margin: "auto",
        paddingTop: "20px",
        position: "absolute",
        left: "560px",
        top: "100px",
      }}
    >
      <h3 style={{ textAlign: "center", fontSize: "3rem" }}>
        Complaints by Subject
      </h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default GraphView;
