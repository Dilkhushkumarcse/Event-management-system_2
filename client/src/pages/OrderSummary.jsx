import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';

export default function OrderSummary() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/event/${id}/ordersummary`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
      });
  }, [id]);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <Link to={`/event/${event._id}`}>
        <button
          className="inline-flex mt-12 gap-2 p-3 ml-12 bg-gray-100 justify-center items-center text-blue-700 font-bold rounded-md hover:bg-gray-200 transition"
        >
          <IoMdArrowBack className="font-bold w-6 h-6" />
          Back
        </button>
      </Link>

      <div className="flex flex-col md:flex-row justify-center mt-8 gap-8 px-4 md:px-16">
        {/* Terms & Conditions Section */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4">
          <h2 className="text-left font-bold text-lg text-gray-800 mb-4">Terms & Conditions</h2>
          <ul className="list-disc pl-6 text-sm text-gray-600 space-y-3">
            <li>
              Refunds will be provided for ticket cancellations made up to 14 days before the event date. After this period, no refunds will be issued. To request a refund, please contact our customer support team.
            </li>
            <li>
              Tickets will be delivered to your registered email address as e-tickets. You can print the e-ticket or show it on your mobile device for entry to the event.
            </li>
            <li>
              Each individual is allowed to purchase a maximum of 2 tickets for this event to ensure fair distribution.
            </li>
            <li>
              In the rare event of cancellation or postponement, attendees will be notified via email. Refunds will be automatically processed for canceled events.
            </li>
            <li>
              Tickets for postponed events will not be refunded and the ticket will be considered a valid ticket on the date of postponement.
            </li>
            <li>
              Your privacy is important to us. Our privacy policy outlines how we collect, use, and protect your personal information. By using our app, you agree to our privacy policy.
            </li>
            <li>
              Before proceeding with your ticket purchase, please review and accept our terms and conditions, which govern the use of our app and ticketing services.
            </li>
          </ul>
        </div>

        {/* Booking Summary Section */}
        <div className="bg-blue-100 shadow-md rounded-lg p-6 w-full md:w-1/4">
          <h2 className="font-bold text-lg text-gray-800 mb-4">Booking Summary</h2>
          <div className="text-sm flex justify-between mb-4">
            <div className="text-left">{event.title}</div>
            <div className="text-right">LKR. {event.ticketPrice}</div>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="text-sm font-bold flex justify-between mb-4">
            <div className="text-left">SUB TOTAL</div>
            <div className="text-right">LKR. {event.ticketPrice}</div>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <input
              className="h-5 w-5"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <div className="text-sm">
              I have verified the Event name, date, and time before proceeding to payment. I accept terms and conditions.
            </div>
          </div>
          <div className="flex justify-center">
            <Link to={`/event/${event._id}/ordersummary/paymentsummary`}>
              <button
                className={`mt-5 p-3 w-full text-white font-bold rounded-md ${
                  isCheckboxChecked ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'
                } transition`}
                disabled={!isCheckboxChecked}
              >
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}