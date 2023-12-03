import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineAddHomeWork, MdOutlinePermMedia, MdOutlineWorkHistory, MdOutlineArticle, MdOutlineLaptopChromebook } from 'react-icons/md';
import { BsShop } from 'react-icons/bs';


function AdminMenu () {
    return (
        <div className="menu--main">
            <div className="menu__top">
                <h4 className="menu__heading">Personal</h4>
                <ui className="menu__list">
                    <li className="menu__item"><AiOutlineUser className='menu__icon'/> Profile</li>
                    <li className="menu__item"><RiLockPasswordLine className='menu__icon'/> Password</li>
                </ui>
            </div>
            <div className="menu__bottom">
                <h4 className="menu__heading">Company</h4>
                <ui className="menu__list">
                    <li className="menu__item"><MdOutlineArticle className='menu__icon'/> Blog Posts</li>
                    <li className="menu__item"><MdOutlineWorkHistory className='menu__icon'/> Gigs</li>
                    <li className="menu__item"><MdOutlinePermMedia className='menu__icon'/> Stories</li>
                    <li className="menu__item"><MdOutlineLaptopChromebook className='menu__icon'/> Courses</li>
                    <li className="menu__item"><MdOutlineAddHomeWork className='menu__icon'/> Jobs</li>
                    <li className="menu__item"><BsShop className='menu__icon'/> Marketplace</li>
                </ui>
            </div>
        </div>
    );
}

export default AdminMenu;