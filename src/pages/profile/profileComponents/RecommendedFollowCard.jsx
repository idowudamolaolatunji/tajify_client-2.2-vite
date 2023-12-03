import React from "react";
import FollowCard from './FollowCard'
 
function RecommendedFollowCard () {

    return (
        <div className="follow__cards">
            <h3 className="follow__cards--heading">People you may know</h3>
            <FollowCard />
            <FollowCard />
            <FollowCard />
            <FollowCard />
            <FollowCard />
        </div>
    );
}

export default RecommendedFollowCard;