import { Link, useNavigate   } from 'react-router-dom'
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser } from "react-icons/fa";
import logo from "/logo-black-2.png"
import { useState } from 'react';
const Navbar = ({ username }) => {
  // const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { title: "Fiction", path: "/" },
    { title: "Mystery/Thriller", path: "/" },
    { title: "Science Fiction/Fantasy", path: "/" },
    { title: "Romance", path: "/" },
    { title: "Horror", path: "/" },
    { title: "Historical", path: "/" },
    { title: "Adventure", path: "/" },

  ]

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const login = async () => {
    const url = "/api/v1/api/access/set-session";
    const data = {username: "Vuong Pham", token: "token-key-123456"}
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "159fe76366a62f33a329e9709ed117f680280458db1ea73580a66e456bca4d90f0d1ffeb24344b63115fa9f0293f3992e758076d27fd594393e9204fe8874ee1",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log('session data::', responseData);
    if(responseData.status === 'ok') {
      // console.log("go to home page");
      // navigate('/', { replace: true });
      window.location.reload();
    }
  }

  return (
    <header className="max-x-screen-2x1 xl:px-28 px-4 absolute top-0 right-0 left-0">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">

        <FaSearch className="text-Black w-5 h-5 cursor-pointer hidden md:block" />
        {/* logo */}
        <a href="/"><img src={logo} alt="" className="w-20 h-20" /></a>

        {/* Account and Shopping */}
        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          <a className="flex items-center gap-2" onClick={login}>
            {username === 'Guest' || username === 'Account' || username === '' ? (
              <>
                <FaUser /> {username}
              </>
            ) : (
              <>
                {username}
              </>
            )}
          </a>
          <a href="#" className="flex items-center gap-2"><FaShoppingBag />Shopping</a>
        </div>

        {/* navbar for sm devices */}
        <div className="sm:hidden">
          <button
            onClick={toggleIsMenuOpen}
            className=""
          >
            {isMenuOpen ? <FaTimes className="w-5 h-5 text-Black" /> : <FaBars className="w-5 h-5 text-Black" />}
          </button>
        </div>
      </nav>

      <hr />
      {/* categories items */}
      <div className="pt-4">
        <ul className="lg:flex items-center justify-between text-Black hidden">
          {
            navItems.map(({ title, path }) => (
              <li key={title} className="hover:text-orange-500">
                <Link to={path}>{title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
      {/* only mobile menu items */}
      <div>
        <ul className={`bg-Black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}>
          {
            navItems.map(({ title, path }) => (
              <li key={title} className="hover:text-orange-500 my-3 cursor-pointer">
                <Link to={path}>{title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </header>
  )
}

export default Navbar