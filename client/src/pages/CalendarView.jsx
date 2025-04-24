import axios from "axios";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from "date-fns";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Create empty cells for alignment
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div key={`empty-${index}`} className="p-2 bg-gray-100 border border-gray-300"></div>
  ));

  return (
    <div className="p-4 md:mx-16">
      {/* Calendar Header */}
      <div className="rounded p-4 bg-white shadow-md">
        <div className="flex items-center mb-4 justify-center gap-6">
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            onClick={() => setCurrentMonth((prevMonth) => addMonths(prevMonth, -1))}
          >
            <BsCaretLeftFill className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-xl font-semibold text-gray-800">{format(currentMonth, "MMMM yyyy")}</span>
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            onClick={() => setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))}
          >
            <BsFillCaretRightFill className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 font-semibold bg-gray-200 text-gray-700 border border-gray-300">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {emptyCells.concat(
            daysInMonth.map((date) => (
              <div
                key={date.toISOString()}
                className="p-2 relative pb-20 sm:pb-24 border border-gray-300 bg-white flex flex-col items-start justify-start"
              >
                {/* Day Number */}
                <div className="font-bold text-gray-800">{format(date, "dd")}</div>

                {/* Events */}
                <div className="absolute top-8 left-2 right-2">
                  {events
                    .filter(
                      (event) =>
                        format(new Date(event.eventDate), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                    )
                    .map((event) => (
                      <div key={event._id} className="mt-1">
                        <Link to={`/event/${event._id}`}>
                          <div className="text-white bg-blue-500 rounded p-1 font-bold text-xs md:text-sm hover:bg-blue-600 transition">
                            {event.title.toUpperCase()}
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}