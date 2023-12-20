import HeroImg from "../assets/images/hero-img/photo1.png";
import HeroImg4 from "../assets/images/hero-img/photo4.png";
import HeroImg5 from "../assets/images/hero-img/photo5.png";
import HeroImg3 from "../assets/images/hero-img/photo3.png";
// import Shield from '../components/svgs/Ellipse';
import { AiOutlineSearch } from "react-icons/ai";
import Shield from "./svgs/Shield";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import Typed from "react-typed";
import { HOST_URL } from "../assets/js/help_func";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], blogs: [] });
  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${HOST_URL()}/users/search?q=${searchTerm}`
        // `https://api.tajify.com/api/users/search?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="hero__section">
      <div className="section__container">
        <div className="hero">
          <div className="hero__text--box">
            <h1 className="heading__primary">
              Find the perfect
              {/* <span className="hero--extra"> creative service </span> */}
              <span > creative service </span>
              for your path to  <br></br>
              <Typed
                  strings={[" Success.", " Wealth.", " Accomplishment."]}
                  typeSpeed={50}
                  backSpeed={70}
                  loop
                  className="hero--extra"
                />
              
            </h1>
            <h4 className="heading__description">
              Discover the Ideal Platform Designed to Assist You in Finding
              Creative Services Tailored to Your Path to Success. &nbsp;
              <span className="hero--extra">
                Unleash Your Content, Skills, Knowledge, Passion, Followership, and Writing Abilities.
               
              </span>
            </h4>
            <form className="hero__form">
              <i className="hero__form--icon">
                <AiOutlineSearch />
              </i>
              <input
                className="hero__form--input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="hero__form--btn"
                type="button"
              >
                Search
              </button>
            </form>

            <div className="hero__stats">
              <Shield />
              <Stat figure="1M+" text="services" />
              <Stat figure="1200+" text="Active users" />
            </div>
            {/* <div>
              <h2>Users:</h2>
              <ul>
                {searchResults.users && searchResults.users.length > 0 ? (
                  searchResults.users.map((user) => (
                    <li key={user._id}>{user.username}</li>
                  ))
                ) : (
                  <li>No users found.</li>
                )}
              </ul>
              <h2>Blogs:</h2>
              <ul>
                {searchResults.blogs && searchResults.blogs.length > 0 ? (
                  searchResults.blogs.map((blog) => (
                    <li key={blog._id}>
                      <h3>{blog.title}</h3>
                      <p>{blog.content}</p>
                    </li>
                  ))
                ) : (
                  <li>No blogs found.</li>
                )}
              </ul>
            </div> */}

            {/* <div>
              <h2>Users:</h2>
              <ul>
                {searchResults.users.map((user) => (
                  <li key={user._id}>{user.username}</li>
                ))}
              </ul>
              <h2>Blogs:</h2>
              <ul>
                {searchResults.blogs.map((blog) => (
                  <li key={blog._id}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          <div className="embla hero__images--box" ref={emblaRef}>
            <div className="embla__container">
              <div className="embla__slide ">
                <img
                  src={HeroImg}
                  alt="hero photo tajify"
                  className="hero__image"
                />
              </div>
              <div className="embla__slide ">
                <img
                  src={HeroImg4}
                  alt="hero photo tajify"
                  className="hero__image"
                />
              </div>
              <div className="embla__slide ">
                <img
                  src={HeroImg5}
                  alt="hero photo tajify"
                  className="hero__image"
                />
              </div>
              <div className="embla__slide ">
                <img
                  src={HeroImg3}
                  alt="hero photo tajify"
                  className="hero__image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ figure, text }) {
  return (
    <div className="stat">
      <p className="stat--figure">{figure}</p>
      <p className="stat--text">{text}</p>
    </div>
  );
}

export default Hero;
