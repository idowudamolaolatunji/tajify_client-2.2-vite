function UserProfile() {
    return (
        <div>
          <i className='bell mr-5 flex justify-center items-center w-6 h-5 cursor-pointer'> <BsBell /> </i>
          <Link to = "/writers-profile" className="navbar__list--link">

          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-14 h-21 rounded-full"
              src={profilePhoto}
              alt="user photo"
            />

            
            {/* img*/}
          </button>
          </Link>
          <span className="ml-5 writers__name">
            Aselemi Divine
            </span>
          <i className='bell mr-5 flex justify-center items-center w-6 h-5 cursor-pointer'> <BsChevronDown /> </i>
        </div>
    )
}

export default UserProfile
