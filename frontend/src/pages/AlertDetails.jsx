import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AlertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://guardianai-crp4.onrender.com/api/alerts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Alert not found");
        }

        const data = await response.json();
        setAlert(data);
      } catch (error) {
        console.error("Error fetching alert:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlert();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading alert details...
      </div>
    );

  if (!alert)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p className="text-lg font-semibold">Alert not found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-6"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {alert.mediaUrl && (
          <img
            src={alert.mediaUrl}
            alt={alert.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{alert.title}</h1>

          <span
            className={`inline-block px-3 py-1 text-sm rounded mb-4 ${
              alert.severity === "High"
                ? "bg-red-500 text-white"
                : alert.severity === "Medium"
                ? "bg-yellow-400 text-gray-900"
                : "bg-green-400 text-gray-900"
            }`}
          >
            {alert.severity}
          </span>

          <p className="text-gray-700 leading-relaxed mb-3">
            {alert.description}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Reported on:</strong>{" "}
              {new Date(alert.timestamp).toLocaleString()}
            </p>

            <p>
              <strong>Location:</strong> {alert.location}
            </p>

            {alert.category && (
              <p>
                <strong>Category:</strong> {alert.category}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
