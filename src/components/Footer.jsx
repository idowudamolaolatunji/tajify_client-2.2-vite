import React from 'react';
import { AiOutlineInstagram, AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs'
import WhiteLogo from '../assets/images/pngs/logo-complete-white.png'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='footer'>
            <div className="footer__container">
                <div className="cta">
                    <h2 className="cta__subscribe-text">Subcribe to our newletter</h2>
                    <form action="" className="cta__form">
                        <input type="text" name="cta-name" id="cta__name" className="cta__input" placeholder='Name' />
                        <input type="email" name="cta-email" id="cta__email" className="cta__input" placeholder='Enter your Email' />
                        <button className='cta__button'>Send</button>
                    </form>
                </div>

                <div className="links-n-socials">
                    <ul className="links__list">
                        <li><Link to={'/'} className="links__link">About Us</Link></li>
                        <li><Link to={'/'} className="links__link">How It Works</Link></li>
                        <li><Link to={'/'} className="links__link">FAQ</Link></li>
                        <li><Link to={'/'} className="links__link">Creators</Link></li>
                    </ul>
                    <ul className="socials__icons">
                        <li><a href="#" className="social__icon--links"><AiOutlineInstagram /></a></li>
                        <li><a href="#" className="social__icon--links"><AiFillFacebook /></a></li>
                        <li><a href="#" className="social__icon--links"><AiFillTwitterSquare /></a></li>
                        <li><a href="#" className="social__icon--links"><BsPinterest /></a></li>
                    </ul>
                </div>
                <div className="logo-n-copyright">
                    <span className="footer__logo">
                        <img src={WhiteLogo} alt='footer logo' />
                    </span>
                    <span className="footer__copyright">
                        <p className="footer__copyright--text">© 2023 Tajify. All right reserved.</p>
                        <ul className="footer__copyright--links">
                            <li><Link to={'/'} className="footer__copyright--link">Privacy Policy</Link></li>
                            <li><Link to={'/'} className="footer__copyright--link">Terms of Service</Link></li>
                        </ul>
                    </span>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer;
