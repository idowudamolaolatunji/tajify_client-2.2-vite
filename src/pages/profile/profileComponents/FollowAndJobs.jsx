import React from "react";
import RecommendedFollowCard from "./RecommendedFollowCard";
import ProfileFooter from "../../../components/ProfileFooter";
import Jobs from "../../../components/Jobs";
import WriterFooter from "../../../components/WriterFooter";

function FollowAndJobs() {
  return (
    <div className="followandjobs">
      <RecommendedFollowCard />
      <div className="job--box">
        <Jobs amount={4} />
      </div>
      <div className="writer__foter">
        {/* <WriterFooter /> */}
      </div>
      {/* <ProfileFooter /> */}
    </div>
  );
}

export default FollowAndJobs;
