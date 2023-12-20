// import React from 'react';
// import { AiOutlineInstagram, AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';
// import { BsPinterest } from 'react-icons/bs'
// import WhiteLogo from '../assets/images/pngs/logo-complete-white.png'
// import { Link } from 'react-router-dom';

// function Footer() {
//     return (
//         <footer className='footer'>
//             <div className="footer__container">
//                 <div className="cta">
//                     <h2 className="cta__subscribe-text">Subcribe to our newletter</h2>
//                     <form action="" className="cta__form">
//                         <input type="text" name="cta-name" id="cta__name" className="cta__input" placeholder='Name' />
//                         <input type="email" name="cta-email" id="cta__email" className="cta__input" placeholder='Enter your Email' />
//                         <button className='cta__button'>Send</button>
//                     </form>
//                 </div>

//                 <div className="links-n-socials">
//                     <ul className="links__list">
//                         <li><Link to={'/'} className="links__link">About Us</Link></li>
//                         <li><Link to={'/'} className="links__link">How It Works</Link></li>
//                         <li><Link to={'/'} className="links__link">FAQ</Link></li>
//                         <li><Link to={'/'} className="links__link">Creators</Link></li>
//                     </ul>
//                     <ul className="socials__icons">
//                         <li><a href="#" className="social__icon--links"><AiOutlineInstagram /></a></li>
//                         <li><a href="#" className="social__icon--links"><AiFillFacebook /></a></li>
//                         <li><a href="#" className="social__icon--links"><AiFillTwitterSquare /></a></li>
//                         <li><a href="#" className="social__icon--links"><BsPinterest /></a></li>
//                     </ul>
//                 </div>
//                 <div className="logo-n-copyright">
//                     <span className="footer__logo">
//                         <img src={WhiteLogo} alt='footer logo' />
//                     </span>
//                     <span className="footer__copyright">
//                         <p className="footer__copyright--text">© 2023 Tajify. All right reserved.</p>
//                         <ul className="footer__copyright--links">
//                             <li><Link to={'/'} className="footer__copyright--link">Privacy Policy</Link></li>
//                             <li><Link to={'/'} className="footer__copyright--link">Terms of Service</Link></li>
//                         </ul>
//                     </span>
//                 </div>
//             </div>
            
//         </footer>
//     )
// }

// export default Footer;

import React, { useState } from "react";
import { SlSocialYoutube, SlSocialInstagram } from "react-icons/sl";
import { RiFacebookCircleLine } from "react-icons/ri";
import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineTwitter } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import As from "../assets/images/pngs/appstore.png";
import Logo from '../assets/images/pngs/logo-complete-white.png'
import Gp from "../assets/images/pngs/googleplay.png";
import MainSpinner from "./MainSpinner";
import Alert from "./Alert";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


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
      <div>
        <div className="footer-contaner bg-[#008001] py-[54px]">
          <div className="footer-content-box max-w-[1440px] mx-auto">
            <div className=" lg:flex px-3 lg:px-[50px] lg:justify-center">
              <div className="logo-social lg:mr-[100px]">
                <a href="/">
                  <img src={Logo} className="h-[60px] max-sm:h-[40px] max-sm:mb-4 lg:my-6" />
                </a>
                
                <div className="social-div lg:pl-[30px]">
                  <h3 className="text-white mb-3 max-sm:text-xs">JOIN US ON</h3>
                  <div className="social-logos flex gap-4">
                    <a href="http://youtube.com/tajify Marketmarketng">
                    <SlSocialYoutube color="white" size={20} />
                    </a>

                    <a href="http://facebook.com/tajify Marketmarketng">
                    <RiFacebookCircleLine color="white" size={20} />
                    </a>

                    <a href="http://instagram.com/tajify Marketmarketng">
                    <SlSocialInstagram color="white" size={20} />
                    </a>

                    <a href="http://twitter.com/tajify Marketmarketng">
                    <AiOutlineTwitter color="white" size={20} />
                    </a>
                    
                    
                    
                    
                  </div>
                </div>
              </div>

              <div className="newsletter py-8 lg:mr-[184px]">
                <form className="nav-search-box my-auto flex mr-[0px]" onSubmit={handleSubmit}>
                  <div className="input-container relative mr-[6px]">
                    <GoMail className="absolute right-3 top-5" size={20} />
                    <input
                      type="text"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-[12px] pl-[15px] rounded-[5px] lg:w-[325px]"
                    />
                  </div>

                  <div className="nav-search-btn">
                    <button type="submit" className="py-[12px] px-[20.5px] bg-[#FF0066] rounded-[5px] text-white">
                      Subscribe
                    </button>
                  </div>
                </form>
                <div className="news-text mt-[23px]">
                  <h3 className="uppercase font-semibold mb-3 text-white">
                    new to Tajify Market?
                  </h3>
                  <p className="text-white">
                    Subscribe to our newletter to get updates on our latest
                    offers!
                  </p>
                </div>
              </div>

              <div className="app-btns py-8">
                <div className="app-imgs flex gap-2">
                  <img src={As} alt="" className="h-[35px]" />
                  <img src={Gp} alt="" className="h-[35px]" />
                </div>
                <div className="app-btn-texts mt-[23px]">
                  <h3 className="uppercase font-semibold mb-3 text-white">
                    Download Tajify Market free app
                  </h3>
                  <p className="text-white">Get access to exclusive offers!</p>
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
};

export default Footer;

