import React from 'react';
import { HiUserPlus } from 'react-icons/hi2';
import FollowImg from '../assets/images/pngs/follow-img.png'


function FollowItem () {
    return (
        <div className="follow__item">
            <img src={FollowImg} alt="follow user" className="follow__item-img" />
            <span className="follow__item-info">
                <p className="follow__item-name">Idowu Olatunji</p>
                <p className="follow__item-details">123k followers</p>
            </span>
            <button className='follow__item-button'><HiUserPlus /> Follow</button>
        </div>
    );
}

export default FollowItem;