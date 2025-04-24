import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    branch: "", // Added branch field
    image: '',
    likes: 0
  });

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data to submit:", formData);

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    axios
      .post("http://localhost:4000/createEvent", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="font-bold text-4xl mb-8 text-gray-800">Post an Event</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
      >
        <div className="flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Title:</span>
            <input
              type="text"
              name="title"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Category:</span>
            <input
              type="text"
              name="optional"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.optional}
              onChange={handleChange}
              placeholder="Optional details"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Description:</span>
            <textarea
              name="description"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              rows="4"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Organized By:</span>
            <input
              type="text"
              name="organizedBy"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.organizedBy}
              onChange={handleChange}
              placeholder="Organizer name"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Event Date:</span>
            <input
              type="date"
              name="eventDate"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Event Time:</span>
            <input
              type="time"
              name="eventTime"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.eventTime}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Location:</span>
            <input
              type="text"
              name="location"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event location"
            />
          </label>

          {/* Branch Selection */}
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Select Branch:</span>
            <select
              name="branch"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.branch || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a branch</option>
              <option value="CSE">Computer Science & Engineering (CSE)</option>
              <option value="ME">Mechanical Engineering (ME)</option>
              <option value="Civil">Civil Engineering</option>
              <option value="EEE">Electrical & Electronics Engineering (EEE)</option>
              <option value="ECE">Electronics & Communication Engineering (ECE)</option>
              <option value="IT">Information Technology (IT)</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Image:</span>
            <input
              type="file"
              name="image"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleImageUpload}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
