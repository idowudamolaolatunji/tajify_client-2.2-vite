import React from 'react';
import { FaUserPlus } from 'react-icons/fa'
import ProfileImage from '../../../assets/images/pngs/profile-img.jpg';


function FollowCard() {
    return (
        <div className="follow__figure">
            <div className="follow__image--box">
                <img src={ProfileImage} alt="" className="follow__image" />
            </div>
            <div className="follow__info">
                <h4 className="follow__info--heading">Alex Bisola</h4>
                <button className="follow__button">
                    <FaUserPlus />
                    Follow
                </button>
            </div>
        </div>
    )
}

export default FollowCard;