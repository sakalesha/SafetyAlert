import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateAlert() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 📍 AUTO-GET GPS + REVERSE GEOCODE
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported on your device.");
      return;
    }

    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setForm((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lon,
        }));

        // Reverse Geocode using OpenStreetMap
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await res.json();

          setForm((prev) => ({
            ...prev,
            location: data.display_name || "Location detected",
          }));
        } catch (err) {
          console.log("Reverse geocoding error:", err);
        }

        setDetecting(false);
      },
      (err) => {
        alert("Location permission denied.");
        setDetecting(false);
      }
    );
  };

  // Run auto-detect when page loads
  useEffect(() => {
    detectLocation();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to post an alert!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append("media", file);

    try {
      await axios.post("https://guardianai-crp4.onrender.com/api/alerts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setTimeout(() => navigate("/user/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to post alert. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg w-96 border border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
          Post a Neighborhood Alert
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Alert Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Describe the situation..."
          rows="3"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            name="location"
            placeholder="Enter location or landmark"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="button"
            onClick={detectLocation}
            className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            {detecting ? "…" : "📍"}
          </button>
        </div>

        <input type="hidden" name="latitude" value={form.latitude} />
        <input type="hidden" name="longitude" value={form.longitude} />

        <div className="mb-3">
          <label className="block mb-1 font-semibold">Upload Image/Video</label>
          <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="w-full border p-2 rounded" />

          {preview && (
            <div className="mt-3">
              {file.type.startsWith("image/") ? (
                <img src={preview} alt="preview" className="w-full h-40 object-cover rounded" />
              ) : (
                <video src={preview} controls className="w-full h-40 rounded" />
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Submit Alert"}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-3">
            ✅ Alert posted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
