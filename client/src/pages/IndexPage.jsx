import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  //! Fetch events from the server ---------------------------------------------------------------
  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  //! Like Functionality --------------------------------------------------------------
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, likes: event.likes + 1 }
              : event
          )
        );
        console.log("Like added successfully", response);
      })
      .catch((error) => {
        console.error("Error liking the event:", error);
      });
  };

  return (
    <>
    <div className="mt-1 flex flex-col">
  {/* Hero Section */}
  <div className="hidden sm:block">
    <div className="flex items-center inset-0">
      <img
        src="../src/assets/hero.jpg"
        alt="Hero"
        className="w-full h-[300px] object-cover rounded-lg shadow-md"
      />
    </div>
  </div>

  {/* Events Grid */}
  <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
    {/* Check if there are events */}
    {events.length > 0 &&
      events.map((event) => {
        const eventDate = new Date(event.eventDate);
        const currentDate = new Date();

        //! Check if the event date is passed or not
        if (
          eventDate > currentDate ||
          eventDate.toDateString() === currentDate.toDateString()
        ) {
          return (
            <div
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              key={event._id}
            >
              {/* Event Image */}
              <div className="rounded-t-xl overflow-hidden">
                {event.image ? (
                  <img
                    src={`http://localhost:4000/api/${event.image}`}
                    alt={event.title}
                    className="w-full h-[200px] object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "../src/assets/paduru.png"; // Fallback image
                    }}
                  />
                ) : (
                  <img
                    src="../src/assets/paduru.png"
                    alt="Default"
                    className="w-full h-[200px] object-cover"
                  />
                )}
                {/* Like Button */}
                <div className="absolute flex gap-4 bottom-4 right-4">
                  <button
                    onClick={() => handleLike(event._id)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
                  >
                    <BiLike className="w-6 h-6 text-primarydark" />
                  </button>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg text-gray-800">
                    {event.title.toUpperCase()}
                  </h1>
                  <div className="flex items-center gap-1 text-red-600">
                    <BiLike />
                    {event.likes}
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <div>
                    {event.eventDate.split("T")[0]}, {event.eventTime}
                  </div>
                  {/* Branch */}
                  <div>
                    <strong>Branch:</strong> {event.branch || "Not specified"}
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    Organized By:{" "}
                    <span className="font-bold">{event.organizedBy}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Created By:{" "}
                    <span className="font-semibold">
                      {event.owner.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Book Ticket Button */}
                <Link to={"/event/" + event._id} className="flex justify-center mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition duration-300">
                    Enroll Now
                    <BsArrowRightShort className="w-6 h-6" />
                  </button>
                </Link>
              </div>
            </div>
          );
        }
        return null;
      })}
  </div>
</div>

    </>
  );
}
