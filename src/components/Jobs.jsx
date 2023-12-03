import React from "react";
import { PiArrowRightFill } from 'react-icons/pi';

const jobsData = [
    {title: 'Senior Web Developer', text: '4 years Experience and Proficient with HTML, CSS, JavaScript. also have knowledge of PHP..'},
    {title: 'Graphics designer', text: '4 years Experience and Proficient with HTML, CSS, JavaScript. also have knowledge of PHP..'},
    {title: 'Digital marketers', text: '4 years Experience and Proficient with HTML, CSS, JavaScript. also have knowledge of PHP..'},
    {title: 'maths tutor', text: '4 years Experience and Proficient with HTML, CSS, JavaScript. also have knowledge of PHP..'},
    {title: 'full stack Developer', text: '4 years Experience and Proficient with HTML, CSS, JavaScript. also have knowledge of PHP..'},
    {title: 'datbase engineer', text: '4 years Experience and Proficient with HTML, CSS, JavaScript. also have knowledge of PHP..'},
]

function Jobs({amount}) {
    return (
        <div className="jobs">
            <span className='job-head'>
                <h3 className="heading__tetariary">Jobs</h3>
                <h3 className="heading__tetariary profile">Top Jobs</h3>
                <a href='#' className='view-more'>view more...</a>
            </span>

            <div className="jobs__cards">
                {!amount ? jobsData.map(job => {
                    return <div className="job__figure" key={job.title}>
                        <span className="job__title-head">
                            <h3 className="job__title">{job.title}</h3>
                            <a href="#"><PiArrowRightFill /></a>
                        </span>
                        <p className="job__text">{job.text}</p>
                    </div>
                }) : 
                amount ? jobsData.slice(0, amount).map(job => {
                    return <div className="job__figure" key={job.title}>
                        <span className="job__title-head">
                            <h3 className="job__title">{job.title}</h3>
                            <a href="#"><PiArrowRightFill /></a>
                        </span>
                        <p className="job__text">{job.text}</p>
                    </div>
                }) : ''}
            </div>
        </div>
    )
}

export default Jobs;