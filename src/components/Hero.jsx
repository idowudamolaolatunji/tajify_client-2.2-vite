import HeroImg from "../assets/images/hero-img/photo1.png";
import HeroImg4 from "../assets/images/hero-img/photo4.png";
import HeroImg5 from "../assets/images/hero-img/photo5.png";
import HeroImg3 from "../assets/images/hero-img/photo3.png";
import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import Shield from "./svgs/Shield";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import Typed from "react-typed";
import { HOST_URL } from "../assets/js/help_func";
import Alert from "./Alert";
import MainSpinner from "./MainSpinner";

const timeout = 2000;

function Hero() {
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  // HANDLE FETCH STATE RESET
  function handleReset() {
    setIsError(false);
    setMessage('')
    setIsSuccess(false);
    setMessage();
  }

  // HANDLE ON FETCH FAILURE
  function handleFailure(mess) {
    setIsError(true);
    setMessage(mess)
    setTimeout(() => {
      setIsError(false);
      setMessage('')
    }, timeout);
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      handleReset();
      setIsLoading(true);

      const res = await fetch('https://api.tajify.com/api/search/subscribe-newsletter', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });
      if(!res.ok) throw new Error('Something Went Wrong!');
      const data = await res.json();
      console.log(data)

      if(data.status !== 'success') {
          throw new Error(data.message);
      }
      setIsSuccess(true);
      setMessage(data.message)
      setTimeout(async function() {
        setIsSuccess(false);
        setMessage('');
      }, 1500);
    } catch(err) {
      handleFailure(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <MainSpinner />}
      <div className="hero__section">
        <div className="section__container">
          <div className="hero">
            <div className="hero__text--box">
              <h1 className="heading__primary">
                Find the perfect
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
                Discover the Ideal Platform Designed to Assist You in Finding Creative Services Tailored to Your Path to Success. &nbsp;
                <span className="hero--extra"> Unleash Your Content, Skills, Knowledge, Passion, Followership, and Writing Abilities.</span>
              </h4>
              <form className="hero__form" onSubmit={handleSubmit}>
                <input
                  className="hero__form--input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Signup for newsletter"
                />
                <button
                  // onClick={handleSearch}
                  className="hero__form--btn"
                  type="submit"
                  
                >
                  Subscribe
                </button>
              </form>

              <div className="hero__stats">
                <Shield />
                <Stat figure="1M+" text="services" />
                <Stat figure="1200+" text="Active users" />
              </div>
            
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

      <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
				{isSuccess ? (
					<AiFillCheckCircle className="alert--icon" />
				) : isError ? (
					<AiFillExclamationCircle className="alert--icon" />
				) : (
					""
				)}
				<p>{message}</p>
			</Alert>
    </>
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
