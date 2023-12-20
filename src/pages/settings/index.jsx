import React, { useState } from "react";
import "../settings/main.css";
// import SubHeader from "../../components/MainHeader";
import MainHeaderW from "../../components/MainHeaderW";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";


const Settings = () => {

  const { logout } = useAuthContext();

  const navigate = useNavigate(); // Access the history object

  // ... (existing code)

  const handleLogout = () => {
    logout(); // Call the logout function from your authentication context
    navigate("/"); // Redirect to the login page after logout
  };
  
  const options = [
    {
      header: {
        name: "Account",
      },
      values: [
        {
          name: "Profile",
          description: "Manage your account profile.",
          tags: [],
        },
        {
          name: "Security",
          description: "Update your account security settings.",
          tags: [],
        },
        {
          name: "Two-factor Authentication",
          description:
            "Enable to give your truly expenses account an extra layer of security.",
          tags: [],
        },
        {
          name: "SSH Keys",
          description: "Need help? Checkout our guide to generating SSH keys",
          tags: [],
        },
        {
          name: "Close Account",
          description: "Warning, Closing your account is irreversible",
          tags: [],
        },
      ],
    },
    {
      header: {
        name: "Applications",
      },
      values: [
        {
          name: "Third Party Services",
          description:
            "Grant truly expenses access to external accounts for auditional functionality.",
          tags: [],
        },
        {
          name: "App 2",
          description: "Manage Application 2.",
          tags: [],
        },
      ],
    },
    {
      header: {
        name: "Billing",
      },
      values: [
        {
          name: "Billing Information",
          description: "Manage your billing information.",
          tags: ["credit cards"],
        },
        {
          name: "Free Dyno Usage",
          description: "View statistics about your free plan usage.",
          tags: [],
        },
        {
          name: "Invoices",
          description: "Track your invoices and their statuses",
          tags: [],
        },
        {
          name: "Invoice Address",
          description: "Manage your invoice address.",
          tags: [],
        },
      ],
    },
    {
      header: {
        name: "Support",
      },
      values: [
        {
          name: "Help",
          description: "Having Trouble",
          tags: [],
        },
        {
          name: "FAQ",
          description: "Frequently Asked Questions",
          tags: [],
        },
        {
          name: "Contact Support",
          description: "Get in touch with our support team.",
          tags: [],
        },
      ],
    },
    {
      header: {
        name: "Logout",
      },
      values: [
        {
          name: "Logout",
          description: "Click to log out",
          tags: [],
        },
      ],
    },
  ];

  const [visibleOptions, setVisibleOptions] = useState(options);

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase().trim();
  
    if (value === "") {
      setVisibleOptions(options);
      return;
    }
  
    const returnedItems = [];
  
    visibleOptions.forEach((option, index) => {
      const foundOptions = option.values.filter((item) => {
        return (
          item.name.toLowerCase().includes(value) ||
          item.description.toLowerCase().includes(value)
        );
      });
  
      if (foundOptions.length > 0) {
        returnedItems[index] = {
          header: {
            name: option.header.name,
          },
          values: foundOptions,
        };
      }
    });
  
    setVisibleOptions(returnedItems.filter((item) => item)); // Filter out undefined items
  };
  

  // const onChange = (e) => {
  //   e.preventDefault();
  //   const value = e.target.value;
  //   console.log("value", value);

  //   if (value.trim().length === 0) {
  //     setVisibleOptions(options);
  //     return;
  //   }

  //   const returnedItems = [];

  //   visibleOptions.forEach((option, index) => {
  //     const foundOptions = option.values.filter((item) => {
  //       return (
  //         item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !==
  //           -1 ||
  //         item.description
  //           .toLocaleLowerCase()
  //           .search(value.trim().toLowerCase()) !== -1
  //       ); // Checking the string if it has any match
  //     });

  //     returnedItems[index] = {
  //       header: {
  //         name: option.header.name,
  //       },
  //       values: foundOptions,
  //     };

  //     if (
  //       option.header.name
  //         .toLocaleLowerCase()
  //         .search(value.trim().toLowerCase()) !== -1
  //     ) {
  //       returnedItems[index] = {
  //         header: {
  //           name: option.header.name,
  //         },
  //         values: options[index],
  //       };
  //     }
  //   });

  //   setVisibleOptions(returnedItems);
  // };

  return (
    <div>
      {/* <div className="header__style">
        <Navbar />
      </div> */}
      <MainHeaderW />
      <div className="section__container--2 max-w-md mt-10 mx-auto px-4">
        {/* <div className="section__container--3"> */}

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-5">
          <span className="flex items-center">
            <Link to="/profile">
              <button className="custom__tab__bg__ bg-green-600 text-white px-3 py-1 mr-2">
                <span>Back</span>
              </button>
            </Link>
            Settings
          </span>
        </h1>
        <input
          type="text"
          className="border rounded-lg p-4 mt-7 text-lg md:text-xl w-full"
          placeholder="Search"
          onChange={onChange}
        />

        <div>
          {visibleOptions.map((option) => (
            <div key={option.header.name} className="mt-5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
                {option.header.name}
              </h3>

              <div className="mt-10 mb-10">
                {option.values.map((value) => (
                  <div key={value.name} className="mt-10 mb-10 cursor-pointer">
                    <ul className="border border-gray-300 rounded-lg mb-2 p-3">
                      <li className="mb-2">
                        <h6 className="font-semibold text-lg md:text-xl lg:text-2xl">
                          {value.name}
                        </h6>
                        <p>{value.description}</p>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
           <div className="mt-5">
            <div className="mt-10">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
