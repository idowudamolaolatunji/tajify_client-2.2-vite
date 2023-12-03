import React from "react";
import { CiClock2 } from 'react-icons/ci';
import ProfileImage from '../../../assets/images/pngs/profile-img.jpg';

import { AiOutlineHeart } from 'react-icons/ai';
import { LiaComments } from 'react-icons/lia';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { BiSolidShareAlt, BiSolidShare } from 'react-icons/bi';



function Blog() {
    return (
        <div className="blog__figure blog--comments">
            <div className="blog__figure-top">
                <div className="blog__figure--image">
                    <img src={ProfileImage} alt="" />
                </div>
                <div className="blog__figure--title">
                    <h3 className="figure__title">Anderw Tate</h3>
                    <span><CiClock2 /> 23 mins ago</span>
                </div>
                <HiOutlineDotsVertical className="figure__icon-dots"/>
            </div>

            <div className="blog__figure-mid">
                <div className="blog__figure--description">
                    <p className="description--text">Realization is an achievement of a million reasons of contentment, when we lookback we realize how much we have achieve even on the glimpse of quits. Stay Progressive  and never stop learning.</p>
                    <span className="description--hashtags">
                        #newdawn #realization #achieve #learning
                    </span>
                </div>
            </div>

            <div className="blog__figure-bottom">
                <div className="blog__figure--tool-box">
                    <span>
                        <AiOutlineHeart />
                        234 Likes
                    </span>
                    <span>
                        <LiaComments />
                        3 Comments
                    </span>
                    <span>
                        <BiSolidShareAlt />
                        3 Shares
                    </span>
                    <span>
                        <FaHandHoldingUsd />
                        7 Gifts
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Blog;