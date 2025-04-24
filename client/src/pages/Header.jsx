import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from 'react-icons/rx';
import { BsFillCaretDownFill } from 'react-icons/bs';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchInputRef = useRef();
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  async function logout() {
    await axios.post('/logout');
    setUser(null);
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEvents = events.filter(event => {
    const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <header className='flex py-2 px-6 sm:px-6 justify-between place-items-center'>

        <Link to={'/'} className="flex item-center ">
          <img src="../src/assets/logo.png" alt="logo" className='w-26 h-9' />
        </Link>

        {/* Category Filter Buttons */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="NSS">NSS</option>
          <option value="Sports">Sports</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Seminar">Seminar</option>
          <option value="Cultural Fest">Cultural Fest</option>
        </select>

        {/* Search Bar */}
        <div className='flex bg-white rounded py-2.5 px-4 w-1/3 gap-4 items-center shadow-md shadow-gray-200'>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <div ref={searchInputRef}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className='text-sm text-black outline-none w-full'
            />
          </div>
        </div>

        {/* Search Result */}
        {searchQuery && (
          <div className="p-2 w-144 z-10 absolute rounded left-[28.5%] top-14 md:w-[315px] md:left-[17%] md:top-16 lg:w-[540px] lg:left-[12%] lg:top-16 bg-white max-h-60 overflow-y-auto shadow-md">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event._id} className="p-2 hover:bg-gray-100 rounded">
                  <Link to={"/event/" + event._id}>
                    <div className="text-black text-base">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.category}</div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 p-2">No events found</div>
            )}
          </div>
        )}

        <Link to={'/createEvent'}>
          <div className='hidden md:flex flex-col place-items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-1500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 stroke-3 py-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <div className='font-bold text-sm'>Create Event</div>
          </div>
        </Link>

        <div className="hidden lg:flex gap-5 text-sm">
  <Link to="/calendar" aria-label="Go to Calendar">
    <div className="flex flex-col items-center py-2 px-4 rounded-md cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-md transition duration-300 ease-in-out">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 mb-1"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-xs font-medium">Calendar</span>
    </div>
  </Link>
</div>




        <div>
          <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 transition-shadow duration-1500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 py-1">
              <path d="M..." />
            </svg>
          </div>
        </div>

        {!!user && (
          <div className="flex flex-row items-center gap-2 sm:gap-8">
            <div className="flex items-center gap-2">
              <Link to={'/useraccount'}>
                {user.name.toUpperCase()}
              </Link>
              <BsFillCaretDownFill className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all" onClick={() => setisMenuOpen(!isMenuOpen)} />
            </div>
            <div className="hidden md:flex">
              <button onClick={logout} className="secondary flex items-center gap-1">
                <div>Log out</div>
                <RxExit />
              </button>
            </div>
          </div>
        )}

        {!user && (
          <Link to={'/login'}>
            <button className="primary">
              <div>Sign in</div>
            </button>
          </Link>
        )}

        {!!user && (
          <div className={`absolute z-10 mt-64 flex flex-col w-48 bg-white right-2 md:right-[160px] rounded-lg shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col font-semibold text-[16px]">
              <Link className="hover:bg-background hover:shadow py-2 pt-3 pl-6 pr-8 rounded-lg" to={'/createEvent'}>Create Event</Link>
              <Link className="hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/verification'}>Center</Link>
              <Link className="hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/calendar'}>Calendar</Link>
              <button className="hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg text-left" onClick={logout}>Log out</button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
