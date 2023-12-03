import React from "react";
import Blog from './Blog'
import LoaderSpinner from '../../../components/LoaderSpinner';

function PersonalBlog() {
    return (
        <>
        <div className="personal__blog--cards">
            <Blog />
            <Blog />
            <div className="ads__box--xl" style={{height: '16rem'}}>&nbsp;</div>
            <Blog />
            <Blog />
            <div className="ads__box--xl" style={{height: '16rem'}}>&nbsp;</div>
        </div>
        
        <LoaderSpinner />
        </>
    );
}

export default PersonalBlog;