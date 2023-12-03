import React from 'react';
import { AiOutlineInstagram, AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs'

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
                        <li><a href="#" className="links__link">About Us</a></li>
                        <li><a href="#" className="links__link">How It Works</a></li>
                        <li><a href="#" className="links__link">FAQ</a></li>
                        <li><a href="#" className="links__link">Creators</a></li>
                    </ul>
                    <ul className="socials__icons">
                        <li><a href="#" className="social__icon--links"><AiOutlineInstagram /></a></li>
                        <li><a href="#" className="social__icon--links"><AiFillFacebook /></a></li>
                        <li><a href="#" className="social__icon--links"><AiFillTwitterSquare /></a></li>
                        <li><a href="#" className="social__icon--links"><BsPinterest /></a></li>
                    </ul>
                </div>
                <div className="logo-n-copyright">
                    <span className="footer__logo">Tajify</span>
                    <span className="footer__copyright">
                        <p className="footer__copyright--text">© 2023 Tajify. All right reserved.</p>
                        <ul className="footer__copyright--links">
                            <li><a href="#" className="footer__copyright--link">Privacy Policy</a></li>
                            <li><a href="#" className="footer__copyright--link">Terms of Service</a></li>
                        </ul>
                    </span>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer;
