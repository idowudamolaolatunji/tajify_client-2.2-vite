import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { BsBarChart } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";

function DropdownMenu({}) {
  const { logout } = useAuthContext();

  function handleLogout () {
		logout();

		// logging out
		setTimeout(() => {
      window.location.href = '/'
		}, 1000)
	}

  return (
    <div className="dropdown-menu shadow-2xl">
      <ul className="dropdown-list dropdown-list--top">
        <Link to="/profile">
          <li className="dropdown-item">
            <AiOutlineUser />
            <p>Profile</p>
          </li>
        </Link>
        <li className="dropdown-item">
          <VscLibrary />
          <p>Library</p>
        </li>
        <li className="dropdown-item">
          <BsBarChart />
          <p>Stats</p>
        </li>
        <Link to="">
          <li className="dropdown-item">
            <CiWallet />

            <p>Wallet</p>
          </li>
        </Link>

        <li className="dropdown-item" onClick={handleLogout}>
          <MdOutlineLogout  />

          <p>Logout</p>
        </li>
      </ul>

      <ul className="dropdown-list dropdown-list--bottom">
        <Link to="/settings">
          <li className="dropdown-item">
            <p>Settings</p>
          </li>
        </Link>
        <li className="dropdown-item">
          <p>Recommendation</p>
        </li>
        <li className="dropdown-item">
          <p>Publication</p>
        </li>
        <li className="dropdown-item">
          <p>Help Center</p>
        </li>
        <li className="dropdown-item">
          <p>Upgrade</p>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
